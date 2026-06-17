# Performance Optimization Algorithm

Framework for preventing jank in 3D and animated components.

---

## 1. Detection — Is It Lagging?

Run this checklist for any animation that feels sluggish:

| Signal | How to Check |
|--------|-------------|
| DevTools FPS < 50 | Chrome DevTools → Performance tab → FPS meter |
| GPU frame drops | DevTools → Rendering → "FPS Meter" |
| Layout shifts | DevTools → Rendering → "Layout Shift Regions" |
| Long tasks > 50ms | DevTools → Performance → capture while animating |
| Bundle ballooning | `bun run build` then check `.next/static/chunks` sizes |

---

## 2. motion.dev Optimization

### Always

```tsx
// Use GPU-composited properties only:
transform, opacity, filter  // ✅ GPU
width, height, top, left    // ❌ triggers layout
```

### Scroll-Driven Animations (`resizable-navbar.tsx`, `macbook-scroll.tsx`)

```tsx
// Mark the scroll container
useScroll({ container: scrollRef });
```

```tsx
// Throttle expensive scroll handlers
useMotionValueEvent(scrollY, "change", (latest) => {
  // avoid heavy computation here — use transform values instead
});
```

### Entrance Animations (`product-card.tsx`, `category-sidebar.tsx`, `products-grid.tsx`)

```tsx
// Always constrain animated properties
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "0px 0px -100px" }}  // 👈 trigger before element enters
  transition={{ duration: 0.3, ease: "easeOut" }}
/>
```

Rules:
- `viewport={{ once: true }}` — never re-animate on scroll-back
- `margin: "0px 0px -100px"` — start animation 100px before the element enters view
- Max stagger: `delay: index * 0.05` for < 20 items, `delay: index * 0.025` for > 20

### Hover / Tilt (`comet-card.tsx`)

```tsx
// Use useSpring with damping, not raw useTransform
const rotateX = useSpring(mouseX, { stiffness: 300, damping: 30 });
const rotateY = useSpring(mouseY, { stiffness: 300, damping: 30 });
```

### Layout Animations (`products-grid.tsx`)

```tsx
// Only use layout animations when items reorder
<motion.div layout>  // ✅ needed for AnimatePresence popLayout
// For simple grids without reordering, drop `layout`:
<div>  // ✅ faster
```

### Text Reveals (`dia-text-reveal.tsx`)

```tsx
// Ensure paint containment
&::after {
  /* already uses will-change: clip-path — verify in devtools */
}
```

---

## 3. Three.js Optimization (for future 3D components)

### Canvas Setup

```tsx
<Canvas
  dpr={[1, 1.5]}            // limit pixel ratio — never 2 on mobile
  frameloop="demand"         // only render when something changes
  performance={{ min: 0.5 }} // allow downscaling on low-end devices
  gl={{ antialias: false }}  // MSAA is expensive; use post-processing instead
>
```

### Objects & Materials

```tsx
// Reuse geometries and materials
const geo = useMemo(() => new THREE.BoxGeometry(1, 1, 1), []);
const mat = useMemo(() => new THREE.MeshStandardMaterial({ color: "red" }), []);
```

```tsx
// Use instancing for repeated geometry
<instancedMesh ref={ref} args={[null, null, 1000]} />
```

### Animation Loop

```tsx
useFrame((state, delta) => {
  // use delta, not Date.now()
  mesh.current.rotation.x += delta * 0.5;
});
```

### Disposal

```tsx
useEffect(() => {
  return () => {
    geometry.dispose();
    material.dispose();
    texture.dispose();
  };
}, []);
```

### LOD (Level of Detail)

```tsx
<LOD>
  <mesh> {/* high-poly, close */} </mesh>
  <mesh> {/* med-poly */} </mesh>
  <mesh> {/* low-poly, far */} </mesh>
</LOD>
```

---

## 4. cobe Globe Optimization (`features-section.tsx`)

```tsx
// Current pattern — verify these settings:
const globe = new COBE()
  .create(canvas, {
    // ... current config
  })
  .render();

// Ensure:
// - `phi` or `theta` changes slowly (avoid fast rotation)
// - dark segments < 5 (fewer polygon segments = faster)
// - Use `globe.update()` only when config changes
// - Don't pass onRender callback (removed in cobe v2 — use rAF loop)
```

---

## 5. View Transitions API (`animated-theme-toggler.tsx`)

```tsx
// Keep lightweight — already optimal
document.startViewTransition(() => {
  document.documentElement.classList.toggle("light");
});
```

⚠️ Avoid within `startViewTransition()` callbacks:
- Heavy DOM mutations
- Synchronous layout reads (`offsetHeight`, `getBoundingClientRect`)
- Network requests

---

## 6. Dynamic Imports — Split Heavy Components

Every animated component must be lazy-loaded if > 5 KB of JS:

```tsx
import dynamic from "next/dynamic";

const MacbookScroll = dynamic(
  () => import("@/components/ui/macbook-scroll"),
  { ssr: false }
);

const Globe = dynamic(
  () => import("@/components/store/globe"),
  { ssr: false, loading: () => <div className="h-80 w-full bg-card animate-pulse rounded-xl" /> }
);
```

Rules:
- `ssr: false` for any component using `window`, `canvas`, or `useScroll`
- Always provide a `loading` skeleton matching the component dimensions
- Split at route boundaries, not inside render loops

---

## 7. Bundle Budget Enforcement

| Target | Limit |
|--------|-------|
| Per animated component | < 200 KB |
| motion.dev + deps | < 30 KB (shared) |
| Three.js + r3f + drei | < 150 KB (shared, loaded only on 3D pages) |
| cobe | < 10 KB |
| Total CSS animations bundle | < 5 KB |

Check with:
```bash
bunx server-only  # or next-bundle-analyzer
```

---

## 8. Measurement Protocol

Before committing any animated feature:

```bash
# 1. Build
bun run build

# 2. Run Lighthouse (headless)
bunx lighthouse http://localhost:3000 --view --preset=desktop
bunx lighthouse http://localhost:3000 --view --preset=phone

# 3. Check FPS in Chrome DevTools
#    - Performance tab → 30s recording while scrolling the page
#    - Look for: FPS < 30, long frames > 50ms, forced reflows

# 4. Bundle analysis
ANALYZE=true bun run build
```

### Pass Criteria
| Metric | Threshold |
|--------|-----------|
| Lighthouse Performance | ≥ 90 |
| FPS during scrolling | ≥ 55 average, never below 30 |
| Long tasks | None > 100ms |
| Layout shifts (CLS) | 0 |
| First Input Delay | < 50ms |
| Bundle size per component | < 200 KB |

---

## 9. Decision Tree — Every New Animation

```txt
Is it motion.dev?
├─ Yes → Is it scroll-driven?
│   ├─ Yes → useScroll() + useTransform(), never useMotionValueEvent with DOM reads
│   └─ No  → Is it an entrance animation?
│       ├─ Yes → whileInView + once:true, staggers ≤ 0.05×count
│       └─ No  → whileHover/whileTap on transform/opacity only
└─ No  → Is it Three.js?
    ├─ Yes → limit dpr, frameloop="demand", dispose on unmount
    └─ No  → Is it canvas-based (cobe)?
        └─ Yes → rAF loop, no onRender, limit segments
```

---

## 10. Critical — For Every Component

```tsx
// 1. Respect reduced motion
import { useReducedMotion } from "motion/react";
const prefersReducedMotion = useReducedMotion();

const transition = prefersReducedMotion
  ? { duration: 0 }                // instant
  : { duration: 0.3, ease: "easeOut" };

// 2. Never animate non-GPU properties
// ❌ <motion.div animate={{ width: "50%", height: 200 }} />
// ✅ <motion.div animate={{ scaleX: 0.5, scaleY: 0.5 }} />

// 3. Contain paint
<div style={{ contain: "layout style paint" }}>
  <motion.div animate={{ opacity: 1 }} />
</div>

// 4. Use will-change sparingly
// ❌ * { will-change: transform }
// ✅ Animate only what needs it
```
