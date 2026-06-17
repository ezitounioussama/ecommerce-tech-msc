import { z } from "zod";

export const ProductSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  slug: z.string().min(1).max(200),
  description: z.string().min(1).max(5000),
  categoryId: z.string().min(1),
  price: z.number().positive("Price must be positive"),
  compareAtPrice: z.number().positive().optional(),
  stock: z.number().int().nonnegative(),
  images: z.array(z.string()).min(1, "At least one image is required"),
  specifications: z.record(z.string(), z.string()),
  brand: z.string().min(1),
  featured: z.boolean().default(false),
  status: z.enum(["draft", "published"]).default("draft"),
});

export const ReviewSchema = z.object({
  productId: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  title: z.string().min(1).max(100),
  body: z.string().min(1).max(2000),
});

export type ProductInput = z.infer<typeof ProductSchema>;
export type ReviewInput = z.infer<typeof ReviewSchema>;
