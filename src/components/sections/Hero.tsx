import { motion } from "framer-motion";
import { ArrowRight, Download, ChevronDown } from "lucide-react";

import { TextReveal } from "../motion/TextReveal";
import { CountUp } from "../motion/CountUp";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { scrollToId } from "../../lib/scroll";
import { EASE, DUR, STAGGER } from "../../lib/motion";

const GOLD = "214, 178, 110";
const ROSE = "178, 116, 110";

/** Slightly stretched timeline — chill, not rushed. */
const TIMELINE = {
  badge: 0,
  headline: 0.2,
  subtitle: 1.05,
  ctas: 1.35,
  stats: 1.7,
  image: 0.45,
  glow: 0.7,
  scrollHint: 2.6,
} as const;

function Hero() {
  const prefersReduced = usePrefersReducedMotion();

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
          {/* LEFT COLUMN */}
          <div>
            {/* BADGE */}
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
              <span className="relative flex w-2 h-2" aria-hidden>
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full w-2 h-2 bg-primary" />
              </span>
              Available for remote opportunities
            </motion.div>

            {/* HEADLINE */}
            <TextReveal
              as="h1"
              text="Building scalable SaaS systems, AI-powered applications and modern business platforms."
              stagger={STAGGER.tight}
              delayChildren={TIMELINE.headline}
              className="
                text-5xl sm:text-6xl md:text-7xl font-bold leading-[0.98] tracking-tight
                text-stone-100
              "
            />

            {/* SUBTITLE */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: DUR.md,
                ease: EASE.out,
                delay: TIMELINE.subtitle,
              }}
              className="mt-10 text-lg md:text-xl text-stone-400 leading-relaxed max-w-2xl"
            >
              Full Stack &amp; AI Engineer · Nairobi, Kenya — specializing
              in production-ready SaaS platforms, scalable LLM pipelines,
              and advanced RAG architectures.
            </motion.p>

            {/* CTAs */}
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
              <motion.a
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: DUR.sm, ease: EASE.out },
                  },
                }}
                whileHover={motionProp({
                  scale: 1.02,
                  y: -2,
                  boxShadow: `0 18px 40px -20px rgba(${GOLD},0.45)`,
                })}
                whileTap={motionProp({ scale: 0.98 })}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId("projects", { prefersReduced });
                }}
                href="#projects"
                className="
                  group
                  bg-primary text-stone-950
                  px-8 py-4 rounded-2xl font-medium
                  flex items-center gap-3 cursor-pointer
                "
              >
                View Projects
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 ease-out group-hover:translate-x-1"
                />
              </motion.a>

              <motion.a
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: DUR.sm, ease: EASE.out },
                  },
                }}
                whileHover={motionProp({ scale: 1.02, y: -2 })}
                whileTap={motionProp({ scale: 0.98 })}
                href="/Dan_Resume.pdf"
                download
                className="
                  group
                  border border-stone-700 text-stone-200
                  px-8 py-4 rounded-2xl font-medium
                  flex items-center gap-3
                  hover:bg-stone-900 hover:border-stone-600
                  transition-colors
                "
              >
                Download CV
                <Download
                  size={18}
                  className="transition-transform duration-300 ease-out group-hover:translate-y-0.5"
                />
              </motion.a>
            </motion.div>

            {/* STATS */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: DUR.md,
                ease: EASE.out,
                delay: TIMELINE.stats,
              }}
              className="mt-20 flex flex-wrap gap-10 text-stone-500"
            >
              <div>
                <h3 className="text-4xl font-bold text-stone-100">
                  <CountUp to={3} suffix="+" duration={1.2} />
                </h3>
                <p className="mt-2">Years Experience</p>
              </div>

              <div>
                <h3 className="text-4xl font-bold text-stone-100">
                  <CountUp to={10} suffix="+" duration={1.2} />
                </h3>
                <p className="mt-2">Systems Built</p>
              </div>

              <div>
                <h3 className="text-4xl font-bold text-stone-100">AI</h3>
                <p className="mt-2">RAG &amp; LLM Focus</p>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN — image + warm glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: DUR.lg,
              ease: EASE.out,
              delay: TIMELINE.image,
            }}
            className="relative flex justify-center"
          >
            {/* Warm glow — gold core → rose falloff, matches BackgroundGlow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: DUR.xl,
                ease: EASE.out,
                delay: TIMELINE.glow,
              }}
              aria-hidden
              className="absolute w-[460px] h-[460px] rounded-full pointer-events-none"
              style={{
                background: `radial-gradient(circle, rgba(${GOLD},0.28) 0%, rgba(${GOLD},0.10) 35%, rgba(${ROSE},0.05) 55%, transparent 75%)`,
              }}
            />

            <div className="relative z-10 rounded-[40px] overflow-hidden border border-stone-800 shadow-2xl max-w-md w-full">
              <img
                src="/Dan_profile_pic.png"
                alt="Dan Kamau Mwaura — Full Stack Developer and AI Engineer"
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover"
              />
              {/* Warm wash so the photo doesn't fight the palette */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `linear-gradient(180deg, rgba(20,18,15,0) 55%, rgba(20,18,15,0.35) 100%), radial-gradient(circle at 25% 15%, rgba(${GOLD},0.10), transparent 55%)`,
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* SCROLL HINT */}
        <motion.button
          type="button"
          onClick={() => scrollToId("tech", { prefersReduced })}
          aria-label="Scroll to next section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: DUR.md, delay: TIMELINE.scrollHint }}
          className="absolute left-1/2 -translate-x-1/2 bottom-6 text-stone-500 hover:text-primary transition-colors cursor-pointer hidden md:block"
        >
          <motion.div
            animate={motionProp({ y: [0, 6, 0] })}
            transition={{
              duration: 2.2,
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