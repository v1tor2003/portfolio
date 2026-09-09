# Troubleshooting & Solutions Registry: Multipage Architecture & Framer Motion Transitions

- **Date**: 2026-09-09
- **Scope**: Migration to multipage routing, Framer Motion integration with React 19, and Biome/TypeScript resolution.

---

## Technical Challenges & Resolutions

### 1. React 19 and Framer Motion v7 JSX Types Mismatch
- **Issue**: When passing `children` and `className` to `<motion.div>` in `PageTransition.tsx`, TypeScript 7 emitted:
  ```
  error TS2322: Property 'children' does not exist on type 'IntrinsicAttributes & HTMLAttributesWithoutMotionProps<unknown, unknown> & MotionProps & RefAttributes<unknown>'
  ```
- **Root Cause**: `framer-motion` v7 types were designed against React 17/18 where `children` was implicitly included in `React.HTMLAttributes` and JSX element declarations. In React 19, implicit children types were decoupled.
- **Resolution**: Defined a React 19 compatible `MotionDiv` component adapter typing `children?: ReactNode` and standard motion properties explicitly:
  ```tsx
  const MotionDiv = motion.div as React.ComponentType<{
    key?: string | null;
    initial?: Record<string, unknown>;
    animate?: Record<string, unknown>;
    exit?: Record<string, unknown>;
    transition?: Record<string, unknown>;
    className?: string;
    children?: ReactNode;
  }>;
  ```
  This preserved typecheck safety during Next.js production builds while avoiding invasive library monkey-patching.

### 2. Framer Motion `mode="wait"` Asynchronous Exit Animations in Vitest (JSDOM)
- **Issue**: In `PageTransition.test.tsx`, re-rendering the component when switching pathname caused the test to fail finding the entering content because `AnimatePresence mode="wait"` paused mounting until the exit animation finished.
- **Resolution**: Used `@testing-library/react`'s `act()` together with Vitest's `vi.waitFor()` to allow the asynchronous lifecycle tick of `AnimatePresence` to settle before asserting entering DOM nodes.

### 3. Dual Route & Hash Compatibility in `useActiveSection`
- **Issue**: Previously, `useActiveSection` queried the DOM directly via `document.querySelector(item.href)`. When `item.href` was changed to `/about`, `document.querySelector` threw `SyntaxError: Invalid selector /about`.
- **Resolution**: Updated `useActiveSection` to evaluate `usePathname()` first for path routes starting with `/`, and only fall back to DOM selector queries for fragment anchors starting with `#`.
