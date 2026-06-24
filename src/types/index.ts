export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  categoryId: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
  images: string[];
  specifications: Record<string, string>;
  brand: string;
  featured: boolean;
  status: "draft" | "published";
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  parentId?: string;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface User {
  _id: string;
  clerkId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: "customer" | "admin";
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export type OrderStatus = "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";

export interface Order {
  _id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: Address;
  paymentMethod: "card" | "wallet";
  paymentId?: string;
  transactionId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Review {
  _id: string;
  productId: string;
  userId: string;
  rating: number;
  title: string;
  body: string;
  createdAt: Date;
}
