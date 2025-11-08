"use server";

import { NextResponse } from "next/server";
import crypto from "crypto";

const WEBHOOK_SECRET = process.env.SHOPIFY_WEBHOOK_SECRET;
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const ACCESS_TOKEN = process.env.META_CONVERSIONS_API_TOKEN;

function verifyShopifyWebhook(body: string, hmacHeader: string | null): boolean {
  if (!WEBHOOK_SECRET || !hmacHeader) {
    return false;
  }

  const digest = crypto
    .createHmac("sha256", WEBHOOK_SECRET)
    .update(body, "utf8")
    .digest("base64");

  return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(hmacHeader));
}

function hashValue(value?: string | null): string | undefined {
  if (!value) return undefined;
  const normalized = value.trim().toLowerCase();
  return crypto.createHash("sha256").update(normalized).digest("hex");
}

export async function POST(request: Request) {
  if (!PIXEL_ID || !ACCESS_TOKEN) {
    return NextResponse.json({ error: "Meta Pixel não configurado" }, { status: 500 });
  }

  const rawBody = await request.text();
  const hmacHeader = request.headers.get("x-shopify-hmac-sha256");

  if (!verifyShopifyWebhook(rawBody, hmacHeader)) {
    return NextResponse.json({ error: "HMAC inválido" }, { status: 401 });
  }

  const order = JSON.parse(rawBody);
  const customer = order.customer ?? {};
  const billing = order.billing_address ?? {};
  const shipping = order.shipping_address ?? {};

  const emailHash = hashValue(order.email);
  const phoneHash = hashValue((billing.phone || shipping.phone || customer.phone || "").replace(/[^\d]/g, ""));
  const firstNameHash = hashValue(billing.first_name || shipping.first_name || customer.first_name);
  const lastNameHash = hashValue(billing.last_name || shipping.last_name || customer.last_name);
  const cityHash = hashValue(billing.city || shipping.city);
  const stateHash = hashValue(billing.province || shipping.province);
  const zipHash = hashValue(billing.zip || shipping.zip);
  const countryHash = hashValue(billing.country_code || shipping.country_code);

  const userData: Record<string, string[]> = {
    ...(emailHash && { em: [emailHash] }),
    ...(phoneHash && { ph: [phoneHash] }),
    ...(firstNameHash && { fn: [firstNameHash] }),
    ...(lastNameHash && { ln: [lastNameHash] }),
    ...(cityHash && { ct: [cityHash] }),
    ...(stateHash && { st: [stateHash] }),
    ...(zipHash && { zp: [zipHash] }),
    ...(countryHash && { country: [countryHash] }),
  };

  if (customer.id) {
    userData.external_id = [String(customer.id)];
  }

  const customData = {
    currency: order.currency,
    value: Number(order.total_price),
    content_ids: order.line_items?.map((item: any) => String(item.product_id)),
    content_type: "product",
    contents: order.line_items?.map((item: any) => ({
      id: String(item.product_id),
      quantity: item.quantity,
      item_price: Number(item.price),
    })),
    num_items: order.line_items?.reduce((total: number, item: any) => total + item.quantity, 0),
    order_id: String(order.order_number ?? order.id),
  };

  const eventPayload = {
    event_name: "Purchase",
    event_time: Math.floor(new Date(order.created_at ?? Date.now()).getTime() / 1000),
    event_id: `Purchase_${order.id}_${Date.now()}`,
    event_source_url: order.order_status_url ?? process.env.NEXT_PUBLIC_SITE_URL ?? "",
    action_source: "website",
    user_data: {
      ...userData,
      ...(order.browser_ip && { client_ip_address: order.browser_ip }),
    },
    custom_data: customData,
  };

  const response = await fetch(`https://graph.facebook.com/v21.0/${PIXEL_ID}/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: [eventPayload],
      access_token: ACCESS_TOKEN,
    }),
  });

  if (!response.ok) {
    const details = await response.json();
    console.error("[Meta Pixel] Erro ao enviar Purchase", details);
    return NextResponse.json({ error: "Meta API error", details }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}


