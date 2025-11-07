"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Loader2 } from "lucide-react";
import { shopifyProductMapping } from "@/data/shopify-mapping";
import { createStorefrontCheckout } from "@/lib/shopify-storefront";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, getTotal, getItemCount } = useCart();
  const total = getTotal();
  const itemCount = getItemCount();
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return;

    setIsProcessing(true);
    setCheckoutError(null);

    try {
      console.log("🛒 Iniciando checkout...", { cartItems: cart.length });
      
      // Get product IDs from cart
      const productIds = cart.map(item => item.id);
      
      console.log("📦 Buscando variant IDs via API...");
      
      // Fetch variant IDs from server API
      const response = await fetch("/api/shopify/get-variant-ids", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productIds }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao buscar variant IDs");
      }

      const { variantIds } = await response.json();
      console.log("✅ Variant IDs recebidos:", variantIds);

      // Map cart items to Shopify line items
      const validLineItems = cart
        .map((item) => {
          const variantId = variantIds[item.id];
          
          if (!variantId) {
            console.warn(`⚠️ Variant ID não encontrado para produto ${item.name} (ID: ${item.id})`);
            return null;
          }

          console.log(`✅ ${item.name}: Variant ID encontrado`);

          return {
            variantId: variantId,
            quantity: item.quantity,
          };
        })
        .filter((item): item is { variantId: string; quantity: number } => item !== null);

      console.log("📊 Resultado:", {
        total: cart.length,
        valid: validLineItems.length,
        invalid: cart.length - validLineItems.length,
      });

      if (validLineItems.length === 0) {
        const cartDetails = cart.map(item => ({
          id: item.id,
          name: item.name,
          variantId: variantIds[item.id] || 'NÃO ENCONTRADO'
        }));
        
        console.error("❌ Nenhum produto válido encontrado");
        console.error("📋 Itens do carrinho:", cartDetails);
        console.error("📦 Mapeamento disponível:", Object.keys(shopifyProductMapping).map(k => Number(k)));
        
        setCheckoutError(
          `Não foi possível processar o checkout. Verifique se os produtos estão disponíveis na Shopify. ` +
          `Detalhes no console do navegador.`
        );
        setIsProcessing(false);
        return;
      }

      // Create cart/checkout
      const checkout = await createStorefrontCheckout(validLineItems);

      if (checkout?.webUrl || checkout?.checkoutUrl) {
        // Redirect to Shopify checkout
        const checkoutUrl = checkout.webUrl || checkout.checkoutUrl;
        console.log("✅ Redirecionando para:", checkoutUrl);
        window.location.href = checkoutUrl;
      } else {
        throw new Error("URL de checkout não retornada");
      }
    } catch (error: any) {
      console.error("Erro ao criar checkout:", error);
      setCheckoutError(error.message || "Erro ao processar checkout. Tente novamente.");
      setIsProcessing(false);
    }
  };

  if (cart.length === 0) {
    return (
      <main className="min-h-screen">
        <Header cartItemCount={getItemCount()} />

        {/* Empty Cart */}
        <section className="pt-32 pb-16 lg:pt-40 lg:pb-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6">
              <ShoppingBag className="w-10 h-10 text-gray-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-gray-900 mb-6">
              Tu Carrito está Vacío
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Agregá productos increíbles a tu carrito y comenzá tu rutina de belleza coreana
            </p>
            <Link href="/shop">
              <Button variant="primary" size="large">
                Explorar Productos
              </Button>
            </Link>
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <Header cartItemCount={getItemCount()} />

      {/* Cart Header */}
      <section className="pt-32 pb-8 lg:pt-40 lg:pb-12 bg-gradient-to-b from-pink-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-gray-900 mb-2">
                Carrito de Compras
              </h1>
              <p className="text-lg text-gray-600">
                {itemCount} {itemCount === 1 ? "producto" : "productos"}
              </p>
            </div>
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="text-gray-600 hover:text-red-600 font-semibold transition-colors"
              >
                Limpiar Carrito
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Cart Content */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex gap-6">
                    {/* Product Image */}
                    <Link href={`/product/${item.slug}`} className="flex-shrink-0">
                      <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-lg overflow-hidden bg-gray-100">
                        <Image
                          src={item.images[0] || "/images/placeholder-product.jpg"}
                          alt={item.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </Link>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <Link href={`/product/${item.slug}`}>
                        <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-pink-600 transition-colors">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {item.description}
                      </p>

                      {/* Price and Quantity */}
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-xl font-bold text-gray-900">
                              {formatPrice(item.price)}
                            </span>
                            {item.originalPrice && (
                              <span className="text-base text-gray-400 line-through">
                                {formatPrice(item.originalPrice)}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">
                            Subtotal: <span className="font-semibold">{formatPrice(item.price * item.quantity)}</span>
                          </p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-4 h-4 text-gray-600" />
                          </button>
                          <span className="w-12 text-center font-semibold text-gray-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                            aria-label="Increase quantity"
                            disabled={item.quantity >= 99}
                          >
                            <Plus className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="flex-shrink-0 w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100 transition-colors"
                      aria-label="Remove from cart"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <h2 className="text-2xl font-black uppercase tracking-tight text-gray-900 mb-6">
                  Resumen del Pedido
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal ({itemCount} {itemCount === 1 ? "producto" : "productos"})</span>
                    <span className="font-semibold">{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Envío</span>
                    <span className="font-semibold">
                      {total >= 15000 ? (
                        <span className="text-green-600">Gratis</span>
                      ) : (
                        formatPrice(2500)
                      )}
                    </span>
                  </div>
                  <div className="border-t border-gray-300 pt-4 flex justify-between text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span>{formatPrice(total >= 15000 ? total : total + 2500)}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {checkoutError && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800">
                      {checkoutError}
                    </div>
                  )}
                  <Button 
                    variant="primary" 
                    className="w-full" 
                    size="large"
                    onClick={handleCheckout}
                    disabled={isProcessing || cart.length === 0}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Procesando...
                      </>
                    ) : (
                      "Proceder al Checkout"
                    )}
                  </Button>
                  <Link href="/shop">
                    <Button variant="outline" className="w-full" size="medium">
                      <ArrowLeft className="w-5 h-5 mr-2" />
                      Continuar Comprando
                    </Button>
                  </Link>
                </div>

                {/* Shipping Info */}
                {total >= 15000 ? (
                  <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800 font-semibold">
                      ¡Envío gratis incluido!
                    </p>
                  </div>
                ) : (
                  <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      Agregá <strong>{formatPrice(15000 - total)}</strong> más para envío gratis
                    </p>
                  </div>
                )}

                {/* Security Info */}
                <div className="mt-6 pt-6 border-t border-gray-300">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Compra 100% segura</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Devoluciones fáciles</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

