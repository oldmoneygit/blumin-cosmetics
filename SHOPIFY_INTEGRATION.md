# Integração Shopify - BLUMIN

## Configuração

O projeto está configurado para usar Shopify como backend para gestão de produtos, processamento de pedidos e checkout (dropshipping).

### Credenciais

As credenciais estão configuradas no arquivo `.env.local`:

```
SHOPIFY_STORE_DOMAIN=t3p11a-ea.myshopify.com
SHOPIFY_ACCESS_TOKEN=488c27e877c3d774a4f23f1ae4682968
SHOPIFY_API_VERSION=2024-01
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=t3p11a-ea.myshopify.com
```

## Funcionalidades

### 1. Admin API (Backend)
Localização: `src/lib/shopify.ts`

- **getShopifyProducts()** - Buscar todos os produtos
- **getShopifyProduct(productId)** - Buscar produto por ID
- **getShopifyProductByHandle(handle)** - Buscar produto por handle (slug)
- **createCheckout(items)** - Criar checkout
- **createCart(items)** - Criar carrinho
- **getShopifyOrder(orderId)** - Buscar pedido por ID
- **getShopifyOrders()** - Buscar todos os pedidos

### 2. Storefront API (Frontend Público)
Localização: `src/lib/shopify-storefront.ts`

- **getStorefrontProducts()** - Buscar produtos (GraphQL)
- **getStorefrontProductByHandle(handle)** - Buscar produto por handle
- **createStorefrontCheckout(items)** - Criar checkout público

### 3. React Hooks
Localização: `src/hooks/useShopify.ts`

- **useShopifyProducts()** - Hook para buscar produtos
- **useShopifyProduct(handle)** - Hook para buscar produto específico
- **useShopifyCheckout()** - Hook para criar checkout

## Como Usar

### Exemplo: Buscar produtos

```typescript
import { useShopifyProducts } from "@/hooks/useShopify";

function ProductsPage() {
  const { products, loading, error } = useShopifyProducts();

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.title}</h2>
          <p>${product.priceRange.minVariantPrice.amount}</p>
        </div>
      ))}
    </div>
  );
}
```

### Exemplo: Buscar produto específico

```typescript
import { useShopifyProduct } from "@/hooks/useShopify";

function ProductPage({ handle }: { handle: string }) {
  const { product, loading, error } = useShopifyProduct(handle);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;
  if (!product) return <div>Produto não encontrado</div>;

  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>${product.priceRange.minVariantPrice.amount}</p>
    </div>
  );
}
```

### Exemplo: Criar checkout

```typescript
import { useShopifyCheckout } from "@/hooks/useShopify";

function CheckoutButton({ variantId, quantity }: { variantId: string; quantity: number }) {
  const { createCheckout, loading } = useShopifyCheckout();

  const handleCheckout = async () => {
    try {
      await createCheckout([{ variantId, quantity }]);
    } catch (error) {
      console.error("Erro ao criar checkout:", error);
    }
  };

  return (
    <button onClick={handleCheckout} disabled={loading}>
      {loading ? "Processando..." : "Finalizar Compra"}
    </button>
  );
}
```

## Próximos Passos

1. **Sincronizar produtos locais com Shopify** - Criar script para atualizar produtos do `src/data/products.ts` com dados do Shopify
2. **Integrar carrinho** - Atualizar o hook `useCart` para usar Shopify
3. **Webhooks** - Configurar webhooks do Shopify para atualizar pedidos automaticamente
4. **Checkout personalizado** - Implementar checkout customizado se necessário

## Notas Importantes

- O `.env.local` está no `.gitignore` e não será commitado
- As credenciais devem ser mantidas seguras
- Para produção, configure as variáveis de ambiente no seu provedor de hospedagem (Vercel, etc.)
- A Storefront API é pública e pode ser usada no frontend
- A Admin API deve ser usada apenas no backend (API routes)

