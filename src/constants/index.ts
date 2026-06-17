export const APP_NAME = "TechSphere";
export const APP_DESCRIPTION = "Premium Technology Store";

export const PRODUCT_SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Name: A to Z", value: "name_asc" },
] as const;

export const PRODUCT_STATUS = {
  DRAFT: "draft",
  PUBLISHED: "published",
} as const;

export const ORDER_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
} as const;

export const USER_ROLES = {
  CUSTOMER: "customer",
  ADMIN: "admin",
} as const;

export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"] as const;
export const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
