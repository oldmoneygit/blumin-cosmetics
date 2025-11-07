/**
 * Script to get and store Shopify variant IDs for each product
 * Run with: npx tsx src/scripts/get-shopify-variant-ids.ts
 * 
 * This script fetches variant IDs from Shopify and updates the mapping file
 */

import { config } from "dotenv";
import { resolve } from "path";
import { readFileSync, writeFileSync } from "fs";

// Load .env.local
config({ path: resolve(process.cwd(), ".env.local") });

import { shopifyRequest } from "../lib/shopify";
import { shopifyProductMapping } from "../data/shopify-mapping";
import { products } from "../data/products";

interface VariantMapping {
  shopifyId: string;
  shopifyHandle: string;
  shopifyVariantId: string;
}

async function getVariantIds() {
  console.log("🔍 Obtendo Variant IDs da Shopify...\n");

  const variantMapping: Record<number, VariantMapping> = {};

  for (const product of products) {
    try {
      const mapping = shopifyProductMapping[product.id];
      if (!mapping) {
        console.log(`⚠️  ${product.name}: Não encontrado no mapeamento, pulando...`);
        continue;
      }

      // Get product from Shopify
      const shopifyProduct = await shopifyRequest<{ product: any }>(
        `/products/${mapping.shopifyId}.json`
      );

      if (!shopifyProduct.product || !shopifyProduct.product.variants || shopifyProduct.product.variants.length === 0) {
        console.log(`⚠️  ${product.name}: Sem variantes, pulando...`);
        continue;
      }

      // Get first variant (usually there's only one)
      const variant = shopifyProduct.product.variants[0];
      
      variantMapping[product.id] = {
        shopifyId: mapping.shopifyId,
        shopifyHandle: mapping.shopifyHandle,
        shopifyVariantId: variant.id.toString(),
      };

      console.log(`✅ ${product.name}: Variant ID ${variant.id}`);

      // Small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 300));
    } catch (error: any) {
      console.error(`❌ ${product.name}:`, error.message);
    }
  }

  // Update mapping file
  const mappingFilePath = resolve(process.cwd(), "src/data/shopify-mapping.ts");
  let fileContent = readFileSync(mappingFilePath, "utf-8");

  // Replace the mapping object with the new one including variant IDs
  const newMappingContent = JSON.stringify(variantMapping, null, 2)
    .replace(/"(\d+)":/g, '  "$1":');

  // Find and replace the mapping object
  const mappingRegex = /export const shopifyProductMapping: Record<number, \{ shopifyId: string; shopifyHandle: string \}> = \{[\s\S]*?\};/;
  
  const newMappingType = `Record<number, { shopifyId: string; shopifyHandle: string; shopifyVariantId: string }>`;
  const newMappingExport = `export const shopifyProductMapping: ${newMappingType} = ${newMappingContent.replace(/"/g, '"')};`;

  fileContent = fileContent.replace(mappingRegex, newMappingExport);

  // Also update helper functions to include variant ID
  const getShopifyVariantIdFunction = `
/**
 * Get Shopify variant ID from local product ID
 */
export function getShopifyVariantId(localId: number): string | null {
  return shopifyProductMapping[localId]?.shopifyVariantId || null;
}
`;

  // Check if function already exists, if not add it
  if (!fileContent.includes('getShopifyVariantId')) {
    fileContent = fileContent.replace(
      /export function getShopifyHandle/,
      `${getShopifyVariantIdFunction}\n\nexport function getShopifyHandle`
    );
  }

  writeFileSync(mappingFilePath, fileContent, "utf-8");

  console.log("\n✅ Mapeamento atualizado com Variant IDs!");
  console.log(`📊 Total de produtos mapeados: ${Object.keys(variantMapping).length}`);
}

async function main() {
  try {
    await getVariantIds();
    console.log("\n✅ Processo concluído!");
  } catch (error: any) {
    console.error("\n❌ Erro fatal:", error.message);
    process.exit(1);
  }
}

main();

