import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { staggerParent, VIEWPORT, STAGGER } from "../../lib/motion";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

type StaggerProps = {
  children: ReactNode;
  /** Delay between each child (seconds). Default: STAGGER.base. */
  stagger?: number;
  /** Delay before the whole group starts. */
  delayChildren?: number;
  className?: string;
  as?: "div" | "ul" | "section";
};

/**
 * Parent that staggers its children on scroll into view.
 * Children must be wrapped in <StaggerItem>.
 *
 * Usage:
 *   <Stagger stagger={0.08}>
 *     <StaggerItem>One</StaggerItem>
 *     <StaggerItem>Two</StaggerItem>
 *   </Stagger>
 */
export function Stagger({
  children,
  stagger = STAGGER.base,
  delayChildren = 0,
  className,
  as = "div",
}: StaggerProps) {
  const prefersReduced = usePrefersReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  if (prefersReduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={staggerParent(stagger, delayChildren)}
      className={className}
    >
      {children}
    </MotionTag>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
};

export function StaggerItem({
  children,
  className,
  as = "div",
}: StaggerItemProps) {
  const prefersReduced = usePrefersReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  if (prefersReduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      variants={{
        hidden: { opacity: 0, y: 24 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
        },
      }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}