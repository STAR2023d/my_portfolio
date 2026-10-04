import { motion } from "framer-motion";

import SectionTitle from "../ui/SectionTitle";
import { Stagger, StaggerItem } from "../motion/Stagger";
import { TechIcon } from "../icons/TechIcon";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { techCategories } from "../../data/techstack";
import { EASE, DUR, STAGGER } from "../../lib/motion";

const GOLD = "214, 178, 110";

function TechStack() {
  const prefersReduced = usePrefersReducedMotion();

  return (
    <section id="tech" aria-label="Tech stack" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle title="Tech Stack" subtitle="Technologies" />

        <div className="space-y-12">
          {techCategories.map((category) => (
            <div key={category.label}>
              {/* Category label with gold dot + hairline */}
              <div className="mb-5 flex items-center gap-4">
                <span
                  aria-hidden
                  className="block h-1.5 w-1.5 rounded-full"
                  style={{ background: `rgba(${GOLD},0.85)` }}
                />
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
                  {category.label}
                </h3>
                <div
                  className="flex-1 h-px"
                  style={{
                    background: `linear-gradient(90deg, rgba(${GOLD},0.25), rgba(120,113,108,0.15), transparent)`,
                  }}
                />
              </div>

              <Stagger
                stagger={STAGGER.tight}
                className="flex flex-wrap gap-3"
              >
                {category.items.map((tech) => (
                  <StaggerItem key={tech.name}>
                    <motion.div
                      whileHover={
                        prefersReduced
                          ? undefined
                          : {
                              y: -3,
                              transition: { duration: DUR.sm, ease: EASE.out },
                            }
                      }
                      className="
                        group
                        inline-flex items-center gap-2.5
                        px-4 py-2.5
                        rounded-xl
                        border border-stone-800
                        bg-stone-900/50
                        text-stone-300
                        transition-colors duration-300
                        hover:border-[#d6b26e]/50
                        hover:bg-stone-900/80
                        hover:text-stone-100
                      "
                    >
                      {tech.icon && (
                        <TechIcon
                          slug={tech.icon}
                          size={16}
                          className="
                            text-stone-500
                            transition-colors duration-300
                            group-hover:text-primary
                          "
                        />
                      )}
                      <span className="text-sm font-medium">
                        {tech.name}
                      </span>
                    </motion.div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TechStack;