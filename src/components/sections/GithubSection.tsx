import { motion } from "framer-motion";
import { Github, ArrowUpRight } from "lucide-react";

import { Reveal } from "../motion/Reveal";
import { TextReveal } from "../motion/TextReveal";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { EASE, DUR } from "../../lib/motion";

const GITHUB_URL = "https://github.com/js-muc";

function GithubSection() {
  const prefersReduced = usePrefersReducedMotion();

  const motionProp = <T,>(value: T): T | undefined =>
    prefersReduced ? undefined : value;

  return (
    <section id="github" aria-label="GitHub" className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        {/* Whole card reveals as a unit — scale-in for "flagship" feel */}
        <Reveal variant="fadeUpLarge">
          <div
            className="
              group
              border border-slate-800
              hover:border-primary/50
              rounded-[40px]
              p-10 md:p-16
              bg-gradient-to-br from-slate-900 to-primary/10
              transition-colors duration-500
            "
          >
            {/* Icon — reveals after card */}
            <Reveal variant="fadeIn" delay={0.15}>
              <Github size={40} aria-hidden className="text-primary" />
            </Reveal>

            {/* Heading — word-by-word */}
            <TextReveal
              as="h2"
              text="Explore my engineering work on GitHub."
              stagger={0.06}
              delayChildren={0.25}
              className="mt-8 text-4xl md:text-5xl font-bold leading-tight"
            />

            {/* Copy — fades after heading */}
            <Reveal variant="fadeUp" delay={0.55}>
              <p className="mt-6 text-slate-400 text-lg leading-relaxed max-w-2xl">
                Production systems, AI projects, SaaS platforms, backend
                APIs and experimental LLM workflows.
              </p>
            </Reveal>

            {/* CTA — arrow slides on group hover */}
            <Reveal variant="fadeUp" delay={0.7}>
              <motion.a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={motionProp({ scale: 1.03, y: -2 })}
                whileTap={motionProp({ scale: 0.98 })}
                transition={{ duration: DUR.sm, ease: EASE.out }}
                className="
                  inline-flex items-center gap-3
                  mt-10
                  bg-primary
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
        </Reveal>
      </div>
    </section>
  );
}

export default GithubSection;