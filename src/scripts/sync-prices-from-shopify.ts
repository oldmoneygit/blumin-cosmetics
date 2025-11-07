/**
 * Script para sincronizar preços da Shopify para o projeto Next.js
 * Busca os preços atualizados da Shopify e atualiza o arquivo products.ts
 * 
 * Executar com: npx tsx src/scripts/sync-prices-from-shopify.ts
 */

import { config } from "dotenv";
import { resolve } from "path";
import { readFileSync, writeFileSync } from "fs";

// IMPORTANTE: Carregar .env.local ANTES de importar módulos que usam process.env
config({ path: resolve(process.cwd(), ".env.local") });

// Agora podemos importar os módulos que dependem das variáveis de ambiente
import { shopifyRequest } from "@/lib/shopify";
import { shopifyProductMapping } from "@/data/shopify-mapping";
import { products } from "@/data/products";

interface PriceUpdate {
  productId: number;
  productName: string;
  oldPrice: number;
  newPrice: number;
  oldOriginalPrice?: number;
  newOriginalPrice?: number;
}

/**
 * Busca preços de um produto na Shopify
 * Usa a função shopifyRequest que já está configurada e funcionando
 */
async function getShopifyPrices(shopifyProductId: string): Promise<{
  price: number;
  originalPrice?: number;
} | null> {
  try {
    const response = await shopifyRequest<{ product: any }>(
      `/products/${shopifyProductId}.json`
    );

    if (!response.product || !response.product.variants || response.product.variants.length === 0) {
      return null;
    }

    // Pegar primeira variante (geralmente é a principal)
    const variant = response.product.variants[0];
    
    // Converter preço de string para número
    // Shopify retorna preços como strings, exemplo: "32000.00"
    const price = parseFloat(variant.price) || 0;
    
    // compare_at_price é o preço original (se houver)
    const originalPrice = variant.compare_at_price 
      ? parseFloat(variant.compare_at_price) 
      : undefined;

    return {
      price,
      originalPrice,
    };
  } catch (error: any) {
    console.error(`   ❌ Erro ao buscar preços: ${error.message}`);
    return null;
  }
}

/**
 * Atualiza o arquivo products.ts com os novos preços
 * Usa uma abordagem linha por linha para maior precisão
 */
function updateProductsFile(updates: PriceUpdate[]): void {
  const filePath = resolve(process.cwd(), "src/data/products.ts");
  const fileContent = readFileSync(filePath, "utf-8");
  const lines = fileContent.split("\n");

  // Criar um mapa de atualizações por ID do produto
  const updatesMap = new Map<number, PriceUpdate>();
  updates.forEach(update => {
    updatesMap.set(update.productId, update);
  });

  let currentProductId: number | null = null;
  let braceDepth = 0;
  let inProductObject = false;
  let priceLineIndexInUpdated: number | null = null;
  let hasOriginalPrice = false;
  const updatedLines: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let modifiedLine = line;
    let skipLine = false;

    // Detectar início de um produto (linha com "id: X,")
    const idMatch = line.match(/^\s*id:\s*(\d+)/);
    if (idMatch) {
      currentProductId = parseInt(idMatch[1], 10);
      inProductObject = true;
      braceDepth = 0;
      priceLineIndexInUpdated = null;
      hasOriginalPrice = false;
    }

    // Contar chaves para detectar fim do objeto produto
    if (inProductObject) {
      const openBraces = (line.match(/{/g) || []).length;
      const closeBraces = (line.match(/}/g) || []).length;
      braceDepth += openBraces - closeBraces;

      if (currentProductId !== null) {
        const update = updatesMap.get(currentProductId);

        if (update) {
          // Atualizar linha de price
          if (line.match(/^\s*price:\s*[\d.]+/)) {
            modifiedLine = line.replace(/price:\s*[\d.]+/, `price: ${update.newPrice}`);
            // Salvar o índice onde esta linha será adicionada
            priceLineIndexInUpdated = updatedLines.length;
          }

          // Atualizar linha de originalPrice
          if (line.match(/^\s*originalPrice:\s*[\d.]+/)) {
            hasOriginalPrice = true;
            if (update.newOriginalPrice !== undefined) {
              modifiedLine = line.replace(/originalPrice:\s*[\d.]+/, `originalPrice: ${update.newOriginalPrice}`);
            } else {
              // Remover linha se não há mais originalPrice
              skipLine = true;
            }
          }
        }
      }

      // Se chegamos ao fim do objeto e precisamos adicionar originalPrice
      if (braceDepth <= 0 && inProductObject && currentProductId !== null) {
        const update = updatesMap.get(currentProductId);
        
        if (update && update.newOriginalPrice !== undefined && !hasOriginalPrice && priceLineIndexInUpdated !== null) {
          // Encontrar a linha de price no array atualizado e adicionar originalPrice após ela
          const priceLine = updatedLines[priceLineIndexInUpdated];
          if (priceLine && priceLine.match(/^\s*price:\s*[\d.]+/)) {
            const indent = priceLine.match(/^(\s*)/)?.[1] || "    ";
            // Inserir originalPrice após a linha de price
            updatedLines.splice(priceLineIndexInUpdated + 1, 0, `${indent}originalPrice: ${update.newOriginalPrice},`);
          }
        }

        inProductObject = false;
        currentProductId = null;
        priceLineIndexInUpdated = null;
        hasOriginalPrice = false;
      }
    }

    if (!skipLine) {
      updatedLines.push(modifiedLine);
    }
  }

  // Salvar arquivo atualizado
  const newContent = updatedLines.join("\n");
  writeFileSync(filePath, newContent, "utf-8");
  console.log(`\n✅ Arquivo products.ts atualizado com sucesso!`);
}

/**
 * Função principal
 */
async function main() {
  console.log("🔄 Sincronizando preços da Shopify para o projeto Next.js\n");
  
  // Verificar configuração diretamente (já que dotenv já foi carregado)
  const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN || '';
  const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN || '';
  
  if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_ACCESS_TOKEN) {
    console.error("❌ Erro: Shopify não está configurado corretamente!");
    console.error("   Configure as variáveis no arquivo .env.local:");
    console.error("   - SHOPIFY_STORE_DOMAIN=your-store.myshopify.com");
    console.error("   - SHOPIFY_ACCESS_TOKEN=shpat_...");
    console.error(`\n   Valores atuais:`);
    console.error(`   - SHOPIFY_STORE_DOMAIN: ${SHOPIFY_STORE_DOMAIN || '❌ NÃO CONFIGURADO'}`);
    console.error(`   - SHOPIFY_ACCESS_TOKEN: ${SHOPIFY_ACCESS_TOKEN ? '✅ Configurado' : '❌ NÃO CONFIGURADO'}`);
    process.exit(1);
  }
  
  console.log("✅ Configuração detectada");
  console.log(`   Store: ${SHOPIFY_STORE_DOMAIN}\n`);
  
  // Testar conexão com uma requisição simples primeiro
  console.log("🔗 Testando conexão com Shopify...");
  try {
    const testResponse = await shopifyRequest<{ products: any[] }>('/products.json?limit=1');
    
    if (!testResponse || !testResponse.products) {
      console.error(`   ❌ Resposta inválida da API`);
      process.exit(1);
    }
    
    console.log("   ✅ Conexão estabelecida com sucesso!\n");
  } catch (error: any) {
    console.error(`   ❌ Erro ao conectar: ${error.message}`);
    console.error(`   💡 Possíveis causas:`);
    console.error(`      - URL incorreta ou store domain inválido`);
    console.error(`      - Token de acesso inválido ou expirado`);
    console.error(`      - Problemas de rede/firewall`);
    console.error(`      - Store domain deve ser apenas o domínio (ex: t3p11a-ea.myshopify.com)`);
    console.error(`\n   💡 Dica: Teste a conexão primeiro com:`);
    console.error(`      npx tsx src/scripts/test-shopify-connection.ts`);
    process.exit(1);
  }
  
  console.log("📦 Buscando preços atualizados...\n");

  const updates: PriceUpdate[] = [];
  let successCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  // Processar cada produto local
  for (const product of products) {
    const mapping = shopifyProductMapping[product.id];
    
    if (!mapping) {
      console.log(`⚠️  Produto ID ${product.id} (${product.name}): Não encontrado no mapeamento`);
      skippedCount++;
      continue;
    }

    console.log(`📦 Processando: ${product.name} (ID: ${product.id})`);

    try {
      // Buscar preços na Shopify
      const shopifyPrices = await getShopifyPrices(mapping.shopifyId);

      if (!shopifyPrices) {
        console.log(`   ⚠️  Não foi possível obter preços da Shopify`);
        skippedCount++;
        continue;
      }

      const oldPrice = product.price;
      const newPrice = shopifyPrices.price;
      const oldOriginalPrice = product.originalPrice;
      const newOriginalPrice = shopifyPrices.originalPrice;

      // Verificar se houve mudança
      const priceChanged = oldPrice !== newPrice;
      const originalPriceChanged = oldOriginalPrice !== newOriginalPrice;

      if (!priceChanged && !originalPriceChanged) {
        console.log(`   ✅ Preços já estão sincronizados (${newPrice} ARS)`);
        successCount++;
      } else {
        console.log(`   📊 Preço atual: ${oldPrice} ARS → Novo: ${newPrice} ARS`);
        if (oldOriginalPrice !== undefined || newOriginalPrice !== undefined) {
          console.log(`   📊 Preço original: ${oldOriginalPrice || "N/A"} ARS → Novo: ${newOriginalPrice || "N/A"} ARS`);
        }

        updates.push({
          productId: product.id,
          productName: product.name,
          oldPrice,
          newPrice,
          oldOriginalPrice,
          newOriginalPrice,
        });

        successCount++;
      }

      // Delay para evitar rate limiting
      await new Promise((resolve) => setTimeout(resolve, 300));
    } catch (error: any) {
      console.error(`   ❌ Erro: ${error.message}`);
      errorCount++;
    }
  }

  // Resumo
  console.log(`\n\n📊 RESUMO DA SINCRONIZAÇÃO`);
  console.log(`   Total de produtos: ${products.length}`);
  console.log(`   ✅ Sincronizados: ${successCount}`);
  console.log(`   ⏭️  Pulados: ${skippedCount}`);
  console.log(`   ❌ Erros: ${errorCount}`);
  console.log(`   📝 Atualizações necessárias: ${updates.length}`);

  // Se houver atualizações, aplicar no arquivo
  if (updates.length > 0) {
    console.log(`\n🔄 Aplicando atualizações no arquivo products.ts...`);
    
    // Mostrar resumo das mudanças
    console.log(`\n📋 Mudanças que serão aplicadas:`);
    updates.forEach(update => {
      console.log(`   - ${update.productName} (ID: ${update.productId}):`);
      console.log(`     Preço: ${update.oldPrice} → ${update.newPrice} ARS`);
      if (update.newOriginalPrice !== undefined) {
        console.log(`     Preço Original: ${update.oldOriginalPrice || "N/A"} → ${update.newOriginalPrice} ARS`);
      }
    });

    // Atualizar arquivo
    updateProductsFile(updates);
    
    console.log(`\n✨ Sincronização concluída com sucesso!`);
    console.log(`\n📝 Próximos passos:`);
    console.log(`   1. Verifique o arquivo src/data/products.ts`);
    console.log(`   2. Execute o projeto para verificar se os preços estão corretos`);
  } else {
    console.log(`\n✅ Todos os preços já estão sincronizados!`);
  }
}

// Executar
main().catch((error) => {
  console.error(`\n❌ Erro fatal: ${error.message}`);
  process.exit(1);
});

