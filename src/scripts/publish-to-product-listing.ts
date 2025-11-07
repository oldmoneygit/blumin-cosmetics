/**
 * Script to publish products to ProductListing API
 * This ensures products are available via Storefront API
 */

import { config } from "dotenv";
import { resolve } from "path";
import { shopifyRequest } from "@/lib/shopify";
import { shopifyProductMapping } from "@/data/shopify-mapping";

// Load .env.local
config({ path: resolve(process.cwd(), ".env.local") });

async function publishToProductListing(productId: number) {
  const mapping = shopifyProductMapping[productId];
  if (!mapping) {
    console.log(`❌ Produto ID ${productId} não encontrado no mapeamento`);
    return false;
  }

  try {
    console.log(`\n📦 Publicando produto no ProductListing: ${mapping.shopifyHandle} (ID: ${mapping.shopifyId})`);

    // Check if already in product listing
    try {
      const listing = await shopifyRequest<{ product_listings: any[] }>(
        `/product_listings.json?product_ids=${mapping.shopifyId}`
      );

      if (listing.product_listings && listing.product_listings.length > 0) {
        console.log(`   ✅ Produto já está no ProductListing`);
        console.log(`   Handle: ${listing.product_listings[0].handle}`);
        return true;
      }
    } catch (error: any) {
      // Ignore if not found
    }

    // Publish to product listing
    try {
      await shopifyRequest(
        `/product_listings.json`,
        {
          method: 'PUT',
          body: JSON.stringify({
            product_listing: {
              product_id: mapping.shopifyId,
              available: true,
            },
          }),
        }
      );
      console.log(`   ✅ Produto publicado no ProductListing`);
      return true;
    } catch (error: any) {
      console.error(`   ❌ Erro ao publicar no ProductListing:`, error.message);
      
      // If product already exists, try to update it
      if (error.message?.includes('already') || error.message?.includes('exists')) {
        try {
          await shopifyRequest(
            `/product_listings/${mapping.shopifyId}.json`,
            {
              method: 'PUT',
              body: JSON.stringify({
                product_listing: {
                  product_id: mapping.shopifyId,
                  available: true,
                },
              }),
            }
          );
          console.log(`   ✅ Produto atualizado no ProductListing`);
          return true;
        } catch (updateError: any) {
          console.error(`   ❌ Erro ao atualizar:`, updateError.message);
          return false;
        }
      }
      
      return false;
    }
  } catch (error: any) {
    console.error(`   ❌ Erro ao processar produto:`, error.message);
    return false;
  }
}

async function main() {
  console.log("🚀 Publicando produtos no ProductListing API\n");
  console.log("Este script garante que os produtos estejam disponíveis na Storefront API\n");

  let successCount = 0;
  let totalCount = 0;

  // Publish all products in mapping
  for (const [productIdStr, mapping] of Object.entries(shopifyProductMapping)) {
    const productId = parseInt(productIdStr);
    totalCount++;
    
    const success = await publishToProductListing(productId);
    if (success) {
      successCount++;
    }

    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log(`\n📊 Resultado:`);
  console.log(`   Total: ${totalCount}`);
  console.log(`   Sucesso: ${successCount}`);
  console.log(`   Falhas: ${totalCount - successCount}`);

  console.log(`\n💡 Aguarde alguns segundos e teste novamente o checkout.`);
  console.log(`   Os produtos podem levar alguns instantes para aparecer na Storefront API.`);
}

main();

