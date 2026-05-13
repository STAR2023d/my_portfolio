import { motion } from "framer-motion";
import { techStack } from "../../data/techstack";
import SectionTitle from "../ui/SectionTitle";

function TechStack() {
  return (
    <section id="tech" className="py-24">
      <div className="max-w-7xl mx-auto px-6">

        <SectionTitle
          title="Tech Stack"
          subtitle="Technologies"
        />

        <div className="flex flex-wrap gap-4">
          {techStack.map((tech, index) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              className="
                px-6 py-3 rounded-2xl
                border border-slate-800
                bg-slate-900/40
                text-slate-300
                hover:border-primary
                hover:text-white
                transition
              "
            >
              {tech}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TechStack;