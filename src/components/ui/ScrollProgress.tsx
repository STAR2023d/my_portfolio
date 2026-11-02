import { motion, useScroll, useSpring } from "framer-motion";

import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

const GOLD = "214, 178, 110";
const TEAL = "56, 120, 118";

/** Thin gold → teal bar at the very top that fills as the page scrolls. */
function ScrollProgress() {
  const prefersReduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{
        scaleX: prefersReduced ? scrollYProgress : smooth,
        background: `linear-gradient(90deg, rgb(${GOLD}), rgb(${TEAL}))`,
      }}
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[60] pointer-events-none"
    />
  );
}

export default ScrollProgress;