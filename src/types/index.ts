export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  fullDescription: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  tags: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  isBestSeller?: boolean;
  isNew?: boolean;
  benefits: string[];
  ingredients: string[];
  howToUse: string;
  size?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Review {
  id: number;
  productId: number;
  author: string;
  rating: number;
  title: string;
  comment: string;
  date: Date;
  verified: boolean;
  images?: string[];
  video?: string;
  helpful?: number;
}

export interface Ingredient {
  id: number;
  name: string;
  description: string;
  benefits: string[];
  image: string;
  tags: string[];
  scientificName?: string;
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
}

export interface NewsletterSubscription {
  email: string;
  subscribedAt: Date;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  customerInfo: CustomerInfo;
  shippingAddress: Address;
  billingAddress?: Address;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface Address {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
}
