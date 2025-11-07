# Configuração do Checkout Shopify

## ✅ O que foi implementado

1. **Mapeamento de Produtos**: ✅ Completo
   - Todos os 29 produtos foram mapeados (ID local → ID Shopify)
   - Arquivo: `src/data/shopify-mapping.ts`

2. **Checkout Integrado**: ✅ Completo
   - Botão "Proceder al Checkout" conectado
   - Busca variant IDs dinamicamente via Storefront API
   - Redireciona para checkout da Shopify

3. **Preços em ARS**: ✅ Completo
   - Todos os preços convertidos para Peso Argentino
   - Formatação com AR$ implementada

## 🔧 Configuração Necessária

### 1. Criar Token de Storefront API

A Storefront API usa um token diferente do Admin API. Você precisa criar um:

1. Acesse: `https://admin.shopify.com/store/t3p11a-ea/apps/private`
2. Ou: **Configurações** → **Apps e canais de venda** → **Desenvolver apps**
3. Crie um novo app privado (ou use um existente)
4. Vá em **Configurar** → **Storefront API**
5. Configure as permissões:
   - ✅ `unauthenticated_read_product_listings`
   - ✅ `unauthenticated_read_checkouts`
   - ✅ `unauthenticated_write_checkouts`
6. Instale o app e copie o **Storefront API access token**

### 2. Adicionar Token ao .env.local

Adicione o token do Storefront API ao arquivo `.env.local`:

```env
# Shopify Configuration
SHOPIFY_STORE_DOMAIN=t3p11a-ea.myshopify.com
SHOPIFY_ACCESS_TOKEN=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
SHOPIFY_API_VERSION=2024-01
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=t3p11a-ea.myshopify.com

# Storefront API Token (NOVO - necessário para checkout)
SHOPIFY_STOREFRONT_ACCESS_TOKEN=seu_token_storefront_aqui
```

### 3. Configurar Moeda na Shopify

1. Acesse: `https://admin.shopify.com/store/t3p11a-ea/settings/general`
2. Role até **Moeda da loja**
3. Selecione **Peso argentino (ARS)**
4. Salve

## 📝 Como Funciona

### Fluxo de Checkout

1. **Usuário adiciona produtos ao carrinho**
   - Produtos são armazenados localmente (localStorage)
   - Usa IDs locais dos produtos

2. **Usuário clica em "Proceder al Checkout"**
   - Sistema busca o handle do produto no mapeamento
   - Busca o variant ID via Storefront API usando o handle
   - Converte todos os itens do carrinho para formato Shopify
   - Cria checkout na Shopify
   - Redireciona para página de checkout da Shopify

3. **Pagamento na Shopify**
   - Cliente completa pagamento na Shopify
   - Shopify processa o pedido
   - Você recebe notificação do pedido

## 🧪 Testar Checkout

1. Adicione produtos ao carrinho no site
2. Vá para `/cart`
3. Clique em "Proceder al Checkout"
4. Deve redirecionar para checkout da Shopify

## ⚠️ Problemas Comuns

### Erro: "Storefront API access token is missing"

**Solução**: Adicione `SHOPIFY_STOREFRONT_ACCESS_TOKEN` ao `.env.local`

### Erro: "Invalid Storefront API access token"

**Solução**: Verifique se o token está correto e se o app tem as permissões necessárias

### Erro: "Product not found"

**Solução**: Verifique se o handle do produto está correto no mapeamento

### Variant ID não encontrado

**Solução**: Verifique se o produto tem variantes na Shopify

## 📚 Arquivos Modificados

- `src/app/cart/page.tsx` - Página do carrinho com checkout integrado
- `src/lib/shopify-storefront.ts` - Funções da Storefront API
- `src/data/shopify-mapping.ts` - Mapeamento de produtos

## 🎯 Próximos Passos

1. ✅ Criar token de Storefront API
2. ✅ Adicionar ao `.env.local`
3. ✅ Testar checkout
4. ✅ Configurar moeda na Shopify
5. ✅ Testar fluxo completo de compra

