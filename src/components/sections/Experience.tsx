import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import SectionTitle from "../ui/SectionTitle";
import { TextReveal } from "../motion/TextReveal";
import { Reveal } from "../motion/Reveal";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { experience, type ExperienceEntry } from "../../data/experience";
import { VIEWPORT, EASE } from "../../lib/motion";

/**
 * Experience section — scroll-linked timeline.
 *
 * Signature behaviour:
 * - A purple line is "drawn" downward as the user scrolls through the
 *   section, using Framer's useScroll + useTransform.
 * - Each entry reveals on view: dot pops in (spring), date fades,
 *   role reveals word-by-word, description fades.
 * - The current role's dot has a pulsing ring.
 * - Everything respects prefers-reduced-motion.
 */
function Experience() {
  const prefersReduced = usePrefersReducedMotion();
  const timelineRef = useRef<HTMLDivElement>(null);

  // Track scroll progress within the timeline container.
  // 0.0 = container top reaches viewport center
  // 1.0 = container bottom reaches viewport center
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"],
  });

  // Map scroll progress to a 0–1 scale for the drawn line.
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" aria-label="Experience" className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <SectionTitle title="Experience" subtitle="Career" />

        <div ref={timelineRef} className="relative">
          {/* ==========================================================
              STATIC BASE LINE — always present, defines the structure.
              ========================================================== */}
          <div
            aria-hidden
            className="absolute left-0 top-0 bottom-0 w-px bg-slate-800"
          />

          {/* ==========================================================
              ANIMATED DRAW LINE — grows via scaleY as you scroll.
              ========================================================== */}
          {!prefersReduced && (
            <motion.div
              aria-hidden
              className="
                absolute left-0 top-0 bottom-0 w-px
                origin-top
                bg-gradient-to-b from-primary via-primary to-primary/40
              "
              style={{ scaleY: lineScale }}
            />
          )}

          {/* ==========================================================
              ENTRIES
              ========================================================== */}
          <div className="space-y-14">
            {experience.map((entry) => (
              <Entry key={entry.role} entry={entry} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// ENTRY — one item in the timeline
// ============================================================
type EntryProps = { entry: ExperienceEntry };

function Entry({ entry }: EntryProps) {
  const prefersReduced = usePrefersReducedMotion();

  return (
    <div className="relative pl-10">
      {/* ----------------------------------------------------------
          DOT MARKER — centered on the timeline line.
          Uses ring-4 in the page bg color to mask the line behind
          so the dot appears to sit cleanly on top.
          ---------------------------------------------------------- */}
      <motion.div
        aria-hidden
        initial={
          prefersReduced ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }
        }
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={VIEWPORT}
        transition={{
          type: "spring",
          stiffness: 320,
          damping: 22,
          delay: 0.15,
        }}
        className="
          absolute left-[-8px] top-2
          flex items-center justify-center
          w-4 h-4 rounded-full
          bg-primary
          ring-4 ring-[#0B0F19]
        "
      >
        {/* Pulsing ring for the current entry only */}
        {entry.current && !prefersReduced && (
          <span
            aria-hidden
            className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping"
          />
        )}
      </motion.div>

      {/* ----------------------------------------------------------
          DATE
          ---------------------------------------------------------- */}
      <Reveal variant="fadeUp" delay={0.2}>
        <time className="text-primary font-medium text-sm tracking-wide">
          {entry.date}
        </time>
      </Reveal>

      {/* ----------------------------------------------------------
          ROLE — word-by-word reveal
          ---------------------------------------------------------- */}
      <TextReveal
        as="h3"
        text={entry.role}
        stagger={0.05}
        delayChildren={0.3}
        className="text-2xl font-bold mt-2"
      />

      {/* ----------------------------------------------------------
          DESCRIPTION
          ---------------------------------------------------------- */}
      <Reveal variant="fadeUp" delay={0.55}>
        <p className="mt-4 text-slate-400 leading-relaxed">
          {entry.description}
        </p>
      </Reveal>
    </div>
  );
}

export default Experience;