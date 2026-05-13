import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";

function Hero() {
  return (
    <section className="
               min-h-screen
               flex
               items-center
               relative
               pt-32
               pb-20
           ">
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="
            inline-flex
            items-center
            gap-3
            px-4
            py-2
            rounded-full
            border
            border-primary/30
            bg-primary/10
            text-primary
            text-sm
            mb-8
          "
        >
          <span className="w-2 h-2 rounded-full bg-primary" />

          Available for remote opportunities
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="
            text-5xl
            sm:text-6xl
            md:text-7xl
            lg:text-8xl
            font-bold
            leading-[0.95]
            max-w-6xl
          "
        >
          Building scalable SaaS systems,
          AI-powered applications and
          modern business platforms.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="
            mt-10
            text-lg
            md:text-xl
            text-slate-400
            leading-relaxed
            max-w-3xl
          "
        >
          Full Stack Developer and AI Engineer from Nairobi, Kenya,
          specialising in SaaS platforms, RAG systems, LLM pipelines
          and production-grade web applications.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="
            mt-12
            flex
            flex-wrap
            gap-5
          "
        >
          <a
            href="#projects"
            className="
              bg-primary
              px-8
              py-4
              rounded-2xl
              font-medium
              flex
              items-center
              gap-3
              hover:scale-[1.02]
              transition
            "
          >
            View Projects

            <ArrowRight size={18} />
          </a>

          <a
            href="/resume.pdf"
            className="
              border
              border-slate-700
              px-8
              py-4
              rounded-2xl
              font-medium
              flex
              items-center
              gap-3
              hover:bg-slate-900
              transition
            "
          >
            Download CV

            <Download size={18} />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="
            mt-20
            flex
            flex-wrap
            gap-10
            text-slate-400
          "
        >
          <div>
            <h3 className="text-4xl font-bold text-white">
              3+
            </h3>

            <p className="mt-2">
              Years Experience
            </p>
          </div>

          <div>
            <h3 className="text-4xl font-bold text-white">
              10+
            </h3>

            <p className="mt-2">
              Systems Built
            </p>
          </div>

          <div>
            <h3 className="text-4xl font-bold text-white">
              AI
            </h3>

            <p className="mt-2">
              RAG & LLM Focus
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;