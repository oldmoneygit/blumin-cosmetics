/**
 * Script to test Storefront API product lookup
 */

import { config } from "dotenv";
import { resolve } from "path";

// Load .env.local
config({ path: resolve(process.cwd(), ".env.local") });

const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || '';
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || '';

const STOREFRONT_API_URL = `https://${SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`;

const GET_PRODUCT_QUERY = `
  query getProduct($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      availableForSale
      variants(first: 5) {
        edges {
          node {
            id
            title
            availableForSale
            price {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

async function testProduct(handle: string) {
  console.log(`\n🧪 Testando produto: ${handle}\n`);

  try {
    const response = await fetch(STOREFRONT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({
        query: GET_PRODUCT_QUERY,
        variables: { handle },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Erro HTTP: ${response.status} ${response.statusText}`);
      console.error(`Resposta: ${errorText}`);
      return;
    }

    const data = await response.json();

    if (data.errors) {
      console.error('❌ Erros GraphQL:', data.errors);
      return;
    }

    const product = data.data.product;

    if (!product) {
      console.error(`❌ Produto não encontrado para handle: ${handle}`);
      console.log(`\n💡 Possíveis causas:`);
      console.log(`   1. Produto não está publicado na Shopify`);
      console.log(`   2. Handle está incorreto`);
      console.log(`   3. Produto não está disponível no canal de vendas online`);
      return;
    }

    console.log(`✅ Produto encontrado!`);
    console.log(`   ID: ${product.id}`);
    console.log(`   Título: ${product.title}`);
    console.log(`   Handle: ${product.handle}`);
    console.log(`   Disponível para venda: ${product.availableForSale}`);
    console.log(`   Variantes: ${product.variants.edges.length}`);

    if (product.variants.edges.length > 0) {
      console.log(`\n📦 Variantes:`);
      product.variants.edges.forEach((edge: any, index: number) => {
        const variant = edge.node;
        console.log(`   ${index + 1}. ${variant.title}`);
        console.log(`      ID: ${variant.id}`);
        console.log(`      Disponível: ${variant.availableForSale}`);
        console.log(`      Preço: ${variant.price.amount} ${variant.price.currencyCode}`);
      });
    } else {
      console.warn(`⚠️ Nenhuma variante encontrada`);
    }
  } catch (error: any) {
    console.error(`❌ Erro:`, error.message);
  }
}

async function main() {
  console.log("🧪 Testando Storefront API\n");
  console.log(`Store: ${SHOPIFY_STORE_DOMAIN}`);
  console.log(`Token: ${SHOPIFY_STOREFRONT_ACCESS_TOKEN ? '✅ Configurado' : '❌ Não configurado'}\n`);

  // Test with known handles
  await testProduct("stick-balsamo-aqua");
  await testProduct("balsamo-multi-rebote-de-arrugas");
}

main();

