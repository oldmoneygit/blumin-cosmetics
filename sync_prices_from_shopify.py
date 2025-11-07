#!/usr/bin/env python3
"""
Script para sincronizar preços da Shopify para o projeto Next.js
Busca os preços atualizados da Shopify e atualiza o arquivo products.ts

Executar com: python sync_prices_from_shopify.py
"""

import os
import re
import json
import requests
from pathlib import Path
from typing import Dict, Optional, Tuple
from dotenv import load_dotenv

# Carregar variáveis de ambiente do .env.local
load_dotenv('.env.local')

# Configuração da Shopify
SHOPIFY_STORE_DOMAIN = os.getenv('SHOPIFY_STORE_DOMAIN', '').strip()
SHOPIFY_ACCESS_TOKEN = os.getenv('SHOPIFY_ACCESS_TOKEN', '').strip()
SHOPIFY_API_VERSION = os.getenv('SHOPIFY_API_VERSION', '2024-01').strip()

# URLs
SHOPIFY_API_BASE = f"https://{SHOPIFY_STORE_DOMAIN}/admin/api/{SHOPIFY_API_VERSION}"

# Caminhos dos arquivos
PROJECT_ROOT = Path(__file__).parent
PRODUCTS_FILE = PROJECT_ROOT / "src" / "data" / "products.ts"
MAPPING_FILE = PROJECT_ROOT / "src" / "data" / "shopify-mapping.ts"


def load_shopify_mapping() -> Dict[int, Dict[str, str]]:
    """Carrega o mapeamento de produtos do arquivo shopify-mapping.ts"""
    mapping = {}
    
    if not MAPPING_FILE.exists():
        print(f"❌ Arquivo de mapeamento não encontrado: {MAPPING_FILE}")
        return mapping
    
    content = MAPPING_FILE.read_text(encoding='utf-8')
    
    # Extrair manualmente usando regex - padrão mais robusto
    # Procurar por: ID: { "shopifyId": "...", "shopifyHandle": "..." }
    pattern = r'(\d+):\s*\{\s*"shopifyId":\s*"([^"]+)"\s*,\s*"shopifyHandle":\s*"([^"]+)"\s*\}'
    
    matches = re.finditer(pattern, content)
    for match in matches:
        product_id = int(match.group(1))
        shopify_id = match.group(2)
        shopify_handle = match.group(3)
        mapping[product_id] = {
            "shopifyId": shopify_id,
            "shopifyHandle": shopify_handle
        }
    
    if not mapping:
        print("⚠️  Não foi possível extrair o mapeamento. Tentando padrão alternativo...")
        # Padrão alternativo mais flexível
        pattern = r'(\d+):\s*\{[^}]*"shopifyId"[^:]*:\s*"([^"]+)"[^}]*"shopifyHandle"[^:]*:\s*"([^"]+)"'
        matches = re.finditer(pattern, content)
        for match in matches:
            product_id = int(match.group(1))
            shopify_id = match.group(2)
            shopify_handle = match.group(3)
            mapping[product_id] = {
                "shopifyId": shopify_id,
                "shopifyHandle": shopify_handle
            }
    
    return mapping


def get_shopify_prices(shopify_product_id: str) -> Optional[Dict[str, float]]:
    """Busca preços de um produto na Shopify"""
    url = f"{SHOPIFY_API_BASE}/products/{shopify_product_id}.json"
    
    headers = {
        'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN,
        'Content-Type': 'application/json',
    }
    
    try:
        response = requests.get(url, headers=headers, timeout=30)
        response.raise_for_status()
        
        data = response.json()
        product = data.get('product', {})
        variants = product.get('variants', [])
        
        if not variants:
            return None
        
        # Pegar primeira variante (geralmente é a principal)
        variant = variants[0]
        
        price = float(variant.get('price', 0))
        compare_at_price = variant.get('compare_at_price')
        original_price = float(compare_at_price) if compare_at_price else None
        
        return {
            'price': price,
            'originalPrice': original_price
        }
    
    except requests.exceptions.RequestException as e:
        print(f"   ❌ Erro ao buscar preços: {e}")
        return None


def update_products_file(updates: Dict[int, Dict[str, float]]):
    """Atualiza o arquivo products.ts com os novos preços"""
    if not PRODUCTS_FILE.exists():
        print(f"❌ Arquivo não encontrado: {PRODUCTS_FILE}")
        return
    
    content = PRODUCTS_FILE.read_text(encoding='utf-8')
    lines = content.split('\n')
    
    updated_lines = []
    current_product_id = None
    price_updated = False
    original_price_updated = False
    
    i = 0
    while i < len(lines):
        line = lines[i]
        
        # Detectar início de um produto - resetar flags
        id_match = re.match(r'^\s*id:\s*(\d+)', line)
        if id_match:
            current_product_id = int(id_match.group(1))
            price_updated = False
            original_price_updated = False
        
        # Se estamos em um produto que precisa ser atualizado
        if current_product_id and current_product_id in updates:
            update = updates[current_product_id]
            
            # Atualizar linha de price - padrão mais flexível
            price_match = re.match(r'^(\s*price:\s*)([\d.]+)(.*)$', line)
            if price_match and not price_updated:
                indent_and_label = price_match.group(1)
                old_value = price_match.group(2)
                suffix = price_match.group(3)
                new_price = update['price']
                line = f"{indent_and_label}{new_price}{suffix}"
                price_updated = True
                print(f"   🔧 Atualizando price do produto {current_product_id}: {old_value} → {new_price}")
            
            # Atualizar ou remover linha de originalPrice
            original_price_match = re.match(r'^(\s*originalPrice:\s*)([\d.]+)(.*)$', line)
            if original_price_match and not original_price_updated:
                old_value = original_price_match.group(2)
                if update.get('originalPrice') is not None:
                    # Atualizar originalPrice
                    indent_and_label = original_price_match.group(1)
                    suffix = original_price_match.group(3)
                    new_price = update['originalPrice']
                    line = f"{indent_and_label}{new_price}{suffix}"
                    original_price_updated = True
                    print(f"   🔧 Atualizando originalPrice do produto {current_product_id}: {old_value} → {new_price}")
                else:
                    # Pular linha (remover originalPrice)
                    print(f"   🔧 Removendo originalPrice do produto {current_product_id}")
                    i += 1
                    continue
        
        updated_lines.append(line)
        i += 1
    
    # Salvar arquivo atualizado
    new_content = '\n'.join(updated_lines)
    PRODUCTS_FILE.write_text(new_content, encoding='utf-8')
    print(f"\n✅ Arquivo products.ts atualizado com sucesso!")


def main():
    print("🔄 Sincronizando preços da Shopify para o projeto Next.js\n")
    
    # Verificar configuração
    if not SHOPIFY_STORE_DOMAIN or not SHOPIFY_ACCESS_TOKEN:
        print("❌ Erro: Shopify não está configurado corretamente!")
        print("   Configure as variáveis no arquivo .env.local:")
        print("   - SHOPIFY_STORE_DOMAIN=your-store.myshopify.com")
        print("   - SHOPIFY_ACCESS_TOKEN=shpat_...")
        print(f"\n   Valores atuais:")
        print(f"   - SHOPIFY_STORE_DOMAIN: {SHOPIFY_STORE_DOMAIN or '❌ NÃO CONFIGURADO'}")
        print(f"   - SHOPIFY_ACCESS_TOKEN: {'✅ Configurado' if SHOPIFY_ACCESS_TOKEN else '❌ NÃO CONFIGURADO'}")
        return
    
    print("✅ Configuração detectada")
    print(f"   Store: {SHOPIFY_STORE_DOMAIN}\n")
    
    # Testar conexão
    print("🔗 Testando conexão com Shopify...")
    try:
        test_url = f"{SHOPIFY_API_BASE}/products.json?limit=1"
        headers = {
            'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN,
            'Content-Type': 'application/json',
        }
        response = requests.get(test_url, headers=headers, timeout=30)
        response.raise_for_status()
        print("   ✅ Conexão estabelecida com sucesso!\n")
    except requests.exceptions.RequestException as e:
        print(f"   ❌ Erro ao conectar: {e}")
        print("   💡 Possíveis causas:")
        print("      - URL incorreta ou store domain inválido")
        print("      - Token de acesso inválido ou expirado")
        print("      - Problemas de rede/firewall")
        return
    
    # Carregar mapeamento
    print("📋 Carregando mapeamento de produtos...")
    mapping = load_shopify_mapping()
    if not mapping:
        print("❌ Nenhum mapeamento encontrado!")
        return
    print(f"   ✅ {len(mapping)} produtos mapeados\n")
    
    # Carregar produtos locais
    print("📦 Carregando produtos locais...")
    if not PRODUCTS_FILE.exists():
        print(f"❌ Arquivo não encontrado: {PRODUCTS_FILE}")
        return
    
    # Extrair produtos do arquivo TypeScript (buscar IDs)
    products_content = PRODUCTS_FILE.read_text(encoding='utf-8')
    product_ids = re.findall(r'id:\s*(\d+)', products_content)
    product_ids = [int(pid) for pid in set(product_ids)]
    print(f"   ✅ {len(product_ids)} produtos encontrados\n")
    
    # Buscar preços
    print("📦 Buscando preços atualizados...\n")
    updates = {}
    success_count = 0
    skipped_count = 0
    error_count = 0
    
    for product_id in product_ids:
        if product_id not in mapping:
            print(f"⚠️  Produto ID {product_id}: Não encontrado no mapeamento")
            skipped_count += 1
            continue
        
        shopify_id = mapping[product_id]['shopifyId']
        
        # Extrair nome do produto do arquivo
        name_pattern = rf'id:\s*{product_id}.*?name:\s*"([^"]+)"'
        name_match = re.search(name_pattern, products_content, re.DOTALL)
        product_name = name_match.group(1) if name_match else f"Produto ID {product_id}"
        
        print(f"📦 Processando: {product_name} (ID: {product_id})")
        
        try:
            shopify_prices = get_shopify_prices(shopify_id)
            
            if not shopify_prices:
                print(f"   ⚠️  Não foi possível obter preços da Shopify")
                skipped_count += 1
                continue
            
            # Obter preços atuais do arquivo
            # Buscar preço atual no arquivo
            price_pattern = rf'id:\s*{product_id}.*?price:\s*([\d.]+)'
            price_match = re.search(price_pattern, products_content, re.DOTALL)
            old_price = float(price_match.group(1)) if price_match else 0
            
            original_price_pattern = rf'id:\s*{product_id}.*?originalPrice:\s*([\d.]+)'
            original_price_match = re.search(original_price_pattern, products_content, re.DOTALL)
            old_original_price = float(original_price_match.group(1)) if original_price_match else None
            
            new_price = shopify_prices['price']
            new_original_price = shopify_prices.get('originalPrice')
            
            # Verificar se houve mudança
            price_changed = abs(old_price - new_price) > 0.01
            original_price_changed = (
                (old_original_price is None) != (new_original_price is None) or
                (old_original_price is not None and new_original_price is not None and 
                 abs(old_original_price - new_original_price) > 0.01)
            )
            
            if not price_changed and not original_price_changed:
                print(f"   ✅ Preços já estão sincronizados ({new_price} ARS)")
                success_count += 1
            else:
                print(f"   📊 Preço atual: {old_price} ARS → Novo: {new_price} ARS")
                if old_original_price or new_original_price:
                    print(f"   📊 Preço original: {old_original_price or 'N/A'} ARS → Novo: {new_original_price or 'N/A'} ARS")
                
                updates[product_id] = {
                    'price': new_price,
                    'originalPrice': new_original_price
                }
                success_count += 1
            
            # Delay para evitar rate limiting
            import time
            time.sleep(0.3)
        
        except Exception as e:
            print(f"   ❌ Erro: {e}")
            error_count += 1
    
    # Resumo
    print(f"\n\n📊 RESUMO DA SINCRONIZAÇÃO")
    print(f"   Total de produtos: {len(product_ids)}")
    print(f"   ✅ Sincronizados: {success_count}")
    print(f"   ⏭️  Pulados: {skipped_count}")
    print(f"   ❌ Erros: {error_count}")
    print(f"   📝 Atualizações necessárias: {len(updates)}")
    
    # Se houver atualizações, aplicar no arquivo
    if updates:
        print(f"\n🔄 Aplicando atualizações no arquivo products.ts...")
        
        # Mostrar resumo das mudanças
        print(f"\n📋 Mudanças que serão aplicadas:")
        for product_id, update in updates.items():
            # Extrair nome do produto
            name_pattern = rf'id:\s*{product_id}.*?name:\s*"([^"]+)"'
            name_match = re.search(name_pattern, products_content, re.DOTALL)
            product_name = name_match.group(1) if name_match else f"Produto ID {product_id}"
            
            print(f"   - {product_name} (ID: {product_id}):")
            print(f"     Preço: {update['price']} ARS")
            if update.get('originalPrice'):
                print(f"     Preço Original: {update['originalPrice']} ARS")
        
        # Atualizar arquivo
        update_products_file(updates)
        
        print(f"\n✨ Sincronização concluída com sucesso!")
        print(f"\n📝 Próximos passos:")
        print(f"   1. Verifique o arquivo src/data/products.ts")
        print(f"   2. Execute o projeto para verificar se os preços estão corretos")
    else:
        print(f"\n✅ Todos os preços já estão sincronizados!")


if __name__ == "__main__":
    main()

