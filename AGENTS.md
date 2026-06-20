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

## Setup (Fresh Clone)

After cloning the repo, install the agent skills (not committed — they live in `.gitignore`):

```bash
./scripts/setup-skills.sh
```

This installs the Vercel Labs skill package into `.agents/skills/`, providing the AI agent with Clerk, design, and other domain-specific instructions. Restart opencode after installation.

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
├── services/
│
├── lib/
│   ├── axios.ts
│   ├── mongodb/
│   │   ├── index.ts
│   │   └── collections.ts
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

Create data access functions in `src/lib/data/` with `"use cache"` per function. Query MongoDB via collection helpers:

```ts
// src/lib/data/products.ts
import { getProductsCollection } from "@/lib/mongodb/collections";
import type { Product } from "@/types";

export async function getProducts(): Promise<Product[]> {
  "use cache";
  const col = await getProductsCollection();
  return col.find().toArray() as Promise<Product[]>;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  "use cache";
  const col = await getProductsCollection();
  return col.findOne({ slug }) as Promise<Product | null>;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  "use cache";
  const col = await getProductsCollection();
  return col.find({ featured: true }).toArray() as Promise<Product[]>;
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
- `src/components/store/navbar-wrapper.tsx` — `AuthButtons` (uses `useAuth()`), `UserButton`
- `src/components/store/auth-dialog.tsx` — Sign In / Get Started buttons using `useClerk().openSignIn()`
- `src/app/sign-in/[[...sign-in]]/page.tsx` — Sign-in page with `<SignIn />`
- `src/app/sign-up/[[...sign-up]]/page.tsx` — Sign-up page with `<SignUp />`

Components used from `@clerk/nextjs`:
- `ClerkProvider` — wraps root layout
- `useAuth` — client-side hook to check auth state (used in navbar)
- `useClerk` — client-side hook to open Clerk's native modal (`openSignIn()`, `openSignUp()`)
- `UserButton` — avatar + dropdown for signed-in users

Auth controls use `useClerk().openSignIn()` to show Clerk's themed modal (styled via `shadcn` theme in ClerkProvider).

### Modal Theming

Clerk modals (sign-in, sign-up, user profile) are themed via `ClerkProvider` appearance in `layout.tsx`:

- `colorBackground` — `var(--ts-card)` (CSS variable, reactive to dark/light toggle)
- `colorModalBackdrop` — `var(--ts-backdrop)` (`rgba(0,0,0,0.5)` dark / `rgba(0,0,0,0.15)` light)
- `colorInput` — `var(--ts-input)`
- `cardBox` — layered `box-shadow` for 3D depth
- `card`/`navbar`/`scrollBox`/`footer` — `background: var(--ts-card)`

CSS variables `--ts-backdrop` are defined in `globals.css` `:root` and `.light` blocks.

The `auth-dialog.tsx` also passes per-call `appearance` to `openSignIn()`/`openSignUp()` with the same values read via `document.documentElement.classList.contains("light")`.

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
MongoDB Native Driver
```

(`mongodb` npm package, not Mongoose). Consistent across the project. No mixing of approaches.

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

# Collections

Typed collection helpers live in `src/lib/mongodb/collections.ts`:

```ts
import { getDb } from ".";
import type { Product, Category } from "@/types";

const DB_NAME = "techsphere";

export async function getProductsCollection() {
  const db = await getDb(DB_NAME);
  return db.collection<Product>("products");
}

export async function getCategoriesCollection() {
  const db = await getDb(DB_NAME);
  return db.collection<Category>("categories");
}
```

Add new collection helpers when adding a new collection type.

---

# API Routes

RESTful CRUD endpoints live in `src/app/api/{resource}/`. Each resource has:

- `src/app/api/{resource}/route.ts` — `GET` (list), `POST` (create)
- `src/app/api/{resource}/[id]/route.ts` — `PUT` (update), `DELETE`

All routes use `get{Resource}Collection()` from `collections.ts` and handle errors returning `NextResponse.json` with appropriate status codes.

Existing resources: `products`, `categories`.

Pattern for list:

```ts
export async function GET() {
  const col = await getProductsCollection();
  const items = await col.find().toArray();
  return NextResponse.json(items);
}
```

Pattern for create:

```ts
export async function POST(req: Request) {
  const body = await req.json();
  const col = await getProductsCollection();
  const doc = { ...body, createdAt: new Date(), updatedAt: new Date() };
  const result = await col.insertOne(doc);
  return NextResponse.json({ ...doc, _id: result.insertedId }, { status: 201 });
}
```

Pattern for update:

```ts
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const col = await getProductsCollection();
  await col.updateOne({ _id: id }, { $set: { ...body, updatedAt: new Date() } });
  return NextResponse.json({ success: true });
}
```

Pattern for delete:

```ts
export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const col = await getProductsCollection();
  await col.deleteOne({ _id: id });
  return NextResponse.json({ success: true });
}
```

---

# Seed Database

File: `src/app/api/seed/route.ts`

- `POST /api/seed` — drops existing documents and inserts mock data (6 categories, 12 products) from `src/constants/`
- `DELETE /api/seed` — deletes all documents from both collections

Useful for resetting the database during development:

```bash
curl -X POST http://localhost:3000/api/seed
```

---

# Axios Instance

File: `src/lib/axios.ts`

Shared axios instance used by all client-side service modules:

```ts
import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
});

export default api;
```

Base URL is `/api` so service calls look like `api.get("/products")`.

---

# Service Layer

Client-side service modules live in `src/services/`. One file per resource. Each uses the shared axios instance for CRUD:

```ts
// src/services/categories.ts
import api from "@/lib/axios";
import type { Category } from "@/types";

export async function getCategories(): Promise<Category[]> {
  const { data } = await api.get("/categories");
  return data;
}

export async function createCategory(name: string): Promise<Category> {
  const { data } = await api.post("/categories", { name });
  return data;
}

export async function updateCategory(id: string, name: string): Promise<void> {
  await api.put(`/categories/${id}`, { name });
}

export async function deleteCategory(id: string): Promise<void> {
  await api.delete(`/categories/${id}`);
}
```

Existing services: `products`, `categories`.

Typed form data for product creation/editing:

```ts
// src/services/products.ts
export interface ProductFormData {
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
}
```

---

# Admin CRUD Data Flow

1. **Server Component** renders admin page with `"use client"` components
2. **Client Component** calls service function on mount (`useEffect` or event handler)
3. **Service** calls axios (`api.get("/products")`)
4. **API Route** receives request, calls collection helper, queries MongoDB
5. **Response** flows back through the chain

```
[Admin Page] → [Service] → [Axios] → [API Route] → [Collection Helper] → [MongoDB]
```

---

# MONGODB_URI

For local development outside Docker, `MONGODB_URI` must point to a running MongoDB instance:

```env
MONGODB_URI=mongodb://localhost:27017/techsphere
```

Inside Docker, the service hostname `mongodb` is used instead:

```env
MONGODB_URI=mongodb://mongodb:27017/techsphere
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

Two env files for Docker:
- `.env` — build-time vars for docker-compose (`NEXT_PUBLIC_*` only, safe to commit)
- `.env.docker` — runtime secrets and service URLs (mounted as `env_file` in docker-compose)

---

# File Uploads

Provider:

```txt
RustFS
```

## Implementation

Accessed via `@aws-sdk/client-s3` with S3-compatible API. Import must use `eval("import(...)")` to bypass Turbopack's module name mangling in dev mode:

```ts
const { S3Client } = await eval(`import("@aws-sdk/client-s3")`);
```

Images are proxied through `/api/images/[...path]` to avoid CORS and enable central caching.

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

## Product Image Upload (Admin)

Product images are stored in the `msc-storage` bucket under the `msc-website-product-images/` prefix.

### Upload Flow

1. Admin selects images in the `ProductImageUpload` component (uses `@reui/use-file-upload` hook)
2. On file selection, `uploadProductImage()` (in `src/services/products.ts`) sends each file as `multipart/form-data` to `POST /api/upload`
3. The endpoint calls `uploadImage(key, buffer, contentType, "msc-website-product-images")` from `s3-server.ts`
4. Returns a proxy URL: `/api/images/msc-website-product-images/{unique-key}.{ext}`
5. The URL is stored in the product's `images` array in MongoDB

### Delete Flow

- When a product is deleted, `DELETE /api/products/[id]` calls `deleteImage(proxyUrl)` for each image before removing the MongoDB document
- `deleteImage` sends a `DeleteObjectCommand` to RustFS with the extracted S3 key

### Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `POST /api/upload` | FormData (`file`) | Upload single image, returns `{ url }` |
| `GET /api/images/[...path]` | GET | Serve image from RustFS via proxy |

### Component

`src/components/admin/product-image-upload.tsx` — drag-and-drop UI, max 5 images, preview thumbnails, per-image delete.

---

# Docker

Every service must be containerized.

Services:

```txt
nextjs
mongodb
rustfs
```

## Setup

```bash
docker compose up --build
```

The default `docker compose up --build` builds the `dev` target (full node_modules, `CMD` clears `.next` on start for fresh Turbopack cache) and runs `npx next dev` with hot reload via volume mounts — source changes appear immediately without rebuilding. Only re-run `--build` when `package.json` changes.

### Production Build

```bash
docker compose run --rm nextjs npx next build
docker compose up
```

Or to skip the dev server and run the standalone build directly, override the command:

```bash
docker compose up --build -d
docker compose exec nextjs npx next build
docker compose exec nextjs node server.js
```

## Build Optimization

- `output: "standalone"` in `next.config.ts` — Next.js file tracing ships only used modules to the runner stage, reducing final image from ~1.5GB to ~400MB.
- `--mount=type=cache,target=/root/.bun/install/cache` — caches bun package downloads across rebuilds. Only re-downloads when `package.json`/`bun.lock` changes.
- Multi-stage Dockerfile: `deps` (bun install) → `dev` (source + `npx next dev`) → `builder` (`npx next build`) → `runner` (`node server.js`).
- `dev` stage is the default build target — clears `.next` on start to avoid stale Turbopack caches.

## Build Args

`NEXT_PUBLIC_*` env vars must be passed as build args so Next.js can inline them at build time:

```yaml
build:
  args:
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: ${NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
```

These are resolved from `.env` (auto-loaded by docker compose). The `.env` file only contains public vars; secrets stay in `.env.docker` (runtime `env_file`).

## Supporting Services

### mongo-express

Web-based MongoDB admin GUI. Accessible at `http://localhost:8081`. Default credentials: `admin` / `admin`. Connects to the `mongodb` service automatically.

### Mailpit

SMTP server + web UI for email testing. Captures all outgoing emails from the app in dev mode.

- **SMTP**: `localhost:1025` (no auth, no TLS) — set `SMTP_HOST=mailpit`, `SMTP_PORT=1025` in `.env.docker`
- **Web UI**: `http://localhost:8025` — view, inspect, and delete captured emails
- Messages persist in a Docker volume (`mailpit_data`)

## File Reference

| File | Purpose |
|------|---------|
| `Dockerfile` | 4-stage build (deps → dev → builder → runner) on `node:26-slim`, bun for deps only, `npx next dev` / `npx next build` / `node server.js` |
| `docker-compose.yml` | nextjs (dev target, volume mounts, hot reload) + mongodb:8 (volume: `mongodb_data`) + rustfs (volumes: `rustfs_data`, `rustfs_logs`) + mongo-express (web GUI at `:8081`) + mailpit (SMTP at `:1025`, web UI at `:8025`) |
| `.env` | Build-time vars for docker-compose variable substitution (`NEXT_PUBLIC_*`) |
| `.env.docker` | Runtime env vars for containers (secrets, service URLs) |
| `.dockerignore` | Excludes `node_modules`, `.next`, `.git`, `.env`, `docs/`, `AGENTS.md`, logs |

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