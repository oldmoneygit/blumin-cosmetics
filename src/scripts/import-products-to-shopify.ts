/**
 * Script to import local products to Shopify
 * Run with: npx tsx src/scripts/import-products-to-shopify.ts
 */

import { config } from "dotenv";
import { resolve } from "path";

// Load .env.local
config({ path: resolve(process.cwd(), ".env.local") });

import { products } from "../data/products";
import { shopifyRequest } from "../lib/shopify";

interface ShopifyProduct {
  title: string;
  body_html: string;
  vendor: string;
  product_type: string;
  tags: string;
  variants: Array<{
    price: string;
    sku?: string;
    inventory_quantity?: number;
    inventory_management?: string;
    inventory_policy?: string;
  }>;
  images?: Array<{
    src: string;
    alt?: string;
  }>;
}

/**
 * Convert local product to Shopify format
 */
function convertToShopifyProduct(localProduct: any): ShopifyProduct {
  // Convert images - Shopify needs full URLs
  // For local images, we'll need to upload them or use a CDN
  // For now, we'll convert local paths to assume they'll be hosted
  const images = localProduct.images.map((img: string) => {
    // If it's already a full URL, use it
    if (img.startsWith("http")) {
      return { src: img, alt: localProduct.name };
    }
    // For local images, you'll need to:
    // 1. Upload them to a CDN or Shopify Files API
    // 2. Or use the full URL where they're hosted
    // For now, we'll skip images that aren't URLs and add them later
    if (img.startsWith("/images/")) {
      // Skip local images for now - will need to upload separately
      return null;
    }
    return { 
      src: img, 
      alt: localProduct.name 
    };
  }).filter(Boolean) as Array<{ src: string; alt?: string }>;

  // Build HTML description with benefits, ingredients, and how to use
  let htmlDescription = `<p>${localProduct.fullDescription || localProduct.description}</p>`;
  
  if (localProduct.benefits && localProduct.benefits.length > 0) {
    htmlDescription += `<h3>Beneficios:</h3><ul>`;
    localProduct.benefits.forEach((benefit: string) => {
      htmlDescription += `<li>${benefit}</li>`;
    });
    htmlDescription += `</ul>`;
  }
  
  if (localProduct.howToUse) {
    htmlDescription += `<h3>Cómo Usar:</h3><p>${localProduct.howToUse.replace(/\n/g, '<br>')}</p>`;
  }
  
  if (localProduct.ingredients && localProduct.ingredients.length > 0) {
    htmlDescription += `<h3>Ingredientes:</h3><p>${localProduct.ingredients.join(", ")}</p>`;
  }

  return {
    title: localProduct.name,
    body_html: htmlDescription,
    vendor: "KAHI",
    product_type: localProduct.category || "Skincare",
    tags: localProduct.tags.join(", "),
    variants: [
      {
        price: localProduct.price.toString(),
        sku: `KAHI-${localProduct.id}`,
        inventory_quantity: localProduct.inStock ? 100 : 0,
        inventory_management: "shopify",
        inventory_policy: "deny",
      },
    ],
    ...(images.length > 0 ? { images } : {}),
  };
}

/**
 * Import a single product to Shopify
 */
async function importProduct(localProduct: any): Promise<any> {
  try {
    const shopifyProduct = convertToShopifyProduct(localProduct);
    
    // Remove images if empty to avoid errors
    if (!shopifyProduct.images || shopifyProduct.images.length === 0) {
      delete shopifyProduct.images;
    }
    
    const response = await shopifyRequest<{ product: any }>("/products.json", {
      method: "POST",
      body: JSON.stringify({ product: shopifyProduct }),
    });

    console.log(`   → Criado com ID: ${response.product.id}`);
    console.log(`   → Handle: ${response.product.handle}`);
    
    return response.product;
  } catch (error: any) {
    console.error(`   → Erro:`, error.message);
    throw error;
  }
}

/**
 * Check if product already exists in Shopify by handle
 */
async function productExists(handle: string): Promise<boolean> {
  try {
    const response = await shopifyRequest<{ products: any[] }>(
      `/products.json?handle=${handle}`
    );
    return response.products && response.products.length > 0;
  } catch (error) {
    return false;
  }
}

/**
 * Main import function
 */
async function importProducts() {
  console.log("🚀 Iniciando importação de produtos para Shopify...\n");

  const results = {
    success: 0,
    failed: 0,
    skipped: 0,
    errors: [] as string[],
  };

  for (const localProduct of products) {
    try {
      // Check if product already exists
      const handle = localProduct.slug;
      const exists = await productExists(handle);

      if (exists) {
        console.log(`⏭️  Produto "${localProduct.name}" já existe, pulando...`);
        results.skipped++;
        continue;
      }

      console.log(`📦 Importando: ${localProduct.name}...`);
      const shopifyProduct = await importProduct(localProduct);
      
      console.log(`✅ Importado com sucesso! ID: ${shopifyProduct.id}`);
      results.success++;

      // Small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error: any) {
      console.error(`❌ Erro ao importar ${localProduct.name}:`, error.message);
      results.failed++;
      results.errors.push(`${localProduct.name}: ${error.message}`);
    }
  }

  // Summary
  console.log("\n" + "=".repeat(50));
  console.log("📊 RESUMO DA IMPORTAÇÃO");
  console.log("=".repeat(50));
  console.log(`✅ Sucesso: ${results.success}`);
  console.log(`⏭️  Pulados: ${results.skipped}`);
  console.log(`❌ Falhas: ${results.failed}`);
  
  if (results.errors.length > 0) {
    console.log("\n❌ Erros encontrados:");
    results.errors.forEach((error) => console.log(`   - ${error}`));
  }

  console.log("\n✅ Importação concluída!");
}

// Run import
importProducts().catch((error) => {
  console.error("Erro fatal:", error);
  process.exit(1);
});

