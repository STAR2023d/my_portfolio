import { motion } from "framer-motion";

import SectionTitle from "../ui/SectionTitle";
import { Stagger, StaggerItem } from "../motion/Stagger";
import { TechIcon } from "../icons/TechIcon";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { techCategories } from "../../data/techstack";
import { EASE, DUR, STAGGER } from "../../lib/motion";

function TechStack() {
  const prefersReduced = usePrefersReducedMotion();

  return (
    <section id="tech" aria-label="Tech stack" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle title="Tech Stack" subtitle="Technologies" />

        {/* Categories render one after another; items within each
            category stagger in a cascade. */}
        <div className="space-y-12">
          {techCategories.map((category) => (
            <div key={category.label}>
              {/* Category label */}
              <div className="mb-5 flex items-center gap-4">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                  {category.label}
                </h3>
                <div className="flex-1 h-px bg-slate-800" />
              </div>

              {/* Items grid */}
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
                        border border-slate-800
                        bg-slate-900/40
                        text-slate-300
                        transition-colors duration-300
                        hover:border-primary/60
                        hover:bg-slate-900/70
                        hover:text-white
                      "
                    >
                      {tech.icon && (
                        <TechIcon
                          slug={tech.icon}
                          size={16}
                          className="
                            text-slate-500
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