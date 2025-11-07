/**
 * Script to upload product images to Shopify
 * Uploads the first/main image of each product to Shopify Admin API
 */

import { config } from "dotenv";
import { resolve } from "path";
import { readFileSync, existsSync } from "fs";
import { shopifyRequest } from "@/lib/shopify";
import { shopifyProductMapping } from "@/data/shopify-mapping";
import { products } from "@/data/products";

// Load .env.local
config({ path: resolve(process.cwd(), ".env.local") });

/**
 * Convert local image path to file system path
 */
function getImagePath(imageUrl: string): string {
  // Remove leading slash and convert to file system path
  const relativePath = imageUrl.startsWith("/") ? imageUrl.slice(1) : imageUrl;
  return resolve(process.cwd(), "public", relativePath);
}

/**
 * Convert image file to base64 string (without data URL prefix)
 * Shopify expects just the base64 string, not the full data URL
 */
function imageToBase64(imagePath: string): string {
  try {
    const imageBuffer = readFileSync(imagePath);
    const base64 = imageBuffer.toString("base64");
    // Shopify expects just the base64 string, not the data URL format
    return base64;
  } catch (error: any) {
    throw new Error(`Erro ao ler arquivo de imagem: ${error.message}`);
  }
}

/**
 * Upload image to Shopify using Admin API
 * Shopify accepts images via URL or direct upload
 */
async function uploadProductImage(
  productId: number,
  shopifyProductId: string,
  imagePath: string
): Promise<boolean> {
  try {
    console.log(`\n📸 Uploading image for product ID ${productId} (Shopify ID: ${shopifyProductId})`);
    console.log(`   Image path: ${imagePath}`);

    // Check if image file exists
    if (!existsSync(imagePath)) {
      console.error(`   ❌ Arquivo de imagem não encontrado: ${imagePath}`);
      return false;
    }

    // Convert image to base64 (Shopify expects just the base64 string)
    const base64Image = imageToBase64(imagePath);
    const imageSizeKB = Math.round((base64Image.length * 3) / 4 / 1024); // Approximate size
    console.log(`   ✅ Imagem convertida para Base64 (aproximadamente ${imageSizeKB} KB)`);

    // Shopify Admin API accepts images via base64 attachment
    // The attachment field should contain just the base64 string
    try {
      const imageResponse = await shopifyRequest<{ image: any }>(
        `/products/${shopifyProductId}/images.json`,
        {
          method: "POST",
          body: JSON.stringify({
            image: {
              attachment: base64Image,
              alt: productId.toString(),
            },
          }),
        }
      );

      if (imageResponse.image) {
        console.log(`   ✅ Imagem adicionada ao produto com sucesso!`);
        console.log(`   Image ID: ${imageResponse.image.id}`);
        console.log(`   Image URL: ${imageResponse.image.src}`);
        return true;
      } else {
        console.error(`   ❌ Resposta inválida da API`);
        return false;
      }
    } catch (error: any) {
      console.error(`   ❌ Erro ao fazer upload da imagem: ${error.message}`);
      
      // Log more details if available
      if (error.message?.includes("Not Acceptable") || error.message?.includes("400")) {
        console.error(`   💡 Dica: Verifique se o formato da imagem é suportado (JPEG, PNG, WEBP)`);
        console.error(`   💡 Dica: Verifique se o tamanho da imagem não excede 20MB`);
      }
      
      return false;
    }

    return false;
  } catch (error: any) {
    console.error(`   ❌ Erro ao fazer upload da imagem:`, error.message);
    return false;
  }
}

/**
 * Check if product already has images
 */
async function productHasImages(shopifyProductId: string): Promise<boolean> {
  try {
    const product = await shopifyRequest<{ product: any }>(
      `/products/${shopifyProductId}.json`
    );
    return (
      product.product?.images &&
      product.product.images.length > 0 &&
      product.product.images[0].src
    );
  } catch (error) {
    return false;
  }
}

async function main() {
  console.log("🚀 Iniciando upload de imagens dos produtos para Shopify\n");

  let successCount = 0;
  let skippedCount = 0;
  let errorCount = 0;
  let totalCount = 0;

  for (const product of products) {
    totalCount++;

    const mapping = shopifyProductMapping[product.id];
    if (!mapping) {
      console.log(`\n⚠️ Produto ID ${product.id} (${product.name}) não encontrado no mapeamento`);
      skippedCount++;
      continue;
    }

    // Get first/main image
    if (!product.images || product.images.length === 0) {
      console.log(`\n⚠️ Produto ID ${product.id} (${product.name}) não tem imagens`);
      skippedCount++;
      continue;
    }

    const mainImageUrl = product.images[0];
    const imagePath = getImagePath(mainImageUrl);

    console.log(`\n📦 Processando produto: ${product.name} (ID: ${product.id})`);

    // Check if product already has images
    const hasImages = await productHasImages(mapping.shopifyId);
    if (hasImages) {
      console.log(`   ⏭️ Produto já possui imagens. Pulando...`);
      skippedCount++;
      continue;
    }

    // Upload image
    const success = await uploadProductImage(
      product.id,
      mapping.shopifyId,
      imagePath
    );

    if (success) {
      successCount++;
    } else {
      errorCount++;
    }

    // Small delay to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  console.log(`\n\n📊 Resumo do Upload:`);
  console.log(`   Total de produtos: ${totalCount}`);
  console.log(`   ✅ Sucesso: ${successCount}`);
  console.log(`   ⏭️ Pulados (já possuem imagens): ${skippedCount}`);
  console.log(`   ❌ Erros: ${errorCount}`);
}

main();
