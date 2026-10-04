import { motion } from "framer-motion";
import { Mail, Github } from "lucide-react";

import { Reveal } from "../motion/Reveal";
import { TextReveal } from "../motion/TextReveal";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { EASE, DUR, VIEWPORT } from "../../lib/motion";

const CONTACT = {
  email: "mwauradankamau@gmail.com",
  github: "https://github.com/Star2023d",
} as const;

const GOLD = "214, 178, 110";

function Contact() {
  const prefersReduced = usePrefersReducedMotion();

  const motionProp = <T,>(value: T): T | undefined =>
    prefersReduced ? undefined : value;

  return (
    <section id="contact" aria-label="Contact" className="py-32">
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* EYEBROW */}
        <div className="overflow-hidden inline-block">
          {prefersReduced ? (
            <p className="text-primary font-semibold tracking-[0.2em] uppercase text-xs">
              Contact
            </p>
          ) : (
            <motion.p
              initial={{ y: "110%" }}
              whileInView={{ y: "0%" }}
              viewport={VIEWPORT}
              transition={{ duration: DUR.md, ease: EASE.out }}
              className="text-primary font-semibold tracking-[0.2em] uppercase text-xs"
            >
              Contact
            </motion.p>
          )}
        </div>

        {/* HEADLINE */}
        <TextReveal
          as="h2"
          text="Let's engineer a high-impact solution."
          stagger={0.06}
          delayChildren={0.2}
          className="mt-6 text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-stone-100"
        />

        {/* Gold hairline ornament — matches SectionTitle */}
        <motion.span
          aria-hidden
          initial={prefersReduced ? false : { scaleX: 0 }}
          whileInView={prefersReduced ? undefined : { scaleX: 1 }}
          viewport={VIEWPORT}
          transition={{
            duration: DUR.md,
            ease: EASE.out,
            delay: DUR.md * 0.9,
          }}
          className="mx-auto mt-8 block h-px w-16 origin-center"
          style={{ background: `rgba(${GOLD},0.55)` }}
        />

        {/* SUBTITLE */}
        <Reveal variant="fadeUp" delay={0.6}>
          <p className="mt-8 text-stone-400 text-lg leading-relaxed">
            Available for freelance projects, remote opportunities
            and AI-focused collaborations.
          </p>
        </Reveal>

        {/* CTAs */}
        <Reveal variant="fadeUp" delay={0.75}>
          <div className="mt-12 flex flex-wrap justify-center gap-5">
            <motion.a
              href={`mailto:${CONTACT.email}`}
              whileHover={motionProp({
                scale: 1.02,
                y: -2,
                boxShadow: `0 18px 40px -20px rgba(${GOLD},0.45)`,
              })}
              whileTap={motionProp({ scale: 0.98 })}
              transition={{ duration: DUR.sm, ease: EASE.out }}
              className="
                group
                inline-flex items-center gap-3
                bg-primary
                text-stone-950
                px-8 py-4
                rounded-2xl
                font-medium
                cursor-pointer
              "
            >
              <Mail
                size={18}
                aria-hidden
                className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5"
              />
              Email Me
            </motion.a>

            <motion.a
              href={CONTACT.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={motionProp({ scale: 1.02, y: -2 })}
              whileTap={motionProp({ scale: 0.98 })}
              transition={{ duration: DUR.sm, ease: EASE.out }}
              className="
                group
                inline-flex items-center gap-3
                border border-stone-700
                text-stone-200
                px-8 py-4
                rounded-2xl
                font-medium
                cursor-pointer
                transition-colors duration-300
                hover:bg-stone-900 hover:border-stone-600
              "
            >
              <Github
                size={18}
                aria-hidden
                className="transition-transform duration-300 ease-out group-hover:rotate-[8deg]"
              />
              GitHub
            </motion.a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default Contact;