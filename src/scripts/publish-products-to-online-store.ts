/**
 * Script to ensure products are available via Storefront API
 * Products need to be published and available for sale
 */

import { config } from "dotenv";
import { resolve } from "path";
import { shopifyRequest } from "@/lib/shopify";
import { shopifyProductMapping } from "@/data/shopify-mapping";

// Load .env.local
config({ path: resolve(process.cwd(), ".env.local") });

async function ensureProductIsAvailable(productId: number) {
  const mapping = shopifyProductMapping[productId];
  if (!mapping) {
    console.log(`❌ Produto ID ${productId} não encontrado no mapeamento`);
    return false;
  }

  try {
    console.log(`\n📦 Verificando produto: ${mapping.shopifyHandle} (ID: ${mapping.shopifyId})`);

    // Get product details
    const product = await shopifyRequest<{ product: any }>(
      `/products/${mapping.shopifyId}.json`
    );

    console.log(`   Status: ${product.product.status}`);
    console.log(`   Published At: ${product.product.published_at || 'NÃO PUBLICADO'}`);

    // Ensure product is published
    if (!product.product.published_at) {
      console.log(`   ⚠️ Produto não está publicado. Publicando agora...`);
      
      // Update product to be published
      await shopifyRequest(
        `/products/${mapping.shopifyId}.json`,
        {
          method: 'PUT',
          body: JSON.stringify({
            product: {
              id: mapping.shopifyId,
              published: true,
              published_at: new Date().toISOString(),
            },
          }),
        }
      );
      console.log(`   ✅ Produto publicado`);
    } else {
      console.log(`   ✅ Produto já está publicado`);
    }

    // Ensure variants are available
    if (product.product.variants && product.product.variants.length > 0) {
      const unavailableVariants = product.product.variants.filter(
        (v: any) => !v.inventory_management || v.inventory_quantity <= 0
      );
      
      if (unavailableVariants.length > 0) {
        console.log(`   ⚠️ Algumas variantes não estão disponíveis para venda`);
        console.log(`   💡 Configure o estoque ou desative o controle de inventário`);
      } else {
        console.log(`   ✅ Variantes disponíveis para venda`);
      }
    }

    return true;
  } catch (error: any) {
    console.error(`   ❌ Erro ao verificar produto:`, error.message);
    return false;
  }
}

async function main() {
  console.log("🚀 Publicando produtos no canal Online Store\n");
  console.log("Este script garante que os produtos estejam disponíveis na Storefront API\n");

  let successCount = 0;
  let totalCount = 0;

  // Check and publish all products in mapping
  for (const [productIdStr, mapping] of Object.entries(shopifyProductMapping)) {
    const productId = parseInt(productIdStr);
    totalCount++;
    
    const success = await ensureProductIsAvailable(productId);
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

