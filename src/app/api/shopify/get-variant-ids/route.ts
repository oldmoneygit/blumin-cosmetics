/**
 * API Route to get Shopify variant IDs using Storefront API
 * This runs on the server and uses Storefront API to get correct variant IDs
 */

import { NextRequest, NextResponse } from "next/server";
import { shopifyProductMapping } from "@/data/shopify-mapping";

// Use server-side environment variables (without NEXT_PUBLIC_)
const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || process.env.SHOPIFY_STORE_DOMAIN || '';
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || '';

const STOREFRONT_API_URL = `https://${SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`;

const GET_VARIANT_BY_HANDLE_QUERY = `
  query getVariantByHandle($handle: String!) {
    product(handle: $handle) {
      id
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

const GET_VARIANT_BY_ID_QUERY = `
  query getVariantById($id: ID!) {
    product(id: $id) {
      id
      handle
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

async function shopifyStorefrontRequest(query: string, variables?: Record<string, any>) {
  if (!SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
    throw new Error('SHOPIFY_STOREFRONT_ACCESS_TOKEN não configurado no servidor');
  }

  if (!SHOPIFY_STORE_DOMAIN) {
    throw new Error('SHOPIFY_STORE_DOMAIN não configurado');
  }

  console.log(`🌐 Fazendo requisição Storefront API para: ${STOREFRONT_API_URL}`);

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
    console.error(`❌ Erro na resposta: ${response.status} ${response.statusText}`);
    console.error(`Resposta: ${errorText}`);
    throw new Error(`Shopify Storefront API Error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  if (data.errors) {
    console.error('❌ Erros GraphQL:', data.errors);
    throw new Error(`GraphQL Error: ${data.errors.map((e: any) => e.message).join(', ')}`);
  }

  return data.data;
}

function toShopifyGID(type: string, id: string): string {
  const raw = `gid://shopify/${type}/${id}`;
  return Buffer.from(raw).toString("base64");
}

export async function POST(request: NextRequest) {
  try {
    const { productIds } = await request.json();

    if (!Array.isArray(productIds) || productIds.length === 0) {
      return NextResponse.json(
        { error: "productIds deve ser um array não vazio" },
        { status: 400 }
      );
    }

    const variantIds: Record<number, string> = {};

    for (const productId of productIds) {
      try {
        const mapping = shopifyProductMapping[productId];
        if (!mapping) {
          console.warn(`Produto ID ${productId} não encontrado no mapeamento`);
          continue;
        }

        const handlesTried: string[] = [];
        let resolvedVariantId: string | null = null;

        // First attempt: fetch by Shopify product ID (converted to GID)
        if (mapping.shopifyId) {
          const productGid = mapping.shopifyId.startsWith("gid://") || mapping.shopifyId.startsWith("Z2lkOi8")
            ? mapping.shopifyId
            : toShopifyGID("Product", mapping.shopifyId);

          console.log(`🔍 Buscando variant ID via Storefront API para productId: ${productGid}`);

          try {
            const dataById = await shopifyStorefrontRequest(
              GET_VARIANT_BY_ID_QUERY,
              { id: productGid }
            );

            console.log(`📦 Resposta da Storefront API (ID) para produto ${productId}:`, {
              hasProduct: !!dataById.product,
              handle: dataById.product?.handle,
              variantsCount: dataById.product?.variants?.edges?.length || 0,
            });

            if (dataById.product?.variants?.edges?.length > 0) {
              resolvedVariantId = dataById.product.variants.edges[0].node.id;
            }
          } catch (error: any) {
            console.warn(`⚠️ Falha ao buscar por ID (${productGid}): ${error.message}`);
          }
        }

        // Second attempt: fallback to handle if needed
        if (!resolvedVariantId && mapping.shopifyHandle) {
          handlesTried.push(mapping.shopifyHandle);
          console.log(`🔄 Tentando fallback com handle: ${mapping.shopifyHandle}`);

          const dataByHandle = await shopifyStorefrontRequest(
            GET_VARIANT_BY_HANDLE_QUERY,
            { handle: mapping.shopifyHandle }
          );

          console.log(`📦 Resposta da Storefront API (handle) para ${mapping.shopifyHandle}:`, {
            hasProduct: !!dataByHandle.product,
            productId: dataByHandle.product?.id,
            variantsCount: dataByHandle.product?.variants?.edges?.length || 0,
          });

          if (dataByHandle.product?.variants?.edges?.length > 0) {
            resolvedVariantId = dataByHandle.product.variants.edges[0].node.id;
          }
        }

        if (resolvedVariantId) {
          console.log(`✅ Variant ID encontrado: ${resolvedVariantId}`);
          variantIds[productId] = resolvedVariantId;
          continue;
        }

        console.warn(`⚠️ Nenhuma variante encontrada para produto ${productId}. Tentativas:`, {
          shopifyId: mapping.shopifyId,
          handlesTried,
        });
      } catch (error: any) {
        console.error(`❌ Erro ao buscar variant ID para produto ${productId}:`, error.message);
        continue;
      }
    }

    console.log(`📊 Variant IDs encontrados: ${Object.keys(variantIds).length} de ${productIds.length}`);

    return NextResponse.json({ variantIds });
  } catch (error: any) {
    console.error("❌ Erro na API route:", error);
    return NextResponse.json(
      { error: error.message || "Erro ao buscar variant IDs" },
      { status: 500 }
    );
  }
}

