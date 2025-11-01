"use client";

import { Product } from "@/types";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { Button } from "./Button";
import { Badge } from "./Badge";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const discount = product.originalPrice
    ? calculateDiscount(product.originalPrice, product.price)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <Link href={`/product/${product.slug}`}>
      <div
        className="group relative bg-transparent overflow-hidden transition-all duration-500 hover:-translate-y-2 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          {product.isBestSeller && (
            <Badge variant="default" size="small">
              Más Vendido
            </Badge>
          )}
          {product.isNew && (
            <Badge variant="info" size="small">
              Nuevo
            </Badge>
          )}
          {discount > 0 && (
            <Badge variant="error" size="small">
              -{discount}%
            </Badge>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-white"
          aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
        >
          <Heart
            size={20}
            className={`transition-all duration-300 ${
              isFavorite
                ? "fill-pink-500 text-pink-500"
                : "text-gray-600 hover:text-pink-500"
            }`}
          />
        </button>

        {/* Product Image */}
        <div className="relative aspect-square bg-transparent overflow-hidden">
          {!imageError ? (
            <Image
              src={product.images[0] || "/images/placeholder-product.jpg"}
              alt={product.name}
              fill
              quality={100}
              priority={product.isBestSeller}
              className={`object-contain p-8 transition-all duration-700 mix-blend-multiply ${
                isHovered ? "scale-105" : "scale-100"
              }`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-pink-50">
              <div className="text-center text-gray-400">
                <ShoppingCart size={48} className="mx-auto mb-2 opacity-30" />
                <p className="text-sm">Imagen no disponible</p>
              </div>
            </div>
          )}

          {/* Hover Overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent transition-opacity duration-500 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className={`absolute bottom-6 left-0 right-0 px-6 transform transition-all duration-500 ${
                isHovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              <Button
                variant="primary"
                size="medium"
                className="w-full"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart size={18} />
                {product.inStock ? "Agregar al Carrito" : "Sin Stock"}
              </Button>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-6">
          {/* Category */}
          <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-2">
            {product.category}
          </p>

          {/* Product Name */}
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-pink-500 transition-colors duration-300">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {product.description}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex text-pink-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                  className={i < Math.floor(product.rating) ? "" : "opacity-30"}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">
              ({product.reviewCount})
            </span>
          </div>

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {product.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="text-[10px] uppercase tracking-wide px-2 py-1 bg-pink-50 text-pink-700 rounded-full font-semibold"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-gray-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Stock Status */}
          <div className="mt-4">
            {product.inStock ? (
              <p className="text-xs text-green-600 font-semibold flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                En Stock - Envío Inmediato
              </p>
            ) : (
              <p className="text-xs text-red-600 font-semibold flex items-center gap-1">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                Sin Stock
              </p>
            )}
          </div>
        </div>

        {/* Bottom border animation */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-400 to-pink-500 transform origin-left transition-transform duration-500 ${
            isHovered ? "scale-x-100" : "scale-x-0"
          }`}
        ></div>
      </div>
    </Link>
  );
};
