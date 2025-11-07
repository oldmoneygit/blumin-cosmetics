/**
 * Script to test Shopify connection
 * Run with: npx tsx src/scripts/test-shopify-connection.ts
 */

import { config } from "dotenv";
import { resolve } from "path";

// Load .env.local
config({ path: resolve(process.cwd(), ".env.local") });

import { getShopifyProducts, isShopifyConfigured } from "../lib/shopify";

async function testConnection() {
  console.log("🔍 Testing Shopify Connection...\n");

  // Check if configured
  if (!isShopifyConfigured()) {
    console.error("❌ Shopify não está configurado!");
    console.error("Verifique as variáveis de ambiente no .env.local");
    process.exit(1);
  }

  console.log("✅ Configuração detectada\n");

  try {
    // Test fetching products
    console.log("📦 Buscando produtos da Shopify...");
    const products = await getShopifyProducts();
    
    console.log(`✅ Conexão bem-sucedida!`);
    console.log(`📊 Total de produtos encontrados: ${products.length}\n`);
    
    if (products.length > 0) {
      console.log("Primeiros produtos:");
      products.slice(0, 3).forEach((product: any, index: number) => {
        console.log(`\n${index + 1}. ${product.title}`);
        console.log(`   ID: ${product.id}`);
        console.log(`   Handle: ${product.handle || "N/A"}`);
        console.log(`   Variantes: ${product.variants?.length || 0}`);
      });
    } else {
      console.log("ℹ️  Nenhum produto encontrado na loja.");
      console.log("   Isso é normal se a loja estiver vazia.\n");
    }

    console.log("\n✅ Teste de conexão concluído com sucesso!");
    process.exit(0);
  } catch (error) {
    console.error("\n❌ Erro ao conectar com Shopify:");
    console.error(error);
    process.exit(1);
  }
}

testConnection();

