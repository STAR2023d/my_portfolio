export type ExperienceEntry = {
  /** Date range displayed prominently. */
  date: string;
  /** Role or title. */
  role: string;
  /** Description paragraph. */
  description: string;
  /** Whether this is the current role (adds pulse to the dot). */
  current?: boolean;
};

export const experience: ExperienceEntry[] = [
  {
    date: "2023 — Present",
    role: "Freelance Full Stack Developer & AI Engineer",
    description:
      "Building full stack applications, AI-powered systems and scalable SaaS products for clients and independent projects.",
    current: true,
  },
  {
    date: "AI & LLM Engineering",
    role: "RAG Pipelines & Agentic AI",
    description:
      "Developing intelligent document systems, reasoning pipelines and production-ready LLM workflows using LangChain and OpenAI APIs.",
  },
];