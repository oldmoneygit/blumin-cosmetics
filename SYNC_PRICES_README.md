# Script de Sincronização de Preços da Shopify

Script Python para sincronizar preços da Shopify com o arquivo `products.ts` do projeto Next.js.

## 📋 Pré-requisitos

1. Python 3.7 ou superior instalado
2. Arquivo `.env.local` configurado com as credenciais da Shopify

## 🚀 Instalação

1. Instale as dependências Python:

```bash
pip install -r requirements.txt
```

Ou instale manualmente:

```bash
pip install requests python-dotenv
```

## ⚙️ Configuração

Certifique-se de que o arquivo `.env.local` na raiz do projeto contém:

```env
SHOPIFY_STORE_DOMAIN=t3p11a-ea.myshopify.com
SHOPIFY_ACCESS_TOKEN=shpat_...
SHOPIFY_API_VERSION=2024-01
```

## 📝 Como Usar

Execute o script:

```bash
python sync_prices_from_shopify.py
```

O script irá:

1. ✅ Verificar a configuração do Shopify
2. 🔗 Testar a conexão com a API
3. 📋 Carregar o mapeamento de produtos
4. 📦 Buscar preços atualizados da Shopify
5. 🔄 Atualizar o arquivo `src/data/products.ts`
6. 📊 Mostrar um resumo das mudanças

## ✨ Funcionalidades

- ✅ Sincroniza preços (`price`) de todos os produtos
- ✅ Sincroniza preços originais (`originalPrice`) quando disponíveis
- ✅ Atualiza apenas produtos que têm mudanças
- ✅ Preserva toda a formatação do arquivo TypeScript
- ✅ Mostra progresso detalhado
- ✅ Tratamento de erros robusto

## 📊 Exemplo de Saída

```
🔄 Sincronizando preços da Shopify para o projeto Next.js

✅ Configuração detectada
   Store: t3p11a-ea.myshopify.com

🔗 Testando conexão com Shopify...
   ✅ Conexão estabelecida com sucesso!

📋 Carregando mapeamento de produtos...
   ✅ 29 produtos mapeados

📦 Carregando produtos locais...
   ✅ 29 produtos encontrados

📦 Buscando preços atualizados...

📦 Processando: Produto ID 1
   📊 Preço atual: 32000.0 ARS → Novo: 35000.0 ARS
   📊 Preço original: 40000.0 ARS → Novo: 45000.0 ARS

...

📊 RESUMO DA SINCRONIZAÇÃO
   Total de produtos: 29
   ✅ Sincronizados: 29
   ⏭️  Pulados: 0
   ❌ Erros: 0
   📝 Atualizações necessárias: 5

🔄 Aplicando atualizações no arquivo products.ts...

✅ Arquivo products.ts atualizado com sucesso!

✨ Sincronização concluída com sucesso!
```

## 🔧 Solução de Problemas

### Erro: "Shopify não está configurado"

Verifique se o arquivo `.env.local` existe e contém as variáveis corretas.

### Erro: "fetch failed" ou problemas de conexão

1. Verifique sua conexão com a internet
2. Confirme que o `SHOPIFY_STORE_DOMAIN` está correto (apenas o domínio, sem `https://`)
3. Verifique se o `SHOPIFY_ACCESS_TOKEN` está válido e não expirou
4. Teste a conexão manualmente:
   ```bash
   curl -H "X-Shopify-Access-Token: SEU_TOKEN" \
        https://t3p11a-ea.myshopify.com/admin/api/2024-01/products.json?limit=1
   ```

### Erro: "Nenhum mapeamento encontrado"

Certifique-se de que o arquivo `src/data/shopify-mapping.ts` existe e está formatado corretamente.

## 📝 Notas

- O script usa a API REST da Shopify (não GraphQL)
- Há um delay de 300ms entre requisições para evitar rate limiting
- O script preserva toda a formatação do arquivo TypeScript original
- Apenas os campos `price` e `originalPrice` são atualizados

## 🔄 Comparação com TypeScript

Este script Python é mais simples e confiável que a versão TypeScript porque:

- ✅ Melhor manipulação de strings e regex
- ✅ Bibliotecas HTTP mais maduras (`requests`)
- ✅ Mais fácil de debugar
- ✅ Melhor tratamento de erros
- ✅ Não depende de configurações do Node.js/TypeScript

