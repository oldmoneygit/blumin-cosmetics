/**
 * Shopify API Configuration and Utilities
 * For Dropshipping integration with Shopify as backend
 */

const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN || '';
const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN || '';
const SHOPIFY_API_VERSION = process.env.SHOPIFY_API_VERSION || '2024-01';

const SHOPIFY_API_URL = `https://${SHOPIFY_STORE_DOMAIN}/admin/api/${SHOPIFY_API_VERSION}`;

/**
 * Generic Shopify API request function
 */
export async function shopifyRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${SHOPIFY_API_URL}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    let error;
    try {
      error = JSON.parse(errorText);
    } catch {
      error = { message: errorText || response.statusText };
    }
    
    // Better error formatting
    const errorMessage = error.errors 
      ? JSON.stringify(error.errors)
      : error.message || response.statusText;
    
    throw new Error(`Shopify API Error: ${errorMessage}`);
  }

  return response.json();
}

/**
 * Get all products from Shopify
 */
export async function getShopifyProducts(): Promise<any[]> {
  try {
    const response = await shopifyRequest<{ products: any[] }>('/products.json');
    return response.products || [];
  } catch (error) {
    console.error('Error fetching products from Shopify:', error);
    return [];
  }
}

/**
 * Get a single product by ID
 */
export async function getShopifyProduct(productId: string): Promise<any | null> {
  try {
    const response = await shopifyRequest<{ product: any }>(`/products/${productId}.json`);
    return response.product || null;
  } catch (error) {
    console.error('Error fetching product from Shopify:', error);
    return null;
  }
}

/**
 * Get product by handle (slug)
 */
export async function getShopifyProductByHandle(handle: string): Promise<any | null> {
  try {
    // Shopify API uses handle as query parameter
    const response = await shopifyRequest<{ products: any[] }>(`/products.json?handle=${encodeURIComponent(handle)}`);
    return response.products?.[0] || null;
  } catch (error) {
    console.error('Error fetching product by handle from Shopify:', error);
    return null;
  }
}

/**
 * Get all products with pagination
 */
export async function getAllShopifyProducts(): Promise<any[]> {
  try {
    let allProducts: any[] = [];
    let hasNextPage = true;
    let pageInfo = '';

    while (hasNextPage) {
      const url = pageInfo 
        ? `/products.json?limit=250&page_info=${pageInfo}`
        : `/products.json?limit=250`;
      
      const response = await shopifyRequest<{ products: any[]; link?: string }>(url);
      
      if (response.products && response.products.length > 0) {
        allProducts = allProducts.concat(response.products);
      }

      // Check for pagination
      // Note: Shopify uses Link header for pagination, but we'll use a simpler approach
      hasNextPage = response.products && response.products.length === 250;
      break; // For now, get first 250 products
    }

    return allProducts;
  } catch (error) {
    console.error('Error fetching all products from Shopify:', error);
    return [];
  }
}

/**
 * Create a checkout session (for direct checkout)
 */
export async function createCheckout(items: { variantId: string; quantity: number }[]): Promise<any> {
  try {
    const response = await shopifyRequest<{ checkout: any }>('/checkouts.json', {
      method: 'POST',
      body: JSON.stringify({
        checkout: {
          line_items: items,
        },
      }),
    });
    return response.checkout;
  } catch (error) {
    console.error('Error creating checkout:', error);
    throw error;
  }
}

/**
 * Create a cart (for cart management)
 */
export async function createCart(items: { variantId: string; quantity: number }[]): Promise<any> {
  try {
    const response = await shopifyRequest<{ cart: any }>('/cart/create.json', {
      method: 'POST',
      body: JSON.stringify({
        items,
      }),
    });
    return response.cart;
  } catch (error) {
    console.error('Error creating cart:', error);
    throw error;
  }
}

/**
 * Get order by ID
 */
export async function getShopifyOrder(orderId: string): Promise<any | null> {
  try {
    const response = await shopifyRequest<{ order: any }>(`/orders/${orderId}.json`);
    return response.order || null;
  } catch (error) {
    console.error('Error fetching order from Shopify:', error);
    return null;
  }
}

/**
 * Get all orders
 */
export async function getShopifyOrders(): Promise<any[]> {
  try {
    const response = await shopifyRequest<{ orders: any[] }>('/orders.json');
    return response.orders || [];
  } catch (error) {
    console.error('Error fetching orders from Shopify:', error);
    return [];
  }
}

/**
 * Get product variants
 */
export async function getProductVariants(productId: string): Promise<any[]> {
  try {
    const product = await getShopifyProduct(productId);
    return product?.variants || [];
  } catch (error) {
    console.error('Error fetching product variants:', error);
    return [];
  }
}

/**
 * Check if Shopify is configured
 */
export function isShopifyConfigured(): boolean {
  return !!(SHOPIFY_STORE_DOMAIN && SHOPIFY_ACCESS_TOKEN);
}

/**
 * Get Shopify store URL for checkout
 */
export function getShopifyCheckoutUrl(checkoutId: string): string {
  return `https://${SHOPIFY_STORE_DOMAIN}/checkouts/${checkoutId}`;
}

/**
 * Get Shopify storefront URL (for public access)
 */
export function getShopifyStorefrontUrl(): string {
  return `https://${SHOPIFY_STORE_DOMAIN}`;
}

