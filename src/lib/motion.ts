/**
 * Motion System — global design tokens for animation.
 *
 * RULES:
 * 1. Never hardcode durations/easings in components. Import from here.
 * 2. Animate only `transform` and `opacity` for GPU acceleration.
 * 3. Every animated component must respect `usePrefersReducedMotion`.
 */

import type { Transition, Variants } from "framer-motion";

// ----------------------------------------------------------------
// EASING CURVES
// Linear/Vercel-style: fast out, gentle settle. Feels premium.
// ----------------------------------------------------------------
export const EASE = {
  /** Smooth deceleration — default for entrances. */
  out: [0.16, 1, 0.3, 1] as const,
  /** Symmetric — for state changes (open/close, hover). */
  inOut: [0.65, 0, 0.35, 1] as const,
  /** Snappy — for micro-interactions (taps, toggles). */
  snappy: [0.4, 0, 0.2, 1] as const,
  /** Spring — for tactile elements (magnetic, tilt). */
  spring: { type: "spring", stiffness: 200, damping: 22, mass: 0.6 } as const,
} satisfies Record<string, Transition["ease"] | Transition>;

// ----------------------------------------------------------------
// DURATIONS (in seconds — Framer uses seconds, not ms)
// ----------------------------------------------------------------
export const DUR = {
  /** 150ms — tap feedback, tiny state flips */
  xs: 0.15,
  /** 300ms — hover, focus, quick UI feedback */
  sm: 0.3,
  /** 600ms — default entrance, section reveals */
  md: 0.6,
  /** 900ms — large reveals, hero headline */
  lg: 0.9,
  /** 1.4s — cinematic, page-load moments */
  xl: 1.4,
} as const;

// ----------------------------------------------------------------
// STAGGER DELAYS
// Small numbers. Stagger is a whisper, not a shout.
// ----------------------------------------------------------------
export const STAGGER = {
  tight: 0.04,
  base: 0.08,
  loose: 0.14,
} as const;

// ----------------------------------------------------------------
// VIEWPORT CONFIG
// Once-only reveal, trigger when element is 80px into the viewport.
// ----------------------------------------------------------------
export const VIEWPORT = {
  once: true,
  margin: "-80px",
} as const;

// ----------------------------------------------------------------
// REUSABLE VARIANTS
// Compose these. Don't reinvent per component.
// ----------------------------------------------------------------

/** Fade + rise 24px. The workhorse entrance. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.md, ease: EASE.out },
  },
};

/** Pure fade. For elements where movement would distract. */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: DUR.md, ease: EASE.out },
  },
};

/** Fade + rise, but larger (48px). For hero-level elements. */
export const fadeUpLarge: Variants = {
  hidden: { opacity: 0, y: 48 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.lg, ease: EASE.out },
  },
};

/** Mask wipe from left. For section titles, headlines. */
export const revealMask: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  show: {
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: DUR.lg, ease: EASE.out },
  },
};

/** Word-level reveal for text. Each word masks up. */
export const wordReveal: Variants = {
  hidden: { y: "110%", opacity: 0 },
  show: {
    y: "0%",
    opacity: 1,
    transition: { duration: DUR.lg, ease: EASE.out },
  },
};

/** Parent that staggers children. */
export const staggerParent = (
  stagger: number = STAGGER.base,
  delayChildren: number = 0
): Variants => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
});

/** Card lift on hover. For interactive cards. */
export const cardLift = {
  rest: { y: 0 },
  hover: {
    y: -4,
    transition: { duration: DUR.sm, ease: EASE.out },
  },
} as const;