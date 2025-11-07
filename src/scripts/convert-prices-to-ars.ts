/**
 * Script to convert product prices from USD to Argentine Peso (ARS)
 * Run with: npx tsx src/scripts/convert-prices-to-ars.ts
 * 
 * This script:
 * 1. Converts all prices in src/data/products.ts from USD to ARS
 * 2. Updates prices in Shopify
 * 3. Uses exchange rate: 1 USD = 1000 ARS (adjustable)
 */

import { config } from "dotenv";
import { resolve } from "path";
import { readFileSync, writeFileSync } from "fs";

// Load .env.local
config({ path: resolve(process.cwd(), ".env.local") });

import { products } from "../data/products";
import { shopifyRequest } from "../lib/shopify";
import { shopifyProductMapping } from "../data/shopify-mapping";

// Exchange rate: 1 USD = X ARS
// Ajuste esta taxa conforme a cotação atual do dólar
// Taxa atual aproximada (novembro 2024): 1 USD ≈ 1000-1200 ARS
const USD_TO_ARS_RATE = 1000; // Ajuste conforme necessário

// Preços menores que este valor são considerados USD
const MAX_USD_PRICE = 500;

/**
 * Convert USD price to ARS
 */
function convertToARS(usdPrice: number): number {
  return Math.round(usdPrice * USD_TO_ARS_RATE);
}

/**
 * Update prices in products.ts file
 */
async function updateLocalPrices() {
  console.log("📝 Atualizando preços no arquivo local...\n");

  try {
    const filePath = resolve(process.cwd(), "src/data/products.ts");
    let fileContent = readFileSync(filePath, "utf-8");

    let updatedCount = 0;

    for (const product of products) {
      const oldPrice = product.price;
      const oldOriginalPrice = product.originalPrice;

      // Check if price is already in ARS (values > MAX_USD_PRICE are likely ARS)
      if (oldPrice > MAX_USD_PRICE) {
        console.log(`⏭️  ${product.name}: Preço já parece estar em ARS (${oldPrice}), pulando...`);
        continue;
      }

      const newPrice = convertToARS(oldPrice);
      const newOriginalPrice = oldOriginalPrice ? convertToARS(oldOriginalPrice) : undefined;

      // Update price
      const pricePattern = `price:\\s*${oldPrice}`;
      const priceRegex = new RegExp(pricePattern.replace(/\./g, "\\."), "g");
      fileContent = fileContent.replace(priceRegex, `price: ${newPrice}`);

      // Update originalPrice if exists
      if (oldOriginalPrice && newOriginalPrice) {
        const originalPricePattern = `originalPrice:\\s*${oldOriginalPrice}`;
        const originalPriceRegex = new RegExp(originalPricePattern.replace(/\./g, "\\."), "g");
        fileContent = fileContent.replace(originalPriceRegex, `originalPrice: ${newOriginalPrice}`);
      }

      updatedCount++;
      console.log(`✅ ${product.name}: ${oldPrice} USD → ${newPrice} ARS`);
    }

    // Write updated file
    writeFileSync(filePath, fileContent, "utf-8");

    console.log(`\n✅ ${updatedCount} produtos atualizados no arquivo local\n`);
    return updatedCount;
  } catch (error: any) {
    console.error("❌ Erro ao atualizar preços locais:", error.message);
    throw error;
  }
}

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

      // Check if price needs conversion (values < MAX_USD_PRICE are likely USD)
      let priceInARS = product.price;
      if (product.price <= MAX_USD_PRICE) {
        priceInARS = convertToARS(product.price);
      }

      let originalPriceInARS = product.originalPrice;
      if (product.originalPrice && product.originalPrice <= MAX_USD_PRICE) {
        originalPriceInARS = convertToARS(product.originalPrice);
      }

      // Get current product from Shopify to get variant ID
      const shopifyProduct = await shopifyRequest<{ product: any }>(
        `/products/${mapping.shopifyId}.json`
      );

      if (!shopifyProduct.product || !shopifyProduct.product.variants || shopifyProduct.product.variants.length === 0) {
        console.log(`⚠️  ${product.name}: Sem variantes, pulando...`);
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

      console.log(`✅ ${product.name}: ${priceInARS} ARS`);
      results.success++;

      // Small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error: any) {
      console.error(`❌ ${product.name}:`, error.message);
      results.failed++;
      results.errors.push(`${product.name}: ${error.message}`);
    }
  }

  // Summary
  console.log("\n" + "=".repeat(50));
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
  console.log("💰 Conversão de Preços: USD → ARS (Peso Argentino)\n");
  console.log(`📊 Taxa de câmbio: 1 USD = ${USD_TO_ARS_RATE} ARS\n`);

  try {
    // Step 1: Update local prices
    console.log("=".repeat(50));
    console.log("PASSO 1: Atualizando preços no projeto local");
    console.log("=".repeat(50));
    await updateLocalPrices();

    // Step 2: Update Shopify prices
    console.log("\n" + "=".repeat(50));
    console.log("PASSO 2: Atualizando preços na Shopify");
    console.log("=".repeat(50));
    await updateShopifyPrices();

    console.log("\n✅ Conversão concluída com sucesso!");
    console.log("\n📝 Próximos passos:");
    console.log("   1. Verifique os preços no site");
    console.log("   2. Verifique os preços na Shopify Admin");
    console.log("   3. Configure a moeda da loja para ARS (Peso Argentino)");
    console.log("   4. Ajuste a taxa de câmbio se necessário (variável USD_TO_ARS_RATE)");
  } catch (error: any) {
    console.error("\n❌ Erro fatal:", error.message);
    process.exit(1);
  }
}

// Run conversion
main();
