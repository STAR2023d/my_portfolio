import { motion } from "framer-motion";
import SectionTitle from "../ui/SectionTitle";

function AISection() {
  return (
    <section id="ai" className="py-24">
      <div className="max-w-7xl mx-auto px-6">

        <SectionTitle
          title="AI Engineering"
          subtitle="LLM Systems"
        />

        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-10
          "
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="
              border border-slate-800
              rounded-3xl
              p-10
              bg-slate-900/40
            "
          >
            <h3 className="text-3xl font-bold">
              RAG & LLM Systems
            </h3>

            <p className="mt-6 text-slate-400 leading-relaxed">
              Building intelligent systems using LangChain,
              OpenAI APIs, embeddings, vector databases and
              reasoning pipelines.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {[
                "LangChain",
                "OpenAI",
                "FAISS",
                "RAG Pipelines",
                "Agentic AI",
                "Fine-Tuning",
              ].map((item) => (
                <span
                  key={item}
                  className="
                    px-4 py-2
                    rounded-full
                    bg-slate-800
                    text-slate-300
                    text-sm
                  "
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="
              border border-slate-800
              rounded-3xl
              p-10
              bg-gradient-to-br
              from-primary/20
              to-slate-900
            "
          >
            <p className="text-primary font-semibold">
              CURRENT FOCUS
            </p>

            <h3 className="mt-4 text-4xl font-bold leading-tight">
              Agentic AI,
              reasoning systems
              and scalable
              AI infrastructure.
            </h3>

            <p className="mt-6 text-slate-300 leading-relaxed">
              Currently exploring autonomous agents,
              advanced RAG architectures and LLM
              fine-tuning workflows for production systems.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AISection;