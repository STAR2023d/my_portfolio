import SectionTitle from "../ui/SectionTitle";

function Experience() {
  return (
    <section
      id="experience"
      className="py-24"
    >
      <div className="max-w-5xl mx-auto px-6">

        <SectionTitle
          title="Experience"
          subtitle="Career"
        />

        <div className="border-l border-slate-800 pl-8 space-y-14">

          <div>
            <p className="text-primary font-medium">
              2023 — Present
            </p>

            <h3 className="text-2xl font-bold mt-2">
              Freelance Full Stack Developer & AI Engineer
            </h3>

            <p className="mt-4 text-slate-400 leading-relaxed">
              Building full stack applications,
              AI-powered systems and scalable SaaS
              products for clients and independent projects.
            </p>
          </div>

          <div>
            <p className="text-primary font-medium">
              AI & LLM Engineering
            </p>

            <h3 className="text-2xl font-bold mt-2">
              RAG Pipelines & Agentic AI
            </h3>

            <p className="mt-4 text-slate-400 leading-relaxed">
              Developing intelligent document systems,
              reasoning pipelines and production-ready
              LLM workflows using LangChain and OpenAI APIs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experience;