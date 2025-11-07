/**
 * Shopify Storefront API (GraphQL)
 * For public-facing product data and checkout
 */

const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || '';
// Storefront API uses a different token - needs NEXT_PUBLIC_ prefix for client-side access
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '';

const STOREFRONT_API_URL = `https://${SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`;

/**
 * GraphQL query to get products
 */
const GET_PRODUCTS_QUERY = `
  query getProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                availableForSale
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * GraphQL query to get a single product by handle
 */
const GET_PRODUCT_BY_HANDLE_QUERY = `
  query getProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      description
      descriptionHtml
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 10) {
        edges {
          node {
            url
            altText
            width
            height
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            availableForSale
            quantityAvailable
            selectedOptions {
              name
              value
            }
          }
        }
      }
    }
  }
`;

/**
 * GraphQL mutation to create cart
 * Shopify uses Cart API instead of Checkout API in newer versions
 */
const CREATE_CART_MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  product {
                    id
                    title
                  }
                }
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

/**
 * Execute GraphQL query/mutation
 */
async function shopifyStorefrontRequest<T>(query: string, variables?: Record<string, any>): Promise<T> {
  if (!SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
    console.error('❌ SHOPIFY_STOREFRONT_ACCESS_TOKEN não configurado');
    throw new Error('Storefront API token não configurado');
  }

  if (!SHOPIFY_STORE_DOMAIN) {
    console.error('❌ SHOPIFY_STORE_DOMAIN não configurado');
    throw new Error('Store domain não configurado');
  }

  console.log(`🌐 Fazendo requisição para: ${STOREFRONT_API_URL}`);
  
  const response = await fetch(STOREFRONT_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('❌ Erro na resposta:', response.status, response.statusText);
    console.error('Resposta:', errorText);
    throw new Error(`Shopify Storefront API Error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  if (data.errors) {
    console.error('❌ Erros GraphQL:', data.errors);
    throw new Error(`GraphQL Error: ${data.errors.map((e: any) => e.message).join(', ')}`);
  }

  return data.data;
}

/**
 * Get products using Storefront API
 */
export async function getStorefrontProducts(first: number = 50) {
  try {
    const data = await shopifyStorefrontRequest<{ products: any }>(GET_PRODUCTS_QUERY, { first });
    return data.products.edges.map((edge: any) => edge.node);
  } catch (error) {
    console.error('Error fetching products from Storefront API:', error);
    return [];
  }
}

/**
 * Get product by handle using Storefront API
 */
export async function getStorefrontProductByHandle(handle: string) {
  try {
    const data = await shopifyStorefrontRequest<{ product: any }>(GET_PRODUCT_BY_HANDLE_QUERY, { handle });
    return data.product;
  } catch (error) {
    console.error('Error fetching product by handle from Storefront API:', error);
    return null;
  }
}

/**
 * Get variant ID by product handle
 */
const GET_VARIANT_BY_HANDLE_QUERY = `
  query getVariantByHandle($handle: String!) {
    product(handle: $handle) {
      variants(first: 1) {
        edges {
          node {
            id
          }
        }
      }
    }
  }
`;

export async function getVariantIdByHandle(handle: string): Promise<string | null> {
  try {
    console.log(`🔍 Buscando variant ID para handle: ${handle}`);
    
    const data = await shopifyStorefrontRequest<{ product: any }>(
      GET_VARIANT_BY_HANDLE_QUERY,
      { handle }
    );
    
    console.log(`📦 Resposta da API:`, data.product ? {
      id: data.product.id,
      title: data.product.title,
      variantsCount: data.product.variants?.edges?.length || 0
    } : 'Produto não encontrado');
    
    if (data.product?.variants?.edges?.length > 0) {
      const variantId = data.product.variants.edges[0].node.id;
      console.log(`✅ Variant ID encontrado: ${variantId}`);
      return variantId;
    }
    
    console.warn(`⚠️ Nenhuma variante encontrada para handle: ${handle}`);
    return null;
  } catch (error: any) {
    console.error('❌ Erro ao buscar variant ID:', error.message || error);
    console.error('Stack:', error.stack);
    return null;
  }
}

/**
 * Create cart using Storefront API (Cart API replaces Checkout API)
 */
export async function createStorefrontCheckout(lineItems: { variantId: string; quantity: number }[]) {
  try {
    console.log('🛒 Criando carrinho com', lineItems.length, 'itens');
    
    const input = {
      lines: lineItems.map(item => ({
        merchandiseId: item.variantId,
        quantity: item.quantity,
      })),
    };

    console.log('📦 Input:', JSON.stringify(input, null, 2));

    const data = await shopifyStorefrontRequest<{ cartCreate: any }>(
      CREATE_CART_MUTATION,
      { input }
    );

    console.log('📦 Resposta cartCreate:', data);

    if (data.cartCreate.userErrors?.length > 0) {
      const errors = data.cartCreate.userErrors
        .map((e: any) => `${e.field || 'campo'}: ${e.message}`)
        .join(', ');
      console.error('❌ Erros do cart:', errors);
      throw new Error(`Erro ao criar carrinho: ${errors}`);
    }

    if (!data.cartCreate.cart) {
      throw new Error('Carrinho não foi criado');
    }

    const cart = data.cartCreate.cart;
    
    // Convert cart checkoutUrl to webUrl format for compatibility
    return {
      id: cart.id,
      webUrl: cart.checkoutUrl,
      checkoutUrl: cart.checkoutUrl,
    };
  } catch (error: any) {
    console.error('❌ Erro ao criar checkout:', error.message || error);
    throw error;
  }
}

