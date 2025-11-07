/**
 * Script to check product publication status using Admin API
 */

import { config } from "dotenv";
import { resolve } from "path";
import { shopifyRequest } from "@/lib/shopify";
import { shopifyProductMapping } from "@/data/shopify-mapping";

// Load .env.local
config({ path: resolve(process.cwd(), ".env.local") });

async function checkProductStatus(productId: number) {
  const mapping = shopifyProductMapping[productId];
  if (!mapping) {
    console.log(`❌ Produto ID ${productId} não encontrado no mapeamento`);
    return;
  }

  try {
    // Get product with publication status
    const product = await shopifyRequest<{ product: any }>(
      `/products/${mapping.shopifyId}.json`
    );

    console.log(`\n📦 Produto: ${product.product.title}`);
    console.log(`   Shopify ID: ${mapping.shopifyId}`);
    console.log(`   Handle: ${mapping.shopifyHandle}`);
    console.log(`   Status: ${product.product.status}`);
    console.log(`   Published At: ${product.product.published_at || 'NÃO PUBLICADO'}`);

    // Check if product is published to online store
    const publications = await shopifyRequest<{ publications: any[] }>(
      `/products/${mapping.shopifyId}/publications.json`
    );

    if (publications.publications && publications.publications.length > 0) {
      console.log(`   ✅ Publicações:`);
      publications.publications.forEach((pub: any) => {
        console.log(`      - ${pub.publication_id}: ${pub.published ? '✅ Publicado' : '❌ Não publicado'}`);
      });
    } else {
      console.log(`   ⚠️ Nenhuma publicação encontrada`);
    }

    // Check product availability
    const productListing = await shopifyRequest<{ product_listings: any[] }>(
      `/product_listings.json?product_ids=${mapping.shopifyId}`
    );

    if (productListing.product_listings && productListing.product_listings.length > 0) {
      console.log(`   ✅ Disponível no canal online`);
      productListing.product_listings.forEach((listing: any) => {
        console.log(`      - Handle: ${listing.handle}`);
        console.log(`      - Available: ${listing.available}`);
      });
    } else {
      console.log(`   ❌ NÃO disponível no canal online`);
      console.log(`   💡 O produto precisa ser publicado no canal online para funcionar na Storefront API`);
    }

  } catch (error: any) {
    console.error(`❌ Erro ao verificar produto ${productId}:`, error.message);
  }
}

async function main() {
  console.log("🔍 Verificando status de publicação dos produtos\n");

  // Check a few products
  await checkProductStatus(1); // Bálsamo Multi Rebote de Arrugas
  await checkProductStatus(2); // Stick Bálsamo Aqua
}

main();

