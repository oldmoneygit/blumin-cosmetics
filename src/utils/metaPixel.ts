"use client";

type EventName =
  | "PageView"
  | "ViewContent"
  | "AddToCart"
  | "InitiateCheckout"
  | "Purchase"
  | "Search"
  | "AddToWishlist"
  | string;

interface ProductLike {
  id: string | number;
  name: string;
  category?: string;
  price: number;
  currency?: string;
  images?: string[];
}

interface CartItemLike extends ProductLike {
  quantity?: number;
}

interface TrackingAttributes {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  fbclid?: string;
  gclid?: string;
  fbc?: string;
  fbp?: string;
}

const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}
const STORAGE_KEY = "__blumin_attribution";

/**
 * Gera um eventId único usado para deduplicação entre Pixel e Conversions API.
 */
export function generateEventId(eventName: EventName): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).slice(2, 12);
  return `${eventName}_${timestamp}_${random}`;
}

/**
 * Lê parâmetros de atribuição (UTM, fbclid, gclid) da URL atual e os persiste.
 */
export function captureAttributionParams(): void {
  if (typeof window === "undefined") return;

  const searchParams = new URLSearchParams(window.location.search);
  const stored = getAttributionParams();

  const params: TrackingAttributes = {
    ...stored,
  };

  const keys: Array<keyof TrackingAttributes> = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
    "fbclid",
    "gclid",
  ];

  keys.forEach((key) => {
    const value = searchParams.get(key);
    if (value) {
      params[key] = value;
    }
  });

  const fbc = buildFbc(searchParams, params.fbclid);
  if (fbc) {
    params.fbc = fbc;
  }

  const fbp = readFbpCookie();
  if (fbp) {
    params.fbp = fbp;
  }

  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(params));
}

/**
 * Recupera os parâmetros de atribuição persistidos.
 */
export function getAttributionParams(): TrackingAttributes {
  if (typeof window === "undefined") return {};
  const stored = sessionStorage.getItem(STORAGE_KEY);
  if (!stored) return {};
  try {
    return JSON.parse(stored) as TrackingAttributes;
  } catch {
    return {};
  }
}

/**
 * Monta o parâmetro fbc (Facebook Click ID) em formato válido.
 */
function buildFbc(searchParams: URLSearchParams, storedFbclid?: string): string | undefined {
  const fbclid = searchParams.get("fbclid") || storedFbclid;
  if (!fbclid) return storedFbclid;
  const timestamp = Date.now();
  return `fb.1.${timestamp}.${fbclid}`;
}

/**
 * Lê o cookie _fbp definido pelo pixel.
 */
function readFbpCookie(): string | undefined {
  if (typeof document === "undefined") return undefined;
  const cookie = document.cookie
    .split(";")
    .find((entry) => entry.trim().startsWith("_fbp="));
  return cookie ? cookie.split("=")[1] : undefined;
}

/**
 * Normaliza valor string e aplica hashing SHA-256.
 */
async function hashValue(value?: string | null): Promise<string | null> {
  if (!value) return null;
  const normalized = value.toString().trim().toLowerCase();

  if (typeof window !== "undefined" && window.crypto?.subtle) {
    const encoder = new TextEncoder();
    const data = encoder.encode(normalized);
    try {
      const buffer = await window.crypto.subtle.digest("SHA-256", data);
      const hashArray = Array.from(new Uint8Array(buffer));
      return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    } catch {
      return null;
    }
  }

  return null;
}

export async function prepareUserData(user: {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
} = {}) {
  const result: Record<string, string[]> = {};

  const hashedEmail = await hashValue(user.email);
  if (hashedEmail) result.em = [hashedEmail];

  if (user.phone) {
    const normalizedPhone = user.phone.replace(/[^\d]/g, "");
    const hashedPhone = await hashValue(normalizedPhone);
    if (hashedPhone) result.ph = [hashedPhone];
  }

  const hashedFirstName = await hashValue(user.firstName);
  if (hashedFirstName) result.fn = [hashedFirstName];

  const hashedLastName = await hashValue(user.lastName);
  if (hashedLastName) result.ln = [hashedLastName];

  return result;
}

/**
 * Monta dados de produto seguindo a spec do Meta Pixel.
 */
export function formatProductData(product: ProductLike) {
  return {
    content_ids: [String(product.id)],
    content_name: product.name,
    content_type: "product",
    content_category: product.category ?? "default",
    value: product.price,
    currency: product.currency ?? "ARS",
  };
}

export function formatCartData(items: CartItemLike[]) {
  const contents = items.map((item) => ({
    id: String(item.id),
    quantity: item.quantity ?? 1,
    item_price: item.price,
  }));

  const totalValue = contents.reduce((total, line) => total + line.item_price * line.quantity, 0);
  const contentIds = contents.map((line) => line.id);
  const numItems = contents.reduce((total, line) => total + line.quantity, 0);

  return {
    content_ids: contentIds,
    content_type: "product",
    contents,
    num_items: numItems,
    value: Number(totalValue.toFixed(2)),
    currency: "ARS",
  };
}

/**
 * Envia evento para Conversions API via rota proxy.
 */
export async function sendToConversionsAPI(params: {
  eventName: EventName;
  eventData: Record<string, unknown>;
  eventId: string;
  userData?: Record<string, string[]>;
  eventTime?: number;
  sourceUrl?: string;
}) {
  if (typeof window === "undefined") return;

  const { eventName, eventData, eventId, userData = {}, eventTime, sourceUrl } = params;
  const attribution = getAttributionParams();

  const body = {
    eventName,
    eventData,
    eventId,
    userData,
    eventTime: eventTime ?? Math.floor(Date.now() / 1000),
    sourceUrl: sourceUrl ?? window.location.href,
    fbc: attribution.fbc,
    fbp: attribution.fbp,
    userAgent: navigator.userAgent,
  };

  try {
    await fetch("/api/meta-conversions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[Meta Pixel] Conversions API request failed", error);
    }
  }
}

/**
 * Envia evento para o Pixel e, em paralelo, para a Conversions API.
 */
export async function trackPixelEvent(
  eventName: EventName,
  eventData: Record<string, unknown> = {},
  userData?: { email?: string; phone?: string; firstName?: string; lastName?: string }
) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") {
    return null;
  }

  const eventId = generateEventId(eventName);
  const attribution = getAttributionParams();
  const hashedUserData = await prepareUserData(userData);

  const payload = {
    ...eventData,
    ...(attribution.fbc && { fbc: attribution.fbc }),
    ...(attribution.fbp && { fbp: attribution.fbp }),
  };

  window.fbq("track", eventName, payload, {
    eventID: eventId,
    ...hashedUserData,
  });

  await sendToConversionsAPI({
    eventName,
    eventData: payload,
    eventId,
    userData: hashedUserData,
  });

  return eventId;
}

/**
 * Anexa parâmetros de rastreamento à URL do checkout da Shopify.
 */
export function appendTrackingParams(checkoutUrl: string): string {
  const attribution = getAttributionParams();
  if (!attribution || Object.keys(attribution).length === 0) {
    return checkoutUrl;
  }

  try {
    const url = new URL(checkoutUrl);
    Object.entries(attribution).forEach(([key, value]) => {
      if (value) {
        url.searchParams.set(key, value);
      }
    });
    return url.toString();
  } catch {
    return checkoutUrl;
  }
}

/**
 * Inicializa captura automática dos parâmetros de atribuição.
 */
export function initializeFacebookParams() {
  if (typeof window === "undefined") return;
  captureAttributionParams();
}

export function isMetaPixelConfigured(): boolean {
  return Boolean(META_PIXEL_ID);
}

export function getMetaPixelId(): string | undefined {
  return META_PIXEL_ID;
}


