/**
 * Mapeamento de IDs locais para IDs da Shopify
 * Gerado automaticamente - NÃO EDITAR MANUALMENTE
 * Última atualização: 2025-11-05T19:34:25.290Z
 */

export const shopifyProductMapping: Record<number, { shopifyId: string; shopifyHandle: string }> = {
  1: {
    "shopifyId": "7539108151392",
    "shopifyHandle": "balsamo-multi-rebote-de-arrugas"
  },
  2: {
    "shopifyId": "7539108184160",
    "shopifyHandle": "stick-balsamo-aqua"
  },
  3: {
    "shopifyId": "7539108216928",
    "shopifyHandle": "stick-balsamo-para-ojos"
  },
  4: {
    "shopifyId": "7539108282464",
    "shopifyHandle": "balsamo-extin-c"
  },
  5: {
    "shopifyId": "7539108348000",
    "shopifyHandle": "kisstin-balm"
  },
  6: {
    "shopifyId": "7539108380768",
    "shopifyHandle": "crema-core-de-colageno"
  },
  7: {
    "shopifyId": "7539108413536",
    "shopifyHandle": "limpiador-espumoso-en-crema"
  },
  8: {
    "shopifyId": "7539108446304",
    "shopifyHandle": "serum-rebote-de-colageno-para-lineas-finas"
  },
  9: {
    "shopifyId": "7539108511840",
    "shopifyHandle": "ampolla-rebote-anti-manchas"
  },
  10: {
    "shopifyId": "7539108544608",
    "shopifyHandle": "crema-single-veil-base-hangyob"
  },
  11: {
    "shopifyId": "7539108610144",
    "shopifyHandle": "highlighter-stick"
  },
  12: {
    "shopifyId": "7539108642912",
    "shopifyHandle": "esencia-mezcladora-ajuste-perfecto-rebote-de-arrugas"
  },
  13: {
    "shopifyId": "7539108675680",
    "shopifyHandle": "mascara-facial-hidratante-rebote-de-arrugas-water-full"
  },
  14: {
    "shopifyId": "7539108708448",
    "shopifyHandle": "balm-lovers-set"
  },
  15: {
    "shopifyId": "7539108773984",
    "shopifyHandle": "multi-balm-crema-hidratante-core"
  },
  16: {
    "shopifyId": "7539108839520",
    "shopifyHandle": "multi-balm-esencia-mezcladora"
  },
  17: {
    "shopifyId": "7539108872288",
    "shopifyHandle": "multi-balm-ampolla-de-colageno-en-bruma"
  },
  18: {
    "shopifyId": "7539108937824",
    "shopifyHandle": "multi-balm-crema-han-gyob"
  },
  19: {
    "shopifyId": "7539108970592",
    "shopifyHandle": "set-esencial-kahi"
  },
  20: {
    "shopifyId": "7539109003360",
    "shopifyHandle": "set-deluxe-kahi"
  },
  21: {
    "shopifyId": "7539109068896",
    "shopifyHandle": "2-multi-balms-🎁-crema-hidratante-core"
  },
  22: {
    "shopifyId": "7539109134432",
    "shopifyHandle": "2-multi-balms-🎁-esencia-mezcladora-gratis"
  },
  23: {
    "shopifyId": "7539109167200",
    "shopifyHandle": "2-multi-balms-🎁-crema-han-gyob-gratis"
  },
  24: {
    "shopifyId": "7539109199968",
    "shopifyHandle": "2-multi-balms-🎁-ampolla-en-bruma-gratis"
  },
  25: {
    "shopifyId": "7539109265504",
    "shopifyHandle": "multi-balm-mascarilla-facial-🎁-crema-han-gyob-gratis"
  },
  26: {
    "shopifyId": "7539109298272",
    "shopifyHandle": "makeup-perfect-set"
  },
  27: {
    "shopifyId": "7539109363808",
    "shopifyHandle": "set-duo-de-balsamo-multi"
  },
  28: {
    "shopifyId": "7539109396576",
    "shopifyHandle": "set-mas-vendido"
  },
  29: {
    "shopifyId": "7539109462112",
    "shopifyHandle": "set-de-cuidado-para-claridad-de-la-piel"
  }
};

/**
 * Get Shopify ID from local product ID
 */
export function getShopifyId(localId: number): string | null {
  return shopifyProductMapping[localId]?.shopifyId || null;
}

/**
 * Get Shopify handle from local product ID
 */
export function getShopifyHandle(localId: number): string | null {
  return shopifyProductMapping[localId]?.shopifyHandle || null;
}
