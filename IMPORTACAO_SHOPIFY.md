# Guia de Importação de Produtos para Shopify

## ✅ Status da Conexão

A conexão com Shopify foi **testada e validada com sucesso**!

- ✅ Store Domain: `t3p11a-ea.myshopify.com`
- ✅ Access Token: Configurado e funcionando
- ✅ API Version: 2024-01

## 📋 Passo a Passo para Importar Produtos

### 1. Testar a Conexão

Primeiro, teste se a conexão está funcionando:

```bash
npx tsx src/scripts/test-shopify-connection.ts
```

Você deve ver:
```
✅ Conexão bem-sucedida!
📊 Total de produtos encontrados: X
```

### 2. Importar Produtos

Execute o script de importação:

```bash
npx tsx src/scripts/import-products-to-shopify.ts
```

O script vai:
- ✅ Verificar se cada produto já existe na Shopify (pelo handle/slug)
- ✅ Importar produtos que não existem
- ✅ Pular produtos duplicados
- ✅ Mostrar um resumo no final

### 3. O que o Script Faz

Para cada produto local (`src/data/products.ts`), o script:

1. **Converte o formato local para Shopify:**
   - Nome → `title`
   - Descrição completa → `body_html` (com benefícios, ingredientes, como usar)
   - Categoria → `product_type`
   - Tags → `tags`
   - Preço → `variants[0].price`
   - SKU → `KAHI-{id}`
   - Estoque → 100 se `inStock`, 0 caso contrário

2. **Verifica duplicatas:**
   - Compara pelo `handle` (slug)
   - Pula se já existir

3. **Importa:**
   - Cria produto na Shopify
   - Retorna ID do produto criado

### 4. ⚠️ Importante: Imagens

**O script NÃO importa imagens locais automaticamente.**

As imagens precisam estar hospedadas em URLs públicas. Opções:

#### Opção A: Usar URLs já existentes
Se suas imagens já estão em um CDN ou servidor, atualize o caminho no `src/data/products.ts`:
```typescript
images: [
  "https://seusite.com/images/products/produto.jpg"
]
```

#### Opção B: Upload manual na Shopify
1. Após importar, vá na Shopify Admin
2. Edite cada produto
3. Faça upload das imagens manualmente

#### Opção C: Usar Shopify Files API (Futuro)
Podemos criar um script adicional para fazer upload das imagens via API.

### 5. Depois da Importação

#### 5.1 Verificar Produtos na Shopify Admin
1. Acesse: `https://admin.shopify.com/store/t3p11a-ea`
2. Vá em **Produtos**
3. Verifique se todos os produtos foram importados

#### 5.2 Mapear IDs
Após importar, você precisará mapear os IDs locais com os IDs da Shopify:

**Criar arquivo de mapeamento:**
```typescript
// src/data/shopify-mapping.ts
export const shopifyProductMapping: Record<number, string> = {
  1: "gid://shopify/Product/123456789", // ID local → ID Shopify
  2: "gid://shopify/Product/123456790",
  // ...
};
```

**Script para gerar mapeamento automaticamente:**
```bash
npx tsx src/scripts/generate-shopify-mapping.ts
```

#### 5.3 Sincronizar Estoque
Configure sincronização automática de estoque se necessário.

#### 5.4 Atualizar Frontend
Atualize o código para buscar produtos da Shopify em vez de `src/data/products.ts`.

### 6. Próximos Passos

1. ✅ **Importar produtos** (execute o script)
2. ⏳ **Upload de imagens** (manual ou via script futuro)
3. ⏳ **Mapear IDs** (criar arquivo de mapeamento)
4. ⏳ **Atualizar carrinho** (usar Shopify Checkout)
5. ⏳ **Configurar webhooks** (para sincronização)

### 7. Troubleshooting

#### Erro: "Shopify não está configurado"
- Verifique se `.env.local` existe na raiz do projeto
- Verifique se as variáveis estão corretas

#### Erro: "Shopify API Error: Unauthorized"
- Verifique se o Access Token está correto
- Verifique se o token tem as permissões necessárias no app

#### Erro: "Rate limit exceeded"
- O script já tem delay entre requisições (500ms)
- Se ainda assim houver erro, aumente o delay

#### Produtos não aparecem com imagens
- As imagens locais precisam ser hospedadas
- Faça upload manual na Shopify Admin

## 📞 Suporte

Se encontrar problemas, verifique:
1. Logs do script
2. Shopify Admin → Apps → Ver permissões do app
3. Shopify API Documentation

