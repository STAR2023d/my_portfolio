import { motion } from "framer-motion";
import { ArrowRight, Download, ChevronDown } from "lucide-react";

import { TextReveal } from "../motion/TextReveal";
import { CountUp } from "../motion/CountUp";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { scrollToId } from "../../lib/scroll";
import { EASE, DUR, STAGGER } from "../../lib/motion";

/**
 * Hero choreography timeline (in seconds, relative to mount).
 *
 * Extracted so the full sequence is readable at a glance. Change
 * one value here and the whole sequence re-times coherently.
 */
const TIMELINE = {
  badge: 0,
  headline: 0.15,
  subtitle: 0.9, // after headline's last words land
  ctas: 1.15,
  stats: 1.4,
  image: 0.4,
  glow: 0.6,
  scrollHint: 2.2,
} as const;

function Hero() {
  const prefersReduced = usePrefersReducedMotion();

  /** Wrap hover/tap targets — return undefined when reduced motion. */
  const motionProp = <T,>(value: T): T | undefined =>
    prefersReduced ? undefined : value;

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="min-h-screen flex items-center relative pt-32 pb-20"
    >
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* ============================================================
              LEFT COLUMN — Choreographed text sequence
              ============================================================ */}
          <div>
            {/* 1. BADGE — fade+rise, then pulse the dot */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: DUR.md,
                ease: EASE.out,
                delay: TIMELINE.badge,
              }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm mb-8"
            >
              {/* Pulsing availability dot */}
              <span className="relative flex w-2 h-2" aria-hidden>
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full w-2 h-2 bg-primary" />
              </span>
              Available for remote opportunities
            </motion.div>

            {/* 2. HEADLINE — word-by-word mask reveal */}
            <TextReveal
              as="h1"
              text="Building scalable SaaS systems, AI-powered applications and modern business platforms."
              stagger={STAGGER.tight}
              delayChildren={TIMELINE.headline}
              className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[0.95]"
            />

            {/* 3. SUBTITLE — fades up after headline finishes */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: DUR.md,
                ease: EASE.out,
                delay: TIMELINE.subtitle,
              }}
              className="mt-10 text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl"
            >
              Full Stack Developer and AI Engineer from Nairobi, Kenya,
              specialising in SaaS platforms, RAG systems, LLM pipelines
              and production-grade web applications.
            </motion.p>

            {/* 4. CTA BUTTONS — stagger in after subtitle */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: TIMELINE.ctas,
                  },
                },
              }}
              className="mt-12 flex flex-wrap gap-5"
            >
              {/* Primary CTA */}
              <motion.a
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: DUR.sm, ease: EASE.out },
                  },
                }}
                whileHover={motionProp({ scale: 1.03, y: -2 })}
                whileTap={motionProp({ scale: 0.98 })}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId("projects", { prefersReduced });
                }}
                href="#projects"
                className="bg-primary px-8 py-4 rounded-2xl font-medium flex items-center gap-3 cursor-pointer"
              >
                View Projects
                <ArrowRight size={18} />
              </motion.a>

              {/* Secondary CTA */}
              <motion.a
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: DUR.sm, ease: EASE.out },
                  },
                }}
                whileHover={motionProp({ scale: 1.03, y: -2 })}
                whileTap={motionProp({ scale: 0.98 })}
                href="/resume.pdf"
                download
                className="border border-slate-700 px-8 py-4 rounded-2xl font-medium flex items-center gap-3 hover:bg-slate-900 transition-colors"
              >
                Download CV
                <Download size={18} />
              </motion.a>
            </motion.div>

            {/* 5. STATS — fade in, then numbers count up */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: DUR.md,
                ease: EASE.out,
                delay: TIMELINE.stats,
              }}
              className="mt-20 flex flex-wrap gap-10 text-slate-400"
            >
              <div>
                <h3 className="text-4xl font-bold text-white">
                  <CountUp to={3} suffix="+" duration={1.2} />
                </h3>
                <p className="mt-2">Years Experience</p>
              </div>

              <div>
                <h3 className="text-4xl font-bold text-white">
                  <CountUp to={10} suffix="+" duration={1.2} />
                </h3>
                <p className="mt-2">Systems Built</p>
              </div>

              <div>
                <h3 className="text-4xl font-bold text-white">AI</h3>
                <p className="mt-2">RAG &amp; LLM Focus</p>
              </div>
            </motion.div>
          </div>

          {/* ============================================================
              RIGHT COLUMN — Image + animated glow
              ============================================================ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: DUR.lg,
              ease: EASE.out,
              delay: TIMELINE.image,
            }}
            className="relative flex justify-center"
          >
            {/* Glow — radial gradient, ~10× cheaper than blur */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: DUR.xl,
                ease: EASE.out,
                delay: TIMELINE.glow,
              }}
              aria-hidden
              className="absolute w-[420px] h-[420px] rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(124,58,237,0.35) 0%, rgba(124,58,237,0.12) 40%, transparent 70%)",
              }}
            />

            {/* Image frame */}
            <div className="relative z-10 rounded-[40px] overflow-hidden border border-slate-800 shadow-2xl max-w-md w-full">
              <img
                src="/profile.jpeg"
                alt="Jesee Muchoki — Full Stack Developer and AI Engineer"
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>

        {/* ============================================================
            SCROLL HINT — animated chevron
            ============================================================ */}
        <motion.button
          type="button"
          onClick={() => scrollToId("tech", { prefersReduced })}
          aria-label="Scroll to next section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: DUR.md, delay: TIMELINE.scrollHint }}
          className="absolute left-1/2 -translate-x-1/2 bottom-6 text-slate-500 hover:text-primary transition-colors cursor-pointer hidden md:block"
        >
          <motion.div
            animate={motionProp({ y: [0, 6, 0] })}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: EASE.inOut,
            }}
          >
            <ChevronDown size={28} />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
}

export default Hero;