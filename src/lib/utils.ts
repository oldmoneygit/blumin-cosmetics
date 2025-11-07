import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes with clsx
 * @param inputs - Class values to merge
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format price in Argentine Peso (ARS)
 * @param price - Price in ARS
 * @returns Formatted price string with AR$ prefix
 */
export function formatPrice(price: number): string {
  const formatted = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
  // Replace default ARS symbol with AR$
  return formatted.replace(/ARS/, "AR$").replace(/\s/g, "");
}

/**
 * Format price in US Dollars (for international)
 * @param price - Price in USD
 * @returns Formatted price string
 */
export function formatPriceUSD(price: number): string {
  const formatted = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
  return `$${formatted.replace(/\s/g, "")}`;
}

/**
 * Format date in Spanish (Argentina)
 * @param date - Date object
 * @returns Formatted date string
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("es-AR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

/**
 * Format date in short format
 * @param date - Date object
 * @returns Formatted date string (DD/MM/YYYY)
 */
export function formatDateShort(date: Date): string {
  return new Intl.DateTimeFormat("es-AR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

/**
 * Calculate discount percentage
 * @param originalPrice - Original price
 * @param salePrice - Sale price
 * @returns Discount percentage
 */
export function calculateDiscount(
  originalPrice: number,
  salePrice: number
): number {
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
}

/**
 * Truncate text to specified length
 * @param text - Text to truncate
 * @param length - Maximum length
 * @returns Truncated text
 */
export function truncateText(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + "...";
}

/**
 * Generate slug from text
 * @param text - Text to convert
 * @returns URL-friendly slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .trim();
}

/**
 * Validate email format
 * @param email - Email to validate
 * @returns Boolean indicating if email is valid
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Debounce function
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Format number with thousands separator
 * @param num - Number to format
 * @returns Formatted number string
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat("es-AR").format(num);
}

/**
 * Clamp number between min and max
 * @param num - Number to clamp
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Clamped number
 */
export function clamp(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max);
}
