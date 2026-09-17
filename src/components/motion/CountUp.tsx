import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { EASE, DUR } from "../../lib/motion";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

type CountUpProps = {
  /** The final number to count to. */
  to: number;
  /** Starting number. Default: 0. */
  from?: number;
  /** Duration in seconds. Default: DUR.lg. */
  duration?: number;
  /** Suffix appended after the number (e.g. "+", "k", "ms"). */
  suffix?: string;
  /** Prefix prepended (e.g. "$"). */
  prefix?: string;
  className?: string;
};

/**
 * Animates a number from `from` to `to` when scrolled into view.
 * Respects prefers-reduced-motion (jumps straight to final value).
 *
 * Usage:
 *   <CountUp to={3} suffix="+" />
 *   <CountUp to={120} prefix="$" suffix="k" />
 */
export function CountUp({
  to,
  from = 0,
  duration = DUR.lg,
  suffix = "",
  prefix = "",
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReduced = usePrefersReducedMotion();
  const [value, setValue] = useState(from);

  useEffect(() => {
    if (!isInView) return;
    if (prefersReduced) {
      setValue(to);
      return;
    }

    let raf: number;
    const start = performance.now();
    const distance = to - from;

    // Cubic ease-out to match EASE.out feel
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const tick = (now: number) => {
      const elapsed = (now - start) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOut(progress);
      setValue(Math.round(from + distance * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, from, to, duration, prefersReduced]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}