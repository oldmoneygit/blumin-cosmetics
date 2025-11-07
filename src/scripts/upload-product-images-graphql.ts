/**
 * Script completo para fazer upload de imagens principais dos produtos via GraphQL API
 * Usa a conexão existente com SHOPIFY_ACCESS_TOKEN
 * 
 * Executar com: npx tsx src/scripts/upload-product-images-graphql.ts
 */

import { config } from "dotenv";
import { resolve } from "path";
import { readFileSync, existsSync } from "fs";
import { shopifyProductMapping } from "@/data/shopify-mapping";
import { products } from "@/data/products";

// Load .env.local
config({ path: resolve(process.cwd(), ".env.local") });

// Configuração do Shopify
const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN || '';
const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN || '';
const SHOPIFY_API_VERSION = process.env.SHOPIFY_API_VERSION || '2024-01';

const SHOPIFY_GRAPHQL_URL = `https://${SHOPIFY_STORE_DOMAIN}/admin/api/${SHOPIFY_API_VERSION}/graphql.json`;

/**
 * Verifica se o Shopify está configurado
 */
function checkShopifyConfig(): void {
  if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_ACCESS_TOKEN) {
    throw new Error(
      "❌ Shopify não está configurado!\n" +
      "   Configure SHOPIFY_STORE_DOMAIN e SHOPIFY_ACCESS_TOKEN no arquivo .env.local"
    );
  }
}

/**
 * Faz uma requisição GraphQL para o Shopify Admin API
 */
async function shopifyGraphQLRequest<T>(query: string, variables?: Record<string, any>): Promise<T> {
  const response = await fetch(SHOPIFY_GRAPHQL_URL, {
    method: "POST",
    headers: {
      "X-Shopify-Access-Token": SHOPIFY_ACCESS_TOKEN,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Shopify GraphQL API Error (${response.status}): ${errorText}`);
  }

  const result = await response.json();

  if (result.errors) {
    const errorMessages = result.errors.map((e: any) => e.message).join(", ");
    throw new Error(`Shopify GraphQL Error: ${errorMessages}`);
  }

  return result.data as T;
}

/**
 * Converte imagem local para base64
 */
function imageToBase64(imagePath: string): string {
  try {
    const imageBuffer = readFileSync(imagePath);
    return imageBuffer.toString("base64");
  } catch (error: any) {
    throw new Error(`Erro ao ler arquivo de imagem: ${error.message}`);
  }
}

/**
 * Obtém o caminho do arquivo de imagem no sistema de arquivos
 */
function getImagePath(imageUrl: string): string {
  // Remove leading slash e converte para caminho do sistema de arquivos
  const relativePath = imageUrl.startsWith("/") ? imageUrl.slice(1) : imageUrl;
  return resolve(process.cwd(), "public", relativePath);
}

/**
 * Verifica se o produto já possui imagens na Shopify
 */
async function productHasImages(shopifyProductId: string): Promise<boolean> {
  const query = `
    query getProduct($id: ID!) {
      product(id: $id) {
        id
        images(first: 1) {
          edges {
            node {
              id
              url
            }
          }
        }
      }
    }
  `;

  try {
    const result = await shopifyGraphQLRequest<{
      product: {
        images: {
          edges: Array<{
            node: {
              id: string;
              url: string;
            };
          }>;
        };
      };
    }>(query, {
      id: `gid://shopify/Product/${shopifyProductId}`,
    });

    return (
      result.product?.images?.edges?.length > 0 &&
      result.product.images.edges[0].node.url !== null
    );
  } catch (error) {
    console.error(`   ⚠️ Erro ao verificar imagens: ${error}`);
    return false;
  }
}

/**
 * Faz upload de uma imagem diretamente via GraphQL usando productCreateMedia
 * Este método aceita base64 diretamente no originalSource
 */
async function uploadImageDirectly(imagePath: string, filename: string): Promise<string> {
  try {
    // Converter imagem para base64
    const base64Image = imageToBase64(imagePath);
    
    // Determinar o tipo MIME baseado na extensão
    const ext = filename.split('.').pop()?.toLowerCase();
    let mimeType = 'image/jpeg';
    if (ext === 'png') mimeType = 'image/png';
    else if (ext === 'webp') mimeType = 'image/webp';
    else if (ext === 'gif') mimeType = 'image/gif';

    // Criar data URL format para originalSource
    const dataUrl = `data:${mimeType};base64,${base64Image}`;
    
    return dataUrl;
  } catch (error: any) {
    throw new Error(`Erro ao preparar imagem: ${error.message}`);
  }
}

/**
 * Adiciona imagem ao produto usando GraphQL
 * A imagem será automaticamente definida como principal se for a primeira
 */
async function addImageToProduct(
  shopifyProductId: string,
  imageDataUrl: string,
  altText?: string
): Promise<boolean> {
  try {
    // Mutation para adicionar imagem ao produto
    const addImageQuery = `
      mutation productCreateMedia($productId: ID!, $media: [CreateMediaInput!]!) {
        productCreateMedia(productId: $productId, media: $media) {
          media {
            ... on MediaImage {
              id
              image {
                url
                altText
              }
            }
          }
          mediaUserErrors {
            field
            message
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const result = await shopifyGraphQLRequest<{
      productCreateMedia: {
        media: Array<{
          id: string;
          image?: {
            url: string;
            altText?: string;
          };
        }>;
        mediaUserErrors: Array<{
          field: string[];
          message: string;
        }>;
        userErrors: Array<{
          field: string[];
          message: string;
        }>;
      };
    }>(addImageQuery, {
      productId: `gid://shopify/Product/${shopifyProductId}`,
      media: [
        {
          originalSource: imageDataUrl,
          mediaContentType: "IMAGE",
          alt: altText || "Product image",
        },
      ],
    });

    if (result.productCreateMedia.userErrors && result.productCreateMedia.userErrors.length > 0) {
      const errors = result.productCreateMedia.userErrors.map((e) => e.message).join(", ");
      console.error(`   ❌ Erros: ${errors}`);
      return false;
    }

    if (result.productCreateMedia.mediaUserErrors && result.productCreateMedia.mediaUserErrors.length > 0) {
      const errors = result.productCreateMedia.mediaUserErrors.map((e) => e.message).join(", ");
      console.error(`   ❌ Erros de mídia: ${errors}`);
      return false;
    }

    if (result.productCreateMedia.media && result.productCreateMedia.media.length > 0) {
      const imageUrl = result.productCreateMedia.media[0].image?.url;
      console.log(`   ✅ Imagem adicionada com sucesso!`);
      if (imageUrl) {
        console.log(`   📷 URL: ${imageUrl}`);
      }
      return true;
    }

    return false;
  } catch (error: any) {
    console.error(`   ❌ Erro ao adicionar imagem ao produto: ${error.message}`);
    return false;
  }
}

/**
 * Método alternativo: Upload direto via REST API (fallback)
 * Usa o endpoint REST se o método GraphQL falhar
 */
async function uploadImageViaREST(
  shopifyProductId: string,
  imagePath: string
): Promise<boolean> {
  try {
    const base64Image = imageToBase64(imagePath);
    
    const response = await fetch(
      `https://${SHOPIFY_STORE_DOMAIN}/admin/api/${SHOPIFY_API_VERSION}/products/${shopifyProductId}/images.json`,
      {
        method: "POST",
        headers: {
          "X-Shopify-Access-Token": SHOPIFY_ACCESS_TOKEN,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: {
            attachment: base64Image,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`REST API Error: ${errorText}`);
    }

    const result = await response.json();
    if (result.image) {
      console.log(`   ✅ Imagem adicionada via REST API`);
      console.log(`   📷 URL: ${result.image.src}`);
      return true;
    }

    return false;
  } catch (error: any) {
    throw new Error(`Erro no upload via REST: ${error.message}`);
  }
}

/**
 * Faz upload da imagem principal do produto
 */
async function uploadProductMainImage(
  productId: number,
  productName: string,
  shopifyProductId: string,
  imagePath: string
): Promise<boolean> {
  try {
    console.log(`\n📸 Fazendo upload da imagem principal`);
    console.log(`   Produto ID: ${productId} (Shopify ID: ${shopifyProductId})`);
    console.log(`   Caminho da imagem: ${imagePath}`);

    // Verificar se o arquivo existe
    if (!existsSync(imagePath)) {
      console.error(`   ❌ Arquivo de imagem não encontrado: ${imagePath}`);
      return false;
    }

    // Extrair nome do arquivo
    const filename = imagePath.split(/[/\\]/).pop() || `product-${productId}.jpg`;

    // Tentar método GraphQL primeiro
    try {
      console.log(`   🔄 Tentando upload via GraphQL...`);
      
      // Preparar imagem (converter para data URL)
      const imageDataUrl = await uploadImageDirectly(imagePath, filename);
      console.log(`   ✅ Imagem preparada (tamanho: ${Math.round(imageDataUrl.length / 1024)} KB)`);

      // Adicionar ao produto
      const success = await addImageToProduct(
        shopifyProductId,
        imageDataUrl,
        productName
      );
      
      if (success) {
        return true;
      }
    } catch (graphqlError: any) {
      console.log(`   ⚠️ Método GraphQL falhou: ${graphqlError.message}`);
      console.log(`   🔄 Tentando método REST como fallback...`);

      // Fallback para REST API
      try {
        const success = await uploadImageViaREST(shopifyProductId, imagePath);
        return success;
      } catch (restError: any) {
        console.error(`   ❌ Método REST também falhou: ${restError.message}`);
        return false;
      }
    }

    return false;
  } catch (error: any) {
    console.error(`   ❌ Erro geral: ${error.message}`);
    return false;
  }
}

/**
 * Função principal
 */
async function main() {
  console.log("🚀 Iniciando upload de imagens principais via GraphQL API\n");
  console.log(`📦 Store: ${SHOPIFY_STORE_DOMAIN}`);
  console.log(`🔑 Token: ${SHOPIFY_ACCESS_TOKEN ? "✅ Configurado" : "❌ Não configurado"}\n`);

  try {
    // Verificar configuração
    checkShopifyConfig();

    let successCount = 0;
    let skippedCount = 0;
    let errorCount = 0;
    let totalCount = 0;

    // Processar cada produto
    for (const product of products) {
      totalCount++;

      const mapping = shopifyProductMapping[product.id];
      if (!mapping) {
        console.log(`\n⚠️ Produto ID ${product.id} (${product.name}) não encontrado no mapeamento`);
        skippedCount++;
        continue;
      }

      // Verificar se o produto tem imagens
      if (!product.images || product.images.length === 0) {
        console.log(`\n⚠️ Produto ID ${product.id} (${product.name}) não tem imagens`);
        skippedCount++;
        continue;
      }

      const mainImageUrl = product.images[0];
      const imagePath = getImagePath(mainImageUrl);

      console.log(`\n📦 Processando: ${product.name} (ID: ${product.id})`);

      // Verificar se o produto já possui imagens
      const hasImages = await productHasImages(mapping.shopifyId);
      if (hasImages) {
        console.log(`   ⏭️ Produto já possui imagens. Pulando...`);
        skippedCount++;
        continue;
      }

      // Fazer upload da imagem principal
      const success = await uploadProductMainImage(
        product.id,
        product.name,
        mapping.shopifyId,
        imagePath
      );

      if (success) {
        successCount++;
      } else {
        errorCount++;
      }

      // Delay para evitar rate limiting (2 segundos entre uploads)
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    // Resumo final
    console.log(`\n\n📊 RESUMO DO UPLOAD`);
    console.log(`   Total de produtos: ${totalCount}`);
    console.log(`   ✅ Sucesso: ${successCount}`);
    console.log(`   ⏭️ Pulados (já possuem imagens ou sem mapeamento): ${skippedCount}`);
    console.log(`   ❌ Erros: ${errorCount}`);
    console.log(`\n✨ Processo concluído!\n`);
  } catch (error: any) {
    console.error(`\n❌ Erro fatal: ${error.message}\n`);
    process.exit(1);
  }
}

// Executar
main();

