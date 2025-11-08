"use client";

import { useEffect } from "react";
import { formatCartData, formatProductData, trackPixelEvent } from "@/utils/metaPixel";

interface ProductEventProps {
  product: {
    id: string | number;
    name: string;
    price: number;
    currency?: string;
    category?: string;
  } | null;
}

export function ViewContentEvent({ product }: ProductEventProps) {
  useEffect(() => {
    if (!product) return;
    const productId = product.id ?? product.name;

    const storageKey = `__meta_viewcontent_${productId}`;
    const alreadyTracked = sessionStorage.getItem(storageKey);
    if (alreadyTracked) return;

    const eventData = formatProductData(product);
    trackPixelEvent("ViewContent", eventData);
    sessionStorage.setItem(storageKey, Date.now().toString());
  }, [product]);

  return null;
}

export function triggerAddToCart(product: ProductEventProps["product"], quantity = 1) {
  if (!product) return;
  const eventData = {
    ...formatProductData(product),
    quantity,
  };
  trackPixelEvent("AddToCart", eventData);
}

export function triggerInitiateCheckout(cartItems: Array<ProductEventProps["product"] & { quantity?: number }>) {
  if (!cartItems || cartItems.length === 0) return;

  const formattedItems = cartItems.filter((item): item is NonNullable<typeof item> => Boolean(item));
  const eventData = formatCartData(
    formattedItems.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      currency: item.currency,
      category: item.category,
      quantity: item.quantity,
    }))
  );

  trackPixelEvent("InitiateCheckout", eventData);
}


