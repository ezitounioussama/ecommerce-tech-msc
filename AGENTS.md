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
| Database                  | MongoDB                                 |
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
└── middleware.ts
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

Prefer:

```ts
Server Actions
```

over client-side fetching.

Avoid unnecessary API routes.

---

# Authentication

Provider:

```txt
Clerk
```

Requirements:

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

```
```