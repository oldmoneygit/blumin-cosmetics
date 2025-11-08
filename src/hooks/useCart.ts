"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product, CartItem } from "@/types";
import { triggerAddToCart } from "@/components/tracking/MetaPixelEvents";

// Constants for cart validation
const MAX_QUANTITY_PER_ITEM = 99;
const MIN_QUANTITY = 1;

interface CartStore {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
  isInCart: (productId: number) => boolean;
}

/**
 * Custom hook for managing shopping cart state
 * Uses Zustand with localStorage persistence
 */
export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],

      /**
       * Add a product to the cart or update quantity if already exists
       * @param product - Product to add
       * @param quantity - Quantity to add (default: 1)
       */
      addToCart: (product, quantity = 1) => {
        // Validate product
        if (!product || !product.id) {
          console.error("Invalid product");
          return;
        }

        // Validate quantity
        if (quantity < MIN_QUANTITY || quantity > MAX_QUANTITY_PER_ITEM) {
          console.error(`Quantity must be between ${MIN_QUANTITY} and ${MAX_QUANTITY_PER_ITEM}`);
          return;
        }

        // Check if product is in stock
        if (!product.inStock) {
          console.warn("Product is out of stock");
          return;
        }

        set((state) => {
          const existingItem = state.cart.find((item) => item.id === product.id);

          if (existingItem) {
            // Calculate new quantity
            const newQuantity = Math.min(
              existingItem.quantity + quantity,
              MAX_QUANTITY_PER_ITEM
            );

            // Update quantity if item already exists
            return {
              cart: state.cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: newQuantity }
                  : item
              ),
            };
          }

          // Add new item to cart
          return {
            cart: [...state.cart, { ...product, quantity }],
          };
        });

        triggerAddToCart(
          {
            id: product.id,
            name: product.name,
            price: product.price,
            category: product.category,
            currency: "ARS",
          },
          quantity
        );
      },

      /**
       * Remove a product from the cart
       * @param productId - ID of the product to remove
       */
      removeFromCart: (productId) => {
        if (!productId) {
          console.error("Invalid product ID");
          return;
        }

        set((state) => ({
          cart: state.cart.filter((item) => item.id !== productId),
        }));
      },

      /**
       * Update the quantity of a product in the cart
       * @param productId - ID of the product
       * @param quantity - New quantity
       */
      updateQuantity: (productId, quantity) => {
        // Remove item if quantity is 0 or negative
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }

        // Enforce maximum quantity
        const validatedQuantity = Math.min(quantity, MAX_QUANTITY_PER_ITEM);

        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === productId ? { ...item, quantity: validatedQuantity } : item
          ),
        }));
      },

      /**
       * Clear all items from the cart
       */
      clearCart: () => {
        set({ cart: [] });
      },

      /**
       * Get the total price of all items in the cart
       * @returns Total price
       */
      getTotal: () => {
        const state = get();
        return Number(
          state.cart.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          ).toFixed(2)
        );
      },

      /**
       * Get the total count of items in the cart
       * @returns Total item count
       */
      getItemCount: () => {
        const state = get();
        return state.cart.reduce((count, item) => count + item.quantity, 0);
      },

      /**
       * Check if a product is in the cart
       * @param productId - ID of the product to check
       * @returns true if product is in cart, false otherwise
       */
      isInCart: (productId) => {
        if (!productId) return false;

        const state = get();
        return state.cart.some((item) => item.id === productId);
      },
    }),
    {
      name: "blumin-cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
