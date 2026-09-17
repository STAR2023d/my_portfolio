import { motion } from "framer-motion";

import { TextReveal } from "../motion/TextReveal";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { VIEWPORT, EASE, DUR } from "../../lib/motion";

type Props = {
  /** Small uppercase label above the title. */
  subtitle: string;
  /** The main section title. Reveals word-by-word. */
  title: string;
  /** Text alignment. Default: left. */
  align?: "left" | "center";
  /** Extra classes on the wrapper. */
  className?: string;
};

/**
 * Section heading with choreographed reveal:
 *   1. Subtitle slides up from a mask
 *   2. Title reveals word-by-word (slight delay after subtitle)
 *
 * Respects prefers-reduced-motion.
 */
function SectionTitle({
  subtitle,
  title,
  align = "left",
  className = "",
}: Props) {
  const prefersReduced = usePrefersReducedMotion();
  const alignClass = align === "center" ? "text-center" : "text-left";

  return (
    <div className={`mb-14 ${alignClass} ${className}`.trim()}>
      {/* ---------- Subtitle (mask wipe) ---------- */}
      {prefersReduced ? (
        <p className="text-primary font-medium mb-3 uppercase tracking-widest text-sm">
          {subtitle}
        </p>
      ) : (
        <div className="overflow-hidden mb-3">
          <motion.p
            initial={{ y: "110%" }}
            whileInView={{ y: "0%" }}
            viewport={VIEWPORT}
            transition={{ duration: DUR.md, ease: EASE.out }}
            className="text-primary font-medium uppercase tracking-widest text-sm"
          >
            {subtitle}
          </motion.p>
        </div>
      )}

      {/* ---------- Title (word-by-word) ---------- */}
      <TextReveal
        as="h2"
        text={title}
        stagger={0.06}
        delayChildren={0.1}
        className="text-4xl md:text-5xl font-bold"
      />
    </div>
  );
}

export default SectionTitle;