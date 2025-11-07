/**
 * Script to update prices in Shopify only (for products already in ARS locally)
 * Run with: npx tsx src/scripts/update-shopify-prices-only.ts
 */

import { config } from "dotenv";
import { resolve } from "path";

// Load .env.local FIRST
config({ path: resolve(process.cwd(), ".env.local") });

import { products } from "../data/products";
import { shopifyRequest } from "../lib/shopify";
import { shopifyProductMapping } from "../data/shopify-mapping";

/**
 * Update prices in Shopify
 */
async function updateShopifyPrices() {
  console.log("🛒 Atualizando preços na Shopify...\n");

  const results = {
    success: 0,
    failed: 0,
    errors: [] as string[],
  };

  for (const product of products) {
    try {
      const mapping = shopifyProductMapping[product.id];
      if (!mapping) {
        console.log(`⚠️  ${product.name}: Não encontrado no mapeamento, pulando...`);
        continue;
      }

      // Use current price (already in ARS)
      const priceInARS = product.price;
      const originalPriceInARS = product.originalPrice;

      console.log(`📦 Processando: ${product.name}...`);
      console.log(`   Preço: ${priceInARS} ARS`);

      // Get current product from Shopify to get variant ID
      const shopifyProduct = await shopifyRequest<{ product: any }>(
        `/products/${mapping.shopifyId}.json`
      );

      if (!shopifyProduct.product || !shopifyProduct.product.variants || shopifyProduct.product.variants.length === 0) {
        console.log(`   ⚠️  Sem variantes, pulando...\n`);
        continue;
      }

      // Update variant price
      const variant = shopifyProduct.product.variants[0];
      const variantId = variant.id;

      // Prepare update data with both price and compare_at_price
      const updateData: any = {
        variant: {
          id: variantId,
          price: priceInARS.toString(),
        },
      };

      // Add compare_at_price if original price exists
      if (originalPriceInARS) {
        updateData.variant.compare_at_price = originalPriceInARS.toString();
      }

      // Update variant with single request
      await shopifyRequest<{ variant: any }>(`/variants/${variantId}.json`, {
        method: "PUT",
        body: JSON.stringify(updateData),
      });

      console.log(`   ✅ Atualizado com sucesso!\n`);
      results.success++;

      // Small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error: any) {
      console.error(`   ❌ Erro: ${error.message}\n`);
      results.failed++;
      results.errors.push(`${product.name}: ${error.message}`);
    }
  }

  // Summary
  console.log("=".repeat(50));
  console.log("📊 RESUMO DA ATUALIZAÇÃO NA SHOPIFY");
  console.log("=".repeat(50));
  console.log(`✅ Sucesso: ${results.success}`);
  console.log(`❌ Falhas: ${results.failed}`);

  if (results.errors.length > 0) {
    console.log("\n❌ Erros encontrados:");
    results.errors.forEach((error) => console.log(`   - ${error}`));
  }

  return results;
}

/**
 * Main function
 */
async function main() {
  console.log("💰 Atualizando Preços na Shopify (ARS)\n");

  try {
    await updateShopifyPrices();

    console.log("\n✅ Atualização concluída!");
    console.log("\n📝 Próximos passos:");
    console.log("   1. Verifique os preços na Shopify Admin");
    console.log("   2. Configure a moeda da loja para ARS (Peso Argentino)");
    console.log("      - Configurações > Geral > Moeda da loja");
  } catch (error: any) {
    console.error("\n❌ Erro fatal:", error.message);
    process.exit(1);
  }
}

// Run update
main();

