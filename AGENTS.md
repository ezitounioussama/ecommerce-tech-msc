# AGENTS.md

## Project Overview

This project is a modern full-stack eCommerce platform focused on technology products:

* Laptops
* Smartphones
* Accessories
* Components
* Peripherals
* Gaming Devices

### Tech Stack

| Layer                     | Technology                              |
| ------------------------- | --------------------------------------- |
| Frontend                  | Next.js (App Router)                    |
| Language                  | TypeScript                              |
| Backend                   | Next.js Server Actions + Route Handlers |
| Database                  | MongoDB 8                               |
| Authentication            | Clerk                                   |
| Object Storage            | RustFS                                  |
| Security Containerization | Docker                                  |
| Vulnerability Scanning    | Snyk                                    |
| UI Components             | shadcn/ui                               |
| State Management          | Zustand                                 |
| 3D Rendering              | Three.js / @react-three/fiber           |
| Motion Library            | motion.dev                              |
| Data Tables               | TanStack Table                          |
| Advanced UI               | Aceternity UI                           |

---

# Core Principles

1. Type Safety First
2. Security First
3. Server Components by Default
4. Reusable Components
5. Performance Oriented
6. Accessibility (WCAG)
7. SEO Friendly
8. Mobile First
9. Production Ready
10. Clean Architecture
11. **Use latest Next.js patterns** — always leverage `use cache`, React 19 features, and current API surface.
12. **Use Context7 MCP** before writing code against any library/framework — fetch current docs to ensure correct API usage.

---

# Folder Structure

```txt
src/
│
├── app/
│   ├── (store)/
│   ├── (admin)/
│   ├── api/
│   └── layout.tsx
│
├── components/
│   ├── ui/
│   ├── shared/
│   ├── store/
│   ├── admin/
│   └── layouts/
│
├── features/
│   ├── auth/
│   ├── products/
│   ├── categories/
│   ├── cart/
│   ├── wishlist/
│   ├── orders/
│   ├── inventory/
│   ├── users/
│   └── reviews/
│
├── lib/
│   ├── mongodb/
│   ├── rustfs/
│   ├── clerk/
│   ├── validations/
│   ├── security/
│   └── utils/
│
├── hooks/
│
├── types/
│
├── actions/
│
├── constants/
│
└── proxy.ts
```

---

# Development Rules

## TypeScript

Always:

```ts
strict: true
```

Never use:

```ts
any
```

Prefer:

```ts
unknown
```

Use:

```ts
interface
```

for object contracts.

Use:

```ts
type
```

for unions and utility compositions.

---

## Component Size Limit

Every component bundle must not exceed:

```txt
200 KB
```

Audit and split components that exceed this limit.

Use dynamic imports and code splitting to keep bundles lean.

---

## State Management

Every feature component must have a dedicated Zustand store.

Example structure:

```ts
features/products/store/product-store.ts
features/cart/store/cart-store.ts
```

Store pattern:

```ts
import { create } from "zustand";

interface ProductStore {
  products: Product[];
  isLoading: boolean;
  fetchProducts: () => Promise<void>;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  isLoading: false,
  fetchProducts: async () => { /* ... */ },
}));
```

Never use prop drilling or context for shared state.

---

## Animation Requirements

All UI must be animated.

Priority:

1. **3D animations** using Three.js / @react-three/fiber for:
   - Hero sections
   - Product showcases
   - Category introductions
   - Feature highlights
   - Landing pages
   - Interactive product cards

2. **motion.dev** for all non-3D animations:
   - Page transitions
   - Hover interactions
   - Scroll animations
   - Micro-interactions (buttons, cards, navigation)
   - Loading states
   - Cart/checkout animations
   - Modals and overlays

Every component must have at least a motion.dev animation.

Components without 3D must use motion.dev for entrance, hover, or scroll effects.

---

# Next.js Rules

## Default to Server Components

Use Client Components only when:

* useState
* useEffect
* Browser APIs
* Event handlers

Example:

```tsx
"use client";
```

Only when required.

---

## Data Fetching

All data fetching must use the `"use cache"` directive to enable automatic caching, deduplication, and optimal static/dynamic rendering.

### `use cache` Data Layer

Create data access functions in `src/lib/data/` with `"use cache"` per function:

```ts
// src/lib/data/products.ts
import { MOCK_PRODUCTS } from "@/constants/products";
import type { Product } from "@/types";

export async function getProducts(): Promise<Product[]> {
  "use cache";
  return MOCK_PRODUCTS;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  "use cache";
  return MOCK_PRODUCTS.find((p) => p.slug === slug) ?? null;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  "use cache";
  return MOCK_PRODUCTS.filter((p) => p.featured);
}
```

Consume in server components:

```tsx
// page.tsx
import { getProducts, getCategories } from "@/lib/data";

export default async function Page() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);
  return <ClientComponent products={products} categories={categories} />;
}
```

When moving from mock data to real DB calls, only the function body changes — the caching strategy stays intact.

### Setup

The `cacheComponents: true` flag is enabled in `next.config.ts` — do not remove it.

### Rules

- Every `"use cache"` function must be `async`.
- Functions with `"use cache"` cannot be called from Client Components. Fetch data in Server Components and pass as props.
- Server Actions (mutations) do NOT use `"use cache"`.
- Wrap dynamic auth/service providers (`ClerkProvider`) in `<Suspense fallback={null}>` in the root layout.
- Replace `new Date()` in client components with static constants to avoid prerender errors.

---

# Proxy (Middleware)

This project uses Next.js 16's `proxy.ts` convention instead of `middleware.ts`.

File: `src/proxy.ts`

The proxy matcher must include Clerk's proxy path:

```ts
export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
    "/__clerk/:path*",
  ],
};
```

---

# Authentication

Provider:

```txt
Clerk
```

## Setup

The project is linked to the TechSphere Clerk application (`app_3FHSCIZUZztc04ZXd7MVdlW1J3K`).

Key files:
- `src/app/layout.tsx` — `ClerkProvider` wraps the entire app with `shadcn` theme
- `src/proxy.ts` — `clerkMiddleware()` with Clerk proxy path
- `src/components/store/navbar-wrapper.tsx` — `Show`, `SignInButton`, `SignUpButton`, `UserButton`
- `src/app/sign-in/[[...sign-in]]/page.tsx` — Sign-in page with `<SignIn />`
- `src/app/sign-up/[[...sign-up]]/page.tsx` — Sign-up page with `<SignUp />`

Components used from `@clerk/nextjs`:
- `ClerkProvider` — wraps root layout
- `Show` — renders children based on auth state (`"signed-in"` / `"signed-out"`)
- `SignInButton` — modal-based sign-in trigger
- `SignUpButton` — modal-based sign-up trigger
- `UserButton` — avatar + dropdown for signed-in users

Auth controls use `mode="modal"` to open Clerk's hosted UI in a modal without navigating away.

## Requirements

* Protect all admin routes
* Protect checkout flow
* Protect order history
* Protect user dashboard

Admin verification must occur on the server.

Example:

```ts
auth()
currentUser()
```

Never trust client role data.

---

# Database

Provider:

```txt
MongoDB
```

Use:

```txt
Mongoose
```

or

```txt
MongoDB Native Driver
```

consistently across the project.

Do not mix both approaches.

---

## Collections

```txt
users
products
categories
orders
reviews
carts
wishlists
inventory
coupons
payments
```

---

# Product Model

Minimum fields:

```ts
{
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
```

---

# Validation

All external inputs must be validated.

Use:

```txt
Zod
```

Example:

```ts
ProductSchema.safeParse(data)
```

Never trust:

* form data
* request body
* query params
* headers

---

# Security Standards

## Mandatory

Sanitize:

* Inputs
* Search Queries
* Product Filters

Prevent:

* XSS
* CSRF
* SSRF
* Injection attacks

---

## Secrets

Never expose:

```env
MONGODB_URI
CLERK_SECRET_KEY
RUSTFS_SECRET_KEY
```

Only server-side access allowed.

---

## Environment Variables

Use:

```ts
process.env
```

through centralized configuration.

Example:

```ts
lib/config/env.ts
```

---

# File Uploads

Provider:

```txt
RustFS
```

Allowed:

* JPG
* PNG
* WEBP
* AVIF

Maximum size:

```txt
10 MB
```

Validate:

* mime type
* extension
* size

before upload.

---

# Docker

Every service must be containerized.

Services:

```txt
nextjs
mongodb
rustfs
```

Must support:

```bash
docker compose up
```

---

# Snyk

Run before deployment:

```bash
snyk test
```

and

```bash
snyk monitor
```

High severity vulnerabilities must be fixed before release.

---

# UI Guidelines

## shadcn/ui

Primary design system.

Use existing components before creating custom ones.

---

## Aceternity UI

Use for:

* Hero Sections
* Landing Pages
* Product Highlights
* Marketing Sections

Avoid excessive animation.

Performance is priority.

---

## TanStack Table

Use for:

* Admin Products
* Orders
* Inventory
* Users

Requirements:

* sorting
* filtering
* pagination
* column visibility

---

# Performance Rules

Images:

```txt
next/image
```

required.

Use:

* lazy loading
* dynamic imports
* code splitting

Target:

```txt
Lighthouse Score > 90
```

---

# SEO Rules

Every page must include:

```ts
metadata
```

Generate:

* title
* description
* OpenGraph
* Twitter cards

Products require:

```json
Product Structured Data
```

(JSON-LD)

---

# Accessibility

Must support:

* keyboard navigation
* screen readers
* focus states

Use semantic HTML whenever possible.

---

# Error Handling

Never swallow errors.

Use:

```ts
try/catch
```

Log server errors.

Return safe user-facing messages.

Do not expose stack traces.

---

# Testing

Required:

```txt
Vitest
React Testing Library
```

E2E:

```txt
Playwright
```

Coverage goal:

```txt
80%+
```

---

# Git Workflow

Branch naming:

```txt
feature/*
fix/*
refactor/*
hotfix/*
```

Commit style:

```txt
feat:
fix:
refactor:
docs:
test:
chore:
```

Example:

```txt
feat: add product filtering
```

---

# Code Review Checklist

Before merging:

* TypeScript passes
* ESLint passes
* Build succeeds
* Tests pass
* Snyk passes
* No secrets committed
* Accessibility checked
* Mobile responsive verified

---

# Future Features

Planned integrations:

* Stripe
* Product Reviews
* Wishlist
* Product Comparison
* AI Search
* Recommendation Engine
* Analytics Dashboard
* Email Notifications
* Inventory Tracking
* Multi-Vendor Marketplace

---

# Agent Instructions

When generating code:

1. Follow project architecture.
2. Prefer reusable solutions.
3. Maintain strict TypeScript.
4. Prioritize security.
5. Use server components whenever possible.
6. Validate all external input.
7. Write scalable and maintainable code.
8. Avoid unnecessary dependencies.
9. Optimize for production readiness.
10. Explain architectural decisions when significant changes are introduced.
11. **Always use Context7 MCP** before writing code against any library/framework (Next.js, Clerk, drei, motion, shadcn, etc.) — fetch current docs to ensure correct API usage.
12. **Always use `"use cache"`** for data access functions in `src/lib/data/`. Every async function that reads data must use the `"use cache"` directive. Server Actions (mutations) are the only exception.

```
```