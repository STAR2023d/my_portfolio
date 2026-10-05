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

// Classic palette — matches BackgroundGlow and ProjectCard
const GOLD = "214, 178, 110"; // champagne
const TEAL = "56, 120, 118";  // patina

/**
 * Section heading with choreographed reveal:
 *   1. Hairline ornament draws in from the left
 *   2. Subtitle slides up from a mask
 *   3. Title reveals word-by-word (slight delay after subtitle)
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
  const ornamentOrigin = align === "center" ? "origin-center" : "origin-left";

  return (
    <div className={`mb-14 ${alignClass} ${className}`.trim()}>
      {/* ---------- Ornament (hairline + dot) ---------- */}
      <div
        className={`flex items-center gap-3 mb-5 ${align === "center" ? "justify-center" : ""}`}
      >
        {prefersReduced ? (
          <>
            <span
              aria-hidden
              className="block h-px w-10"
              style={{ background: `rgba(${GOLD},0.55)` }}
            />
            <span
              aria-hidden
              className="block h-1.5 w-1.5 rounded-full"
              style={{ background: `rgb(${GOLD})` }}
            />
          </>
        ) : (
          <>
            <motion.span
              aria-hidden
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={VIEWPORT}
              transition={{ duration: DUR.md, ease: EASE.out }}
              className={`block h-px w-10 ${ornamentOrigin}`}
              style={{ background: `rgba(${GOLD},0.55)` }}
            />
            <motion.span
              aria-hidden
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={VIEWPORT}
              transition={{
                duration: DUR.sm,
                ease: EASE.out,
                delay: DUR.md * 0.6,
              }}
              className="block h-1.5 w-1.5 rounded-full"
              style={{ background: `rgb(${GOLD})` }}
            />
          </>
        )}
      </div>

      {/* ---------- Subtitle (mask wipe) ---------- */}
      {prefersReduced ? (
        <p
          className="font-medium mb-3 uppercase tracking-[0.2em] text-xs"
          style={{ color: `rgba(${GOLD},0.85)` }}
        >
          {subtitle}
        </p>
      ) : (
        <div className="overflow-hidden mb-3">
          <motion.p
            initial={{ y: "110%" }}
            whileInView={{ y: "0%" }}
            viewport={VIEWPORT}
            transition={{
              duration: DUR.md,
              ease: EASE.out,
              delay: DUR.md * 0.3,
            }}
            className="font-medium uppercase tracking-[0.2em] text-xs"
            style={{ color: `rgba(${GOLD},0.85)` }}
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
        delayChildren={0.25}
        className="
          text-4xl md:text-5xl font-bold
          tracking-tight
          text-stone-100
        "
      />

      {/* ---------- Under-title hairline ---------- */}
      {!prefersReduced && (
        <motion.span
          aria-hidden
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={VIEWPORT}
          transition={{
            duration: DUR.md,
            ease: EASE.out,
            delay: DUR.md * 0.9,
          }}
          className={`mt-6 block h-px w-16 ${ornamentOrigin}`}
          style={{
            background: `linear-gradient(90deg, rgba(${GOLD},0.6), rgba(${TEAL},0.25), transparent)`,
          }}
        />
      )}
    </div>
  );
}

export default SectionTitle;