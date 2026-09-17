import { motion, useScroll, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

/**
 * Ambient background glow.
 *
 * - Radial gradients instead of huge blurs (10× cheaper on GPU).
 * - Scroll-linked parallax drift adds depth without cost.
 * - Fixed positioned, decorative, hidden from assistive tech.
 * - Respects prefers-reduced-motion via static transform ranges.
 */
function BackgroundGlow() {
  const prefersReduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll();

  // All three transforms always return a MotionValue<number>.
  // When the user prefers reduced motion, the range collapses to a
  // constant — same type, same API, zero motion.
  const yTop = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReduced ? [0, 0] : [0, 260]
  );

  const yBottom = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReduced ? [0, 0] : [0, -200]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.6, 1],
    prefersReduced ? [1, 1, 1] : [1, 0.8, 0.45]
  );

  return (
    <motion.div
      aria-hidden
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      style={{ opacity }}
      initial={false}
    >
      {/* Top-left purple aura */}
      <motion.div
        style={{ y: yTop }}
        className="absolute -top-[200px] -left-[200px] w-[700px] h-[700px] rounded-full"
        initial={false}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(124,58,237,0.22) 0%, rgba(124,58,237,0.08) 40%, rgba(124,58,237,0) 70%)",
          }}
        />
      </motion.div>

      {/* Bottom-right blue aura */}
      <motion.div
        style={{ y: yBottom }}
        className="absolute -bottom-[250px] -right-[200px] w-[700px] h-[700px] rounded-full"
        initial={false}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(59,130,246,0.16) 0%, rgba(59,130,246,0.05) 40%, rgba(59,130,246,0) 70%)",
          }}
        />
      </motion.div>
    </motion.div>
  );
}

export default BackgroundGlow;