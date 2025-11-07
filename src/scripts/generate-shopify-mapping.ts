/**
 * Script to generate mapping between local product IDs and Shopify product IDs
 * Run with: npx tsx src/scripts/generate-shopify-mapping.ts
 * 
 * This script fetches all products from Shopify and creates a mapping file
 */

import { config } from "dotenv";
import { resolve } from "path";
import { writeFileSync } from "fs";

// Load .env.local
config({ path: resolve(process.cwd(), ".env.local") });

import { getAllShopifyProducts } from "../lib/shopify";
import { products } from "../data/products";

async function generateMapping() {
  console.log("🔍 Gerando mapeamento de produtos...\n");

  try {
    // Get all products from Shopify
    console.log("📦 Buscando produtos da Shopify...");
    const shopifyProducts = await getAllShopifyProducts();
    
    console.log(`✅ Encontrados ${shopifyProducts.length} produtos na Shopify\n`);

    // Create mapping by handle (slug) or title
    const mapping: Record<number, { shopifyId: string; shopifyHandle: string }> = {};

    console.log("\n📋 Buscando correspondências...\n");

    for (const localProduct of products) {
      // Try to find by handle first
      let shopifyProduct = shopifyProducts.find(
        (sp: any) => sp.handle === localProduct.slug || sp.handle === localProduct.slug.replace(/-/g, '-')
      );

      // If not found by handle, try by title (exact match)
      if (!shopifyProduct) {
        shopifyProduct = shopifyProducts.find(
          (sp: any) => sp.title === localProduct.name
        );
      }

      // If still not found, try partial match on title
      if (!shopifyProduct) {
        shopifyProduct = shopifyProducts.find(
          (sp: any) => sp.title.toLowerCase().includes(localProduct.name.toLowerCase()) || 
                       localProduct.name.toLowerCase().includes(sp.title.toLowerCase())
        );
      }

      if (shopifyProduct) {
        mapping[localProduct.id] = {
          shopifyId: shopifyProduct.id.toString(),
          shopifyHandle: shopifyProduct.handle,
        };
        console.log(`✅ ${localProduct.name}`);
        console.log(`   Local ID: ${localProduct.id} → Shopify ID: ${shopifyProduct.id}`);
        console.log(`   Handle: ${shopifyProduct.handle}\n`);
      } else {
        console.log(`⚠️  ${localProduct.name} → NÃO ENCONTRADO`);
        console.log(`   Procurando handle: ${localProduct.slug}\n`);
      }
    }

    // Convert keys to numbers for proper TypeScript typing
    const typedMapping: Record<number, { shopifyId: string; shopifyHandle: string }> = {};
    Object.keys(mapping).forEach(key => {
      typedMapping[Number(key)] = mapping[Number(key)];
    });

    // Generate TypeScript mapping file
    const mappingContent = `/**
 * Mapeamento de IDs locais para IDs da Shopify
 * Gerado automaticamente - NÃO EDITAR MANUALMENTE
 * Última atualização: ${new Date().toISOString()}
 */

export const shopifyProductMapping: Record<number, { shopifyId: string; shopifyHandle: string }> = ${JSON.stringify(typedMapping, null, 2).replace(/"(\d+)":/g, '$1:')};

/**
 * Get Shopify ID from local product ID
 */
export function getShopifyId(localId: number): string | null {
  return shopifyProductMapping[localId]?.shopifyId || null;
}

/**
 * Get Shopify handle from local product ID
 */
export function getShopifyHandle(localId: number): string | null {
  return shopifyProductMapping[localId]?.shopifyHandle || null;
}
`;

    // Write to file
    const mappingPath = resolve(process.cwd(), "src/data/shopify-mapping.ts");
    writeFileSync(mappingPath, mappingContent, "utf-8");

    console.log(`\n✅ Mapeamento salvo em: ${mappingPath}`);
    console.log(`📊 Total de produtos mapeados: ${Object.keys(mapping).length}`);

    // Summary
    const mapped = Object.keys(mapping).length;
    const total = products.length;
    const missing = total - mapped;

    console.log(`\n📈 Resumo:`);
    console.log(`   ✅ Mapeados: ${mapped}`);
    console.log(`   ⚠️  Não encontrados: ${missing}`);

    if (missing > 0) {
      console.log(`\n💡 Execute o script de importação para adicionar produtos faltantes:`);
      console.log(`   npx tsx src/scripts/import-products-to-shopify.ts`);
    }

  } catch (error: any) {
    console.error("\n❌ Erro ao gerar mapeamento:", error.message);
    process.exit(1);
  }
}

generateMapping();

