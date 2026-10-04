import { motion } from "framer-motion";

import SectionTitle from "../ui/SectionTitle";
import { Reveal } from "../motion/Reveal";
import { TextReveal } from "../motion/TextReveal";
import { Stagger, StaggerItem } from "../motion/Stagger";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { EASE, DUR, VIEWPORT } from "../../lib/motion";

const GOLD = "214, 178, 110";
const TEAL = "56, 120, 118";

const RAG_TAGS = [
  "LangChain",
  "OpenAI",
  "FAISS",
  "RAG Pipelines",
  "Agentic AI",
  "Fine-Tuning",
] as const;

function AISection() {
  const prefersReduced = usePrefersReducedMotion();

  return (
    <section id="ai" aria-label="AI engineering" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle title="AI Engineering" subtitle="LLM Systems" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* LEFT CARD — RAG & LLM Systems */}
          <motion.div
            initial={
              prefersReduced ? { opacity: 0 } : { opacity: 0, x: -50 }
            }
            whileInView={
              prefersReduced ? { opacity: 1 } : { opacity: 1, x: 0 }
            }
            viewport={VIEWPORT}
            transition={{ duration: DUR.lg, ease: EASE.out }}
            className="
              border border-stone-800
              rounded-3xl
              p-10
              bg-stone-900/50
              backdrop-blur-[2px]
            "
          >
            <TextReveal
              as="h3"
              text="RAG & LLM Systems"
              stagger={0.06}
              delayChildren={0.3}
              className="text-3xl font-bold text-stone-100 tracking-tight"
            />

            <Reveal variant="fadeUp" delay={0.6}>
              <p className="mt-6 text-stone-400 leading-relaxed">
                Building intelligent systems using LangChain, OpenAI APIs,
                embeddings, vector databases and reasoning pipelines.
              </p>
            </Reveal>

            <Stagger stagger={0.05} className="mt-8 flex flex-wrap gap-3">
              {RAG_TAGS.map((tag) => (
                <StaggerItem key={tag}>
                  <span
                    className="
                      inline-block
                      px-4 py-2
                      rounded-full
                      bg-stone-800/60
                      text-stone-300
                      border border-stone-700/40
                      text-sm
                    "
                  >
                    {tag}
                  </span>
                </StaggerItem>
              ))}
            </Stagger>
          </motion.div>

          {/* RIGHT CARD — Current Focus */}
          <motion.div
            initial={
              prefersReduced ? { opacity: 0 } : { opacity: 0, x: 50 }
            }
            whileInView={
              prefersReduced ? { opacity: 1 } : { opacity: 1, x: 0 }
            }
            viewport={VIEWPORT}
            transition={{ duration: DUR.lg, ease: EASE.out, delay: 0.1 }}
            className="
              relative overflow-hidden
              border border-stone-800
              rounded-3xl
              p-10
              bg-stone-900/50
            "
          >
            {/* Warm static tint — replaces from-primary/20 gradient */}
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(135deg, rgba(${GOLD},0.10) 0%, rgba(${TEAL},0.04) 40%, transparent 70%)`,
              }}
            />

            {/* Soft pulse — gold, slower */}
            {!prefersReduced && (
              <motion.div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(600px circle at 80% 10%, rgba(${GOLD},0.10), transparent 60%)`,
                }}
                animate={{ opacity: [0.35, 0.6, 0.35] }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: EASE.inOut,
                }}
              />
            )}

            <div className="relative z-10">
              {/* Pulsing badge */}
              <div className="flex items-center gap-3">
                <span className="relative flex w-2 h-2" aria-hidden>
                  <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" />
                  <span className="relative inline-flex rounded-full w-2 h-2 bg-primary" />
                </span>
                <p className="text-primary font-semibold tracking-[0.2em] text-xs uppercase">
                  Current Focus
                </p>
              </div>

              <TextReveal
                as="h3"
                text="Agentic AI, reasoning systems and scalable AI infrastructure."
                stagger={0.05}
                delayChildren={0.3}
                className="mt-4 text-4xl font-bold leading-tight text-stone-100 tracking-tight"
              />

              <Reveal variant="fadeUp" delay={0.7}>
                <p className="mt-6 text-stone-300 leading-relaxed">
                  Currently exploring autonomous agents, advanced RAG
                  architectures and LLM fine-tuning workflows for
                  production systems.
                </p>
              </Reveal>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AISection;