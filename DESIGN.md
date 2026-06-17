# DESIGN.md

# Vision

Build the most premium technology shopping experience possible.

The website should feel like a mix of:

* Apple Store
* Nothing.tech
* Linear
* Stripe
* Arc Browser
* Tesla

The user should feel:

* Premium
* Modern
* Fast
* Interactive
* Futuristic
* Trustworthy

---

# Design Philosophy

## Minimal Surface

Avoid clutter.

Every element must have a purpose.

Use whitespace aggressively.

---

## Product First

Products are the hero.

Animations should enhance products.

Animations should never distract from products.

---

## Motion Driven UX

Motion communicates hierarchy.

Motion communicates feedback.

Motion communicates quality.

Every transition should feel intentional.

---

# Visual Identity

## Primary Colors

```css
--background: #0A0A0A;
--surface: #111111;
--card: #171717;

--primary: #FFFFFF;
--secondary: #A1A1AA;

--accent-blue: #3B82F6;
--accent-purple: #8B5CF6;
```

---

## Theme System

### Dark-First (default)

The `:root` selector contains all dark-mode CSS custom properties. Light mode is
an opt-in override via the `.light` class on `<html>`.

```css
:root { /* dark mode */
  --ts-bg: oklch(0.145 0 0);
  --ts-foreground: oklch(0.985 0 0);
  --ts-card: #171717;
  --ts-surface: #111111;
  /* ... */
}

.light { /* light mode override */
  --ts-bg: oklch(1 0 0);
  --ts-foreground: oklch(0.145 0 0);
  --ts-card: oklch(1 0 0);
  --ts-surface: #f5f5f5;
  /* ... */
}
```

The `<AnimatedThemeToggler>` component toggles the `.light` class on `<html>`
and persists the preference to `localStorage`.

### Design Tokens Naming

All tokens use the `--ts-*` prefix and are referenced in Tailwind's `@theme inline`
block. Use them directly in JSX:

```tsx
className="bg-background text-foreground border-border"
```

### CSS Variable Usage in Components

Never hardcode color values (`#111`, `rgba(10,10,10,0.85)`, `text-white`).
Always use CSS custom properties:

- `var(--ts-bg)` / `bg-background`
- `var(--ts-surface)` / `bg-surface`
- `var(--ts-foreground)` / `text-foreground`
- `var(--ts-border)` / `border-border`
- `var(--ts-primary-foreground)` / `text-primary-foreground`

For dynamic backgrounds in motion animations, use `color-mix`:

```ts
backgroundColor: "color-mix(in oklch, var(--ts-bg) 85%, transparent)"
```

---

## Design Style

Dark First.

Premium First.

Minimal First.

Technology First.

---

# Typography

## Headings

Font:

Geist

Alternative:

Inter

Weights:

700
800
900

---

## Body

Font:

Geist

Weight:

400
500

---

# Animation System

## motion.dev (Primary Layer)

Used for every interaction that is not 3D.

Required on every component.

Usage:

* Page transitions (layout animations, route changes)
* Hover interactions (cards, buttons, links)
* Product reveals (staggered entrance, scroll-triggered)
* Cart animations (slide-over, add/remove items)
* Scroll animations (fade, reveal, blur in, scale)
* Micro-interactions (wishlist toggle, filter changes, search)
* Loading states (skeleton shimmer, placeholder transitions)
* Modals and overlays (mount/unmount animations)
* Navigation (menu open/close, mobile drawer)

Easing:

```ts
{ ease: [0.16, 1, 0.3, 1] } // custom ease curve
```

Duration:

* Micro-interactions: 200ms
* Page transitions: 300ms
* Entrance animations: 400ms
* Scroll reveals: 600ms

---

## Three.js / @react-three/fiber (3D Layer)

Used for premium immersive experiences.

### Hero Section

Full viewport 3D scene.

Interactive floating products:

* MacBook floating on orbit
* Smartphone rotating on axis
* RGB accessories orbiting parent device

Camera responds to:

* Mouse movement (parallax depth)
* Scroll position (dolly zoom)
* Device tilt (mobile gyroscope)

Performance:

* 60 FPS target
* LOD (level of detail) switching
* Fallback to static images on low-end devices

### Product Showcase

3D product viewer on product detail page.

Features:

* 360-degree rotation
* Zoom to inspect
* Color/material switching

Implementation:

```tsx
"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
```

### Category Introductions

Each category page has a 3D hero object representing the category:

* Laptops → floating laptop
* Smartphones → rotating phone
* Gaming → RGB cyberpunk scene
* Accessories → floating items in a cluster

### Feature Highlights

Landing sections that explain features with 3D visualizations:

* Chip architecture
* Battery life visualization
* Connectivity graph
* Ecosystem connections

---

## Parallax (Depth Layer)

Parallax is used to create depth perception without full 3D.

### Scroll Parallax

Multi-plane scrolling:

```tsx
// foreground moves faster
// midground moves at medium speed
// background moves slowest
```

Use cases:

* Featured products row (horizontal scroll + vertical parallax)
* Category cards with depth illusion
* Hero section multi-layer background
* Product listings with staggered depth cards

### Mouse Parallax

Subtle movement based on cursor position.

Applied to:

* Product cards
* Hero elements
* Category thumbnails
* Decorative elements

---

## Animation Hierarchy

```
1. Three.js 3D ─────────────── Hero, Showcase, Categories
       │
2. Parallax ────────────────── Scroll depth, Mouse depth
       │
3. motion.dev ──────────────── Everything else
```

Every component must have at minimum a motion.dev animation.

If a component is 3D, it still uses motion.dev for UI overlays and transitions.

---

# Homepage Structure

## Section 1 — 3D Hero

Full viewport interactive 3D scene.

Three.js + motion.dev overlay text.

Mouse parallax + scroll-driven camera animation.

---

## Section 2 — Featured Products

Horizontal scroll row.

Parallax depth on cards.

motion.dev entrance stagger.

---

## Section 3 — Featured Categories

3D category objects or parallax depth cards.

motion.dev hover scale + glow.

---

## Section 4 — Tech Ecosystem

3D visualization of connected devices.

Animated paths between products.

motion.dev for UI tooltips.

---

## Section 5 — Best Sellers

Dynamic grid.

motion.dev staggered reveal on scroll.

Parallax depth on row backgrounds.

---

## Section 6 — Newsletter

Minimal.

motion.dev entrance animation.

Single CTA with hover effect.

---

# Product Card Design

3D tier (hero/featured cards):

* Three.js interactive card with orbit
* Light reflection on hover
* Depth layers

Standard cards:

* motion.dev hover scale (1.02)
* Parallax image shift on mouse move
* Glow shadow on hover
* Staggered entrance on scroll

Duration:

200ms

Easing:

easeOut

---

# Product Page

## Hero Layout

Large gallery.

motion.dev image transitions (crossfade).

Sticky purchase panel with entrance animation.

---

## Product Gallery

Standard:

* motion.dev zoom + swipe transitions

Premium:

* Three.js 3D product viewer

---

## Specs Section

Accordion layout.

motion.dev expand/collapse animation.

Minimal.

Fast loading.

---

# Scroll Effects

Allowed with motion.dev:

* Fade
* Reveal
* Blur In
* Parallax
* Scale
* Stagger

Forbidden:

* Bounce
* Flash
* Excessive rotations
* Long animations (>1s)

---

# Micro Interactions

Required (all using motion.dev):

* Buttons (scale + color)
* Cards (elevation + glow)
* Navigation (underline + fade)
* Filters (slide + check)
* Wishlist (icon morph)
* Cart (bounce + slide)
* Checkout (step transitions)
* Search (expand + results)

---

# Search Experience

Instant search.

Command palette style.

motion.dev expand animation.

Inspired by:

Linear

Raycast

---

# Cart Experience

Slide-over panel.

motion.dev slide + fade.

Animated additions (item flies into cart).

Real-time updates.

Zero page refreshes.

---

# Loading States

Use Skeletons.

motion.dev shimmer animation.

Never use generic spinners.

---

# Dashboard Design

Admin dashboard uses:

TanStack Table

No 3D. No parallax.

motion.dev only for:

* Row entrance
* Sort indicator
* Filter panel slide

---

# Performance Budget

Target:

Lighthouse ≥ 90

First Load JS:

< 200kb

Hero Animation:

60 FPS

CLS:

< 0.1

LCP:

< 2.5s

3D Fallback:

Auto-switch to static images if FPS drops below 30

---

# Mobile Experience

Mobile is not desktop compressed.

Mobile has dedicated layouts.

Reduce:

* 3D complexity (swap for parallax or motion.dev)
* Particles
* Background effects

Touch optimizations:

* Swipe for 3D rotation
* Tap for motion.dev feedback
* Reduced motion media query support

---

# Accessibility

WCAG AA minimum.

prefers-reduced-motion respected.

Keyboard navigation required.

Visible focus states required.

Screen reader compatibility required.

---

# Premium Features

Future roadmap:

* AI Product Search
* 3D Product Configurator
* AR Product Preview (WebXR)
* Personalized Recommendations
* Voice Search
* Dynamic Product Comparison

---

# Design Rule

If an animation does not improve:

* Clarity
* Delight
* Conversion

Remove it.
