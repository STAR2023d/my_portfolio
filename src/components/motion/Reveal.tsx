import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import {
  fadeUp,
  fadeIn,
  fadeUpLarge,
  revealMask,
  VIEWPORT,
} from "../../lib/motion";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

type Variant = "fadeUp" | "fadeIn" | "fadeUpLarge" | "revealMask";

const VARIANTS: Record<Variant, Variants> = {
  fadeUp,
  fadeIn,
  fadeUpLarge,
  revealMask,
};

type RevealProps = {
  children: ReactNode;
  /** Which entrance style. Default: fadeUp. */
  variant?: Variant;
  /** Extra delay (seconds). Use sparingly. */
  delay?: number;
  /** Render as a different element (e.g. "li", "section"). */
  as?: keyof JSX.IntrinsicElements;
  className?: string;
};

/**
 * Wrap any content to reveal it on scroll.
 *
 * Usage:
 *   <Reveal>Content</Reveal>
 *   <Reveal variant="fadeUpLarge" delay={0.2}>Hero text</Reveal>
 *   <Reveal as="li" variant="fadeIn">List item</Reveal>
 */
export function Reveal({
  children,
  variant = "fadeUp",
  delay = 0,
  as = "div",
  className,
}: RevealProps) {
  const prefersReduced = usePrefersReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  // When reduced motion is on, skip the animation entirely.
  if (prefersReduced) {
    const Tag = as as keyof JSX.IntrinsicElements;
    return <Tag className={className}>{children}</Tag>;
  }

  const variants = VARIANTS[variant];

  return (
    <MotionTag
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={variants}
      transition={delay ? { delay } : undefined}
      className={className}
    >
      {children}
    </MotionTag>
  );
}