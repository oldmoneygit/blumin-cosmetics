"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProductCard } from "@/components/ui/ProductCard";
import { products } from "@/data/products";
import { Product } from "@/types";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import {
  Star,
  ShoppingCart,
  Heart,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  Check,
  Truck,
  Shield,
  RotateCcw,
  Package,
  Sparkles,
  Leaf,
  Award,
  Clock,
  Users,
  TrendingUp,
  Share2,
  Facebook,
  Twitter,
  Instagram,
  Copy,
  MessageCircle,
  Info,
  AlertCircle,
  Zap,
  Target,
  Droplet,
  Sun,
  Moon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>("description");
  const [selectedImage, setSelectedImage] = useState(0);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const foundProduct = products.find((p) => p.slug === slug);
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [slug]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Producto no encontrado</h2>
          <p className="text-gray-500 mb-6">
            El producto que buscás no existe o fue eliminado
          </p>
          <Link href="/">
            <Button variant="primary">Volver al Inicio</Button>
          </Link>
        </div>
      </div>
    );
  }

  const discount = product.originalPrice
    ? calculateDiscount(product.originalPrice, product.price)
    : 0;

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleQuantityChange = (type: "increment" | "decrement") => {
    if (type === "increment") {
      setQuantity((prev) => prev + 1);
    } else if (type === "decrement" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} ${product.name} to cart`);
  };

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImage(
      (prev) => (prev - 1 + product.images.length) % product.images.length
    );
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = `Mirá este producto: ${product.name}`;

    switch (platform) {
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${url}`,
          "_blank"
        );
        break;
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
          "_blank"
        );
        break;
      case "whatsapp":
        window.open(`https://wa.me/?text=${text} ${url}`, "_blank");
        break;
      case "copy":
        navigator.clipboard.writeText(url);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
        break;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header cartItemCount={0} />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-2 sm:pb-4">
        <nav className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500 overflow-x-auto scrollbar-hide">
          <Link href="/" className="hover:text-pink-500 transition-colors whitespace-nowrap">
            Inicio
          </Link>
          <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
          <Link href="/shop" className="hover:text-pink-500 transition-colors whitespace-nowrap">
            Tienda
          </Link>
          <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
          <span className="text-pink-500 font-medium whitespace-nowrap">{product.category}</span>
        </nav>
      </div>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10">
          {/* Image Gallery */}
          <div className="space-y-3 lg:sticky lg:top-24 self-start">
            {/* Main Image */}
            <div className="relative aspect-square bg-gradient-to-br from-pink-50 to-gray-50 rounded-2xl lg:rounded-3xl overflow-hidden group">
              <Image
                src={product.images[selectedImage] || "/images/placeholder.jpg"}
                alt={product.name}
                fill
                className="object-contain p-8 sm:p-10 lg:p-12"
                priority
              />

              {/* Navigation Arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center opacity-100 sm:opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                  >
                    <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center opacity-100 sm:opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                  >
                    <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                </>
              )}

              {/* Badges */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex flex-col gap-1.5">
                {product.isBestSeller && (
                  <Badge variant="default" size="small">
                    <TrendingUp className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1" />
                    <span className="text-xs">Más Vendido</span>
                  </Badge>
                )}
                {product.isNew && (
                  <Badge variant="info" size="small">
                    <Sparkles className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1" />
                    <span className="text-xs">Nuevo</span>
                  </Badge>
                )}
                {discount > 0 && (
                  <Badge variant="error" size="small" className="font-bold">
                    <span className="text-xs">-{discount}%</span>
                  </Badge>
                )}
              </div>

              {/* Image Counter */}
              <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-black/60 backdrop-blur-sm text-white px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium">
                {selectedImage + 1} / {product.images.length}
              </div>
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2 sm:gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      "relative aspect-square bg-gray-50 rounded-lg overflow-hidden border-2 transition-all hover:scale-105",
                      selectedImage === index
                        ? "border-pink-500 ring-2 ring-pink-200 shadow-lg"
                        : "border-transparent hover:border-gray-300"
                    )}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-contain p-2 sm:p-3"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Product Features Icons */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 pt-2">
              <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-green-50 rounded-lg sm:rounded-xl border border-green-200">
                <Leaf className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-green-900">
                    100% Vegano
                  </p>
                  <p className="text-xs text-green-600">Libre de Crueldad</p>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-blue-50 rounded-lg sm:rounded-xl border border-blue-200">
                <Award className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-blue-900">
                    Dermatológico
                  </p>
                  <p className="text-xs text-blue-600">Testado</p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-4 sm:space-y-5">
            {/* Category & Stock */}
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                <span className="text-xs uppercase tracking-widest text-pink-500 font-bold">
                  {product.category}
                </span>
                {product.inStock ? (
                  <span className="flex items-center gap-1.5 text-xs text-green-600 font-semibold">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="hidden sm:inline">En Stock - Envío Inmediato</span>
                    <span className="sm:hidden">En Stock</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-xs text-red-600 font-semibold">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    Agotado
                  </span>
                )}
              </div>

              {/* Share Button */}
              <div className="relative">
                <button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <Share2 className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                </button>

                {showShareMenu && (
                  <div className="absolute right-0 top-12 bg-white rounded-2xl shadow-2xl border border-gray-200 p-2 w-48 z-50">
                    <button
                      onClick={() => handleShare("whatsapp")}
                      className="flex items-center gap-3 w-full p-3 hover:bg-gray-50 rounded-xl transition-colors"
                    >
                      <MessageCircle className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium">WhatsApp</span>
                    </button>
                    <button
                      onClick={() => handleShare("facebook")}
                      className="flex items-center gap-3 w-full p-3 hover:bg-gray-50 rounded-xl transition-colors"
                    >
                      <Facebook className="h-5 w-5 text-blue-600" />
                      <span className="text-sm font-medium">Facebook</span>
                    </button>
                    <button
                      onClick={() => handleShare("twitter")}
                      className="flex items-center gap-3 w-full p-3 hover:bg-gray-50 rounded-xl transition-colors"
                    >
                      <Twitter className="h-5 w-5 text-sky-500" />
                      <span className="text-sm font-medium">Twitter</span>
                    </button>
                    <button
                      onClick={() => handleShare("copy")}
                      className="flex items-center gap-3 w-full p-3 hover:bg-gray-50 rounded-xl transition-colors"
                    >
                      <Copy className="h-5 w-5 text-gray-600" />
                      <span className="text-sm font-medium">
                        {copiedLink ? "¡Copiado!" : "Copiar Link"}
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Product Name */}
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-2">
                {product.name}
              </h1>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-3 sm:gap-4 pb-4 sm:pb-5 border-b border-gray-200 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="flex text-pink-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                      className={i < Math.floor(product.rating) ? "" : "opacity-30"}
                    />
                  ))}
                </div>
                <span className="text-base sm:text-lg font-bold text-gray-900">
                  {product.rating}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-500">
                <Users className="h-4 w-4" />
                <span className="text-xs sm:text-sm font-medium">
                  {product.reviewCount.toLocaleString()} valoraciones
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-2 sm:gap-3 flex-wrap">
                <span className="text-3xl sm:text-4xl font-bold text-gray-900">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-lg sm:text-xl text-gray-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              {product.originalPrice && (
                <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-green-50 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-green-200">
                  <Zap className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                  <span className="text-xs sm:text-sm font-semibold text-green-700">
                    Ahorrás {formatPrice(product.originalPrice - product.price)} ({discount}% OFF)
                  </span>
                </div>
              )}
            </div>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-2">
                  Características Principales
                </p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {product.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2.5 py-1 sm:px-3 sm:py-1.5 bg-gradient-to-r from-pink-50 to-purple-50 text-pink-700 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wide border border-pink-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Size Info */}
            {product.size && (
              <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 rounded-xl">
                <Package className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                <div>
                  <p className="text-xs text-gray-500 font-medium">Contenido</p>
                  <p className="text-sm font-bold text-gray-900">{product.size}</p>
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="space-y-2 pt-2">
              <label className="text-xs sm:text-sm font-bold text-gray-900 uppercase tracking-wide flex items-center gap-1.5">
                <Target className="h-3 w-3 sm:h-4 sm:w-4 text-pink-500" />
                Cantidad
              </label>
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex items-center border-2 border-gray-300 rounded-xl overflow-hidden bg-white hover:border-pink-500 transition-colors">
                  <button
                    onClick={() => handleQuantityChange("decrement")}
                    className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-50"
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 sm:w-16 text-center font-bold text-lg sm:text-xl">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange("increment")}
                    className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex items-center gap-1.5 text-gray-500">
                  <Info className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="text-xs sm:text-sm">
                    Total: <span className="font-bold text-gray-900">{formatPrice(product.price * quantity)}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 sm:gap-3 pt-4">
              <Button
                variant="primary"
                size="large"
                className="flex-1 text-sm sm:text-base font-bold py-3 sm:py-4 shadow-lg shadow-pink-500/20 hover:shadow-xl hover:shadow-pink-500/30 transition-all"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="hidden sm:inline">{product.inStock ? "Agregar al Carrito" : "Agotado"}</span>
                <span className="sm:hidden">{product.inStock ? "Agregar" : "Agotado"}</span>
              </Button>
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={cn(
                  "w-12 h-12 sm:w-14 sm:h-14 rounded-xl border-2 flex items-center justify-center transition-all duration-300 hover:scale-110",
                  isFavorite
                    ? "border-pink-500 bg-pink-50 text-pink-500 shadow-lg shadow-pink-200"
                    : "border-gray-300 hover:border-pink-500 text-gray-600 hover:text-pink-500"
                )}
              >
                <Heart
                  className={cn(
                    "h-5 w-5 sm:h-6 sm:w-6 transition-all",
                    isFavorite && "fill-current"
                  )}
                />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-4 sm:pt-6 border-t border-gray-200">
              <div className="flex flex-col items-center text-center gap-1.5 sm:gap-2 p-2 sm:p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <Truck className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-bold text-gray-900 block">
                    Envío Gratis
                  </span>
                  <span className="text-xs text-gray-600 hidden sm:block">En compras +$50</span>
                </div>
              </div>
              <div className="flex flex-col items-center text-center gap-1.5 sm:gap-2 p-2 sm:p-3 bg-gradient-to-br from-blue-50 to-sky-50 rounded-xl border border-blue-200">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-bold text-gray-900 block">
                    Compra Segura
                  </span>
                  <span className="text-xs text-gray-600 hidden sm:block">100% Protegida</span>
                </div>
              </div>
              <div className="flex flex-col items-center text-center gap-1.5 sm:gap-2 p-2 sm:p-3 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <RotateCcw className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-bold text-gray-900 block">
                    Devoluciones
                  </span>
                  <span className="text-xs text-gray-600 hidden sm:block">Hasta 30 días</span>
                </div>
              </div>
            </div>

            {/* Usage Time Icons */}
            <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl border border-pink-200">
              <div className="flex items-center gap-2 flex-1">
                <Sun className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-600">Uso Diurno</p>
                  <p className="text-xs sm:text-sm font-bold text-gray-900">Mañana y Tarde</p>
                </div>
              </div>
              <div className="w-px h-10 bg-pink-200"></div>
              <div className="flex items-center gap-2 flex-1">
                <Moon className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-500 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-600">Uso Nocturno</p>
                  <p className="text-sm font-bold text-gray-900">Antes de Dormir</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Accordion */}
        <div className="mt-8 sm:mt-12 space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 px-4 sm:px-0">
            Información Detallada
          </h2>

          {/* Description */}
          <div className="border border-gray-200 rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <button
              onClick={() => toggleSection("description")}
              className="w-full px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-7 h-7 sm:w-9 sm:h-9 bg-pink-100 rounded-full flex items-center justify-center">
                  <Info className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-pink-600" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-gray-900">Descripción</h3>
              </div>
              <ChevronDown
                className={cn(
                  "h-5 w-5 text-gray-600 transition-transform duration-300",
                  activeSection === "description" && "rotate-180"
                )}
              />
            </button>
            <div
              className={cn(
                "overflow-hidden transition-all duration-300",
                activeSection === "description" ? "max-h-96" : "max-h-0"
              )}
            >
              <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-br from-gray-50 to-pink-50/30">
                <p className="text-gray-700 leading-relaxed text-xs sm:text-sm">
                  {product.fullDescription}
                </p>
              </div>
            </div>
          </div>

          {/* Benefits */}
          {product.benefits && product.benefits.length > 0 && (
            <div className="border border-gray-200 rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <button
                onClick={() => toggleSection("benefits")}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-7 h-7 sm:w-9 sm:h-9 bg-green-100 rounded-full flex items-center justify-center">
                    <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-600" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-gray-900">
                    Beneficios
                  </h3>
                </div>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 text-gray-600 transition-transform duration-300",
                    activeSection === "benefits" && "rotate-180"
                  )}
                />
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-300",
                  activeSection === "benefits" ? "max-h-[600px]" : "max-h-0"
                )}
              >
                <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-br from-gray-50 to-green-50/30">
                  <ul className="space-y-2 sm:space-y-3">
                    {product.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2 sm:gap-3">
                        <div className="mt-0.5 w-5 h-5 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center flex-shrink-0 shadow-sm">
                          <Check className="h-3 w-3 text-white stroke-[3]" />
                        </div>
                        <span className="text-gray-700 leading-relaxed text-xs sm:text-sm">
                          {benefit}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Ingredients */}
          {product.ingredients && product.ingredients.length > 0 && (
            <div className="border border-gray-200 rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <button
                onClick={() => toggleSection("ingredients")}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-7 h-7 sm:w-9 sm:h-9 bg-purple-100 rounded-full flex items-center justify-center">
                    <Droplet className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-purple-600" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-gray-900">
                    Ingredientes
                  </h3>
                </div>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 text-gray-600 transition-transform duration-300",
                    activeSection === "ingredients" && "rotate-180"
                  )}
                />
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-300",
                  activeSection === "ingredients" ? "max-h-96" : "max-h-0"
                )}
              >
                <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-br from-gray-50 to-purple-50/30">
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {product.ingredients.map((ingredient, index) => (
                      <span
                        key={index}
                        className="px-2.5 py-1.5 sm:px-3 sm:py-2 bg-white border border-purple-200 rounded-full text-xs sm:text-sm font-semibold text-gray-700 hover:border-purple-400 hover:shadow-sm transition-all"
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* How to Use */}
          {product.howToUse && (
            <div className="border border-gray-200 rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <button
                onClick={() => toggleSection("howToUse")}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-7 h-7 sm:w-9 sm:h-9 bg-blue-100 rounded-full flex items-center justify-center">
                    <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-600" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-gray-900">Modo de Uso</h3>
                </div>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 text-gray-600 transition-transform duration-300",
                    activeSection === "howToUse" && "rotate-180"
                  )}
                />
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-300",
                  activeSection === "howToUse" ? "max-h-96" : "max-h-0"
                )}
              >
                <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-br from-gray-50 to-blue-50/30">
                  <p className="text-gray-700 leading-relaxed text-xs sm:text-sm">
                    {product.howToUse}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Additional Info */}
          <div className="border border-gray-200 rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <button
              onClick={() => toggleSection("additional")}
              className="w-full px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-7 h-7 sm:w-9 sm:h-9 bg-orange-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-orange-600" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-gray-900">
                  Info Adicional
                </h3>
              </div>
              <ChevronDown
                className={cn(
                  "h-5 w-5 text-gray-600 transition-transform duration-300",
                  activeSection === "additional" && "rotate-180"
                )}
              />
            </button>
            <div
              className={cn(
                "overflow-hidden transition-all duration-300",
                activeSection === "additional" ? "max-h-96" : "max-h-0"
              )}
            >
              <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-br from-gray-50 to-orange-50/30">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1 text-xs sm:text-sm">Almacenamiento</h4>
                    <p className="text-gray-600 text-xs">
                      Conservar en lugar fresco y seco, alejado de la luz solar directa.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1 text-xs sm:text-sm">Validez</h4>
                    <p className="text-gray-600 text-xs">
                      3 años desde la fecha de fabricación. Usar dentro de 12 meses después de abierto.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1 text-xs sm:text-sm">Origen</h4>
                    <p className="text-gray-600 text-xs">
                      Fabricado en Corea del Sur con estándares de calidad K-Beauty.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1 text-xs sm:text-sm">Certificaciones</h4>
                    <p className="text-gray-600 text-xs">
                      100% Vegano, Libre de Crueldad, Dermatológicamente Testado.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12 sm:mt-16">
            <div className="text-center mb-6 sm:mb-8 px-4 sm:px-0">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                Productos Relacionados
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                Descubrí otros productos de la misma categoría
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  onAddToCart={() => console.log("Add to cart")}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
