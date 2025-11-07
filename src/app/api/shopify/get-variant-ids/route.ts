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

        console.log(`🔍 Buscando variant ID via Storefront API para handle: ${mapping.shopifyHandle}`);

        // Get variant ID using Storefront API (correct format)
        const data = await shopifyStorefrontRequest(
          GET_VARIANT_BY_HANDLE_QUERY,
          { handle: mapping.shopifyHandle }
        );

        console.log(`📦 Resposta da Storefront API para ${mapping.shopifyHandle}:`, {
          hasProduct: !!data.product,
          productId: data.product?.id,
          variantsCount: data.product?.variants?.edges?.length || 0
        });

        if (!data.product) {
          console.warn(`⚠️ Produto não encontrado na Storefront API para handle: ${mapping.shopifyHandle}`);
          console.warn(`   Isso pode acontecer se o produto não estiver publicado na Shopify`);
          continue;
        }

        if (data.product?.variants?.edges?.length > 0) {
          const variantId = data.product.variants.edges[0].node.id;
          console.log(`✅ Variant ID encontrado: ${variantId}`);
          variantIds[productId] = variantId;
        } else {
          console.warn(`⚠️ Nenhuma variante encontrada para produto ${productId} (handle: ${mapping.shopifyHandle})`);
          console.warn(`   Produto ID: ${data.product.id}`);
        }
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

