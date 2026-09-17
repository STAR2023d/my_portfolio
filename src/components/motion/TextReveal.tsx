import { motion } from "framer-motion";
import { wordReveal, staggerParent, VIEWPORT, STAGGER } from "../../lib/motion";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

type TextRevealProps = {
  /** The full text to reveal. Splits on spaces. */
  text: string;
  /** Stagger between words (seconds). Default: STAGGER.tight. */
  stagger?: number;
  /** Delay before the first word. */
  delayChildren?: number;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
};

/**
 * Word-by-word masked reveal. Each word rises from behind a mask.
 *
 * Usage:
 *   <TextReveal as="h1" text="Building scalable systems" />
 */
export function TextReveal({
  text,
  stagger = STAGGER.tight,
  delayChildren = 0,
  className,
  as = "h2",
}: TextRevealProps) {
  const prefersReduced = usePrefersReducedMotion();
  const words = text.split(" ");

  if (prefersReduced) {
    const Tag = as;
    return <Tag className={className}>{text}</Tag>;
  }

  const MotionTag = motion[as] as typeof motion.h2;

  return (
    <MotionTag
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={staggerParent(stagger, delayChildren)}
      className={className}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden align-bottom"
          style={{ paddingBottom: "0.1em" }}
        >
          <motion.span
            variants={wordReveal}
            className="inline-block"
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
