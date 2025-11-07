/**
 * Script to test Storefront API connection
 */

import { config } from "dotenv";
import { resolve } from "path";

// Load .env.local
config({ path: resolve(process.cwd(), ".env.local") });

import { getVariantIdByHandle } from "../lib/shopify-storefront";

async function test() {
  console.log("🧪 Testando Storefront API...\n");

  // Test with a known handle
  const testHandle = "balsamo-multi-rebote-de-arrugas";
  
  try {
    console.log(`Testando handle: ${testHandle}`);
    const variantId = await getVariantIdByHandle(testHandle);
    
    if (variantId) {
      console.log(`\n✅ Sucesso! Variant ID: ${variantId}`);
    } else {
      console.log(`\n❌ Variant ID não encontrado`);
    }
  } catch (error: any) {
    console.error(`\n❌ Erro:`, error.message);
  }
}

test();

