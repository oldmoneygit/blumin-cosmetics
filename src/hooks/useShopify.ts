"use client";

import { useState, useEffect } from "react";
import { getStorefrontProducts, getStorefrontProductByHandle, createStorefrontCheckout } from "@/lib/shopify-storefront";

interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: Array<{
      node: {
        url: string;
        altText: string;
      };
    }>;
  };
  variants: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        price: {
          amount: string;
          currencyCode: string;
        };
        availableForSale: boolean;
      };
    }>;
  };
}

export function useShopifyProducts() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const data = await getStorefrontProducts(50);
        setProducts(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao carregar produtos");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return { products, loading, error };
}

export function useShopifyProduct(handle: string) {
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!handle) {
      setLoading(false);
      return;
    }

    async function fetchProduct() {
      try {
        setLoading(true);
        const data = await getStorefrontProductByHandle(handle);
        setProduct(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao carregar produto");
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [handle]);

  return { product, loading, error };
}

export function useShopifyCheckout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCheckout = async (items: { variantId: string; quantity: number }[]) => {
    try {
      setLoading(true);
      setError(null);
      const checkout = await createStorefrontCheckout(items);
      
      if (checkout?.webUrl) {
        // Redirect to Shopify checkout
        window.location.href = checkout.webUrl;
      }
      
      return checkout;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao criar checkout";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createCheckout, loading, error };
}

