import { motion } from "framer-motion";
import { Mail, Github } from "lucide-react";

import { Reveal } from "../motion/Reveal";
import { TextReveal } from "../motion/TextReveal";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { EASE, DUR, VIEWPORT } from "../../lib/motion";

// ============================================================
// CONTACT LINKS
// Centralized so they can't drift out of sync.
// ============================================================
const CONTACT = {
  email: "mwauradankamau@gmail.com",
  github: "https://github.com/Star2023d",
} as const;

function Contact() {
  const prefersReduced = usePrefersReducedMotion();

  const motionProp = <T,>(value: T): T | undefined =>
    prefersReduced ? undefined : value;

  return (
    <section
      id="contact"
      aria-label="Contact"
      className="py-32"
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* ------------------------------------------------------------
            EYEBROW — mask wipe from bottom
            ------------------------------------------------------------ */}
        <div className="overflow-hidden inline-block">
          {prefersReduced ? (
            <p className="text-primary font-semibold tracking-widest uppercase text-sm">
              Contact
            </p>
          ) : (
            <motion.p
              initial={{ y: "110%" }}
              whileInView={{ y: "0%" }}
              viewport={VIEWPORT}
              transition={{ duration: DUR.md, ease: EASE.out }}
              className="text-primary font-semibold tracking-widest uppercase text-sm"
            >
              Contact
            </motion.p>
          )}
        </div>

        {/* ------------------------------------------------------------
            HEADLINE — word-by-word reveal
            ------------------------------------------------------------ */}
        <TextReveal
          as="h2"
          text="Let’s engineer a high-impact solution."
          stagger={0.06}
          delayChildren={0.15}
          className="mt-6 text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
        />

        {/* ------------------------------------------------------------
            SUBTITLE — fades in after headline
            ------------------------------------------------------------ */}
        <Reveal variant="fadeUp" delay={0.55}>
          <p className="mt-8 text-slate-400 text-lg leading-relaxed">
            Available for freelance projects, remote opportunities
            and AI-focused collaborations.
          </p>
        </Reveal>

        {/* ------------------------------------------------------------
            CTA BUTTONS — stagger in
            ------------------------------------------------------------ */}
        <Reveal variant="fadeUp" delay={0.7}>
          <div className="mt-12 flex flex-wrap justify-center gap-5">
            {/* Email CTA — primary */}
            <motion.a
              href={`mailto:${CONTACT.email}`}
              whileHover={motionProp({ scale: 1.03, y: -2 })}
              whileTap={motionProp({ scale: 0.98 })}
              transition={{ duration: DUR.sm, ease: EASE.out }}
              className="
                group
                inline-flex items-center gap-3
                bg-primary
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

            {/* GitHub CTA — secondary */}
            <motion.a
              href={CONTACT.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={motionProp({ scale: 1.03, y: -2 })}
              whileTap={motionProp({ scale: 0.98 })}
              transition={{ duration: DUR.sm, ease: EASE.out }}
              className="
                group
                inline-flex items-center gap-3
                border border-slate-700
                px-8 py-4
                rounded-2xl
                font-medium
                cursor-pointer
                transition-colors duration-300
                hover:bg-slate-900 hover:border-slate-600
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