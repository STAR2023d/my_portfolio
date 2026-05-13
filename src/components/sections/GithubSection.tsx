import { Github } from "lucide-react";

function GithubSection() {
  return (
    <section className="py-24">
      <div className="max-w-5xl mx-auto px-6">

        <div
          className="
            border
            border-slate-800
            rounded-[40px]
            p-10
            md:p-16
            bg-gradient-to-br
            from-slate-900
            to-primary/10
          "
        >
          <Github size={40} className="text-primary" />

          <h2 className="mt-8 text-4xl md:text-5xl font-bold leading-tight">
            Explore my engineering work on GitHub.
          </h2>

          <p className="mt-6 text-slate-400 text-lg leading-relaxed max-w-2xl">
            Production systems, AI projects, SaaS platforms,
            backend APIs and experimental LLM workflows.
          </p>

          <a
            href="https://github.com/js-muc"
            target="_blank"
            className="
              inline-flex
              mt-10
              bg-primary
              px-8
              py-4
              rounded-2xl
              font-medium
              hover:opacity-90
              transition
            "
          >
            Visit GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

export default GithubSection;