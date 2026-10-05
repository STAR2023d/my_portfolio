import { motion, useScroll, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

/**
 * Ambient background glow — classic palette.
 *
 * Palette:
 *   - Champagne gold (top-left)   — warm, library-lamp warmth
 *   - Deep teal (bottom-right)    — cool counterweight, museum wall
 *   - Muted rose (mid-right)      — a soft third note for depth
 *
 * Same technique as before:
 *   - Radial gradients (cheap on GPU, no filter: blur)
 *   - Scroll-linked parallax drift
 *   - Fixed, decorative, hidden from assistive tech
 *   - Collapses to a static layer under prefers-reduced-motion
 */
function BackgroundGlow() {
  const prefersReduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll();

  // Gentle, slow drift — smaller ranges than the neon version,
  // so the motion reads as "calm" rather than "animated".
  const yGold = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReduced ? [0, 0] : [0, 180]
  );

  const yTeal = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReduced ? [0, 0] : [0, -140]
  );

  const yRose = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReduced ? [0, 0] : [0, 90]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.6, 1],
    prefersReduced ? [1, 1, 1] : [1, 0.85, 0.55]
  );

  return (
    <motion.div
      aria-hidden
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      style={{ opacity }}
      initial={false}
    >
      {/* Top-left — champagne gold */}
      <motion.div
        style={{ y: yGold }}
        className="absolute -top-[200px] -left-[200px] w-[720px] h-[720px] rounded-full"
        initial={false}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(214,178,110,0.20) 0%, rgba(214,178,110,0.07) 40%, rgba(214,178,110,0) 70%)",
          }}
        />
      </motion.div>

      {/* Bottom-right — deep teal */}
      <motion.div
        style={{ y: yTeal }}
        className="absolute -bottom-[250px] -right-[200px] w-[720px] h-[720px] rounded-full"
        initial={false}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(56,120,118,0.18) 0%, rgba(56,120,118,0.06) 40%, rgba(56,120,118,0) 70%)",
          }}
        />
      </motion.div>

      {/* Mid-right — muted rose, the quiet third note */}
      <motion.div
        style={{ y: yRose }}
        className="absolute top-[30%] -right-[280px] w-[560px] h-[560px] rounded-full"
        initial={false}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(178,116,110,0.14) 0%, rgba(178,116,110,0.05) 40%, rgba(178,116,110,0) 70%)",
          }}
        />
      </motion.div>
    </motion.div>
  );
}

export default BackgroundGlow;