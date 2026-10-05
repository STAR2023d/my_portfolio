import { motion } from "framer-motion";
import { Github, ArrowUpRight } from "lucide-react";

import { Reveal } from "../motion/Reveal";
import { TextReveal } from "../motion/TextReveal";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { EASE, DUR } from "../../lib/motion";

const GITHUB_URL = "https://github.com/Star2023d";
const GOLD = "214, 178, 110";
const TEAL = "56, 120, 118";

function GithubSection() {
  const prefersReduced = usePrefersReducedMotion();

  const motionProp = <T,>(value: T): T | undefined =>
    prefersReduced ? undefined : value;

  return (
    <section id="github" aria-label="GitHub" className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <Reveal variant="fadeUpLarge">
          <div
            className="
              group
              relative
              border border-stone-800
              hover:border-[#d6b26e]/40
              rounded-[40px]
              p-10 md:p-16
              bg-stone-900/50
              transition-colors duration-500
            "
          >
            {/* Warm gradient wash — replaces from-slate-900 to-primary/10 */}
            <div
              aria-hidden
              className="absolute inset-0 rounded-[40px] pointer-events-none"
              style={{
                background: `linear-gradient(135deg, rgba(${GOLD},0.08) 0%, rgba(${TEAL},0.04) 45%, transparent 75%)`,
              }}
            />

            <div className="relative z-10">
              <Reveal variant="fadeIn" delay={0.15}>
                <Github size={40} aria-hidden className="text-primary" />
              </Reveal>

              <TextReveal
                as="h2"
                text="Explore my engineering work on GitHub."
                stagger={0.06}
                delayChildren={0.25}
                className="mt-8 text-4xl md:text-5xl font-bold leading-[1.05] tracking-tight text-stone-100"
              />

              <Reveal variant="fadeUp" delay={0.55}>
                <p className="mt-6 text-stone-400 text-lg leading-relaxed max-w-2xl">
                  Production systems, AI projects, SaaS platforms, backend
                  APIs and experimental LLM workflows.
                </p>
              </Reveal>

              <Reveal variant="fadeUp" delay={0.7}>
                <motion.a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={motionProp({
                    scale: 1.02,
                    y: -2,
                    boxShadow: `0 18px 40px -20px rgba(${GOLD},0.45)`,
                  })}
                  whileTap={motionProp({ scale: 0.98 })}
                  transition={{ duration: DUR.sm, ease: EASE.out }}
                  className="
                    inline-flex items-center gap-3
                    mt-10
                    bg-primary
                    text-stone-950
                    px-8 py-4
                    rounded-2xl
                    font-medium
                    cursor-pointer
                  "
                >
                  Visit GitHub
                  <ArrowUpRight
                    size={18}
                    aria-hidden
                    className="transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-0.5"
                  />
                </motion.a>
              </Reveal>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default GithubSection;