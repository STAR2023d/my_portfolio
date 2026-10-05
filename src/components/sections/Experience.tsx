import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import SectionTitle from "../ui/SectionTitle";
import { TextReveal } from "../motion/TextReveal";
import { Reveal } from "../motion/Reveal";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { experience, type ExperienceEntry } from "../../data/experience";
import { VIEWPORT, EASE } from "../../lib/motion";

const GOLD = "214, 178, 110";
const TEAL = "56, 120, 118";

function Experience() {
  const prefersReduced = usePrefersReducedMotion();
  const timelineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"],
  });

  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" aria-label="Experience" className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <SectionTitle title="Experience" subtitle="Career" />

        <div ref={timelineRef} className="relative">
          {/* BASE LINE */}
          <div
            aria-hidden
            className="absolute left-0 top-0 bottom-0 w-px bg-stone-800"
          />

          {/* ANIMATED DRAW LINE — gold → teal → transparent */}
          {!prefersReduced && (
            <motion.div
              aria-hidden
              className="absolute left-0 top-0 bottom-0 w-px origin-top"
              style={{
                scaleY: lineScale,
                background: `linear-gradient(180deg, rgba(${GOLD},0.9) 0%, rgba(${GOLD},0.6) 40%, rgba(${TEAL},0.3) 75%, transparent 100%)`,
              }}
            />
          )}

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

type EntryProps = { entry: ExperienceEntry };

function Entry({ entry }: EntryProps) {
  const prefersReduced = usePrefersReducedMotion();

  return (
    <div className="relative pl-10">
      {/* DOT MARKER */}
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
          ring-4 ring-stone-950
        "
      >
        {entry.current && !prefersReduced && (
          <span
            aria-hidden
            className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping"
          />
        )}
      </motion.div>

      {/* DATE */}
      <Reveal variant="fadeUp" delay={0.2}>
        <time className="text-primary font-medium text-sm tracking-[0.15em] uppercase">
          {entry.date}
        </time>
      </Reveal>

      {/* ROLE */}
      <TextReveal
        as="h3"
        text={entry.role}
        stagger={0.05}
        delayChildren={0.3}
        className="text-2xl font-bold mt-2 text-stone-100 tracking-tight"
      />

      {/* DESCRIPTION */}
      <Reveal variant="fadeUp" delay={0.55}>
        <p className="mt-4 text-stone-400 leading-relaxed">
          {entry.description}
        </p>
      </Reveal>
    </div>
  );
}

export default Experience;