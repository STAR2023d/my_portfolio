/**
 * Tech stack, organized into categories.
 *
 * Why categories?
 *   A flat list of 20 techs reads as a word salad. Categorized,
 *   a recruiter can instantly answer "do they know backend?" and
 *   "do they work with AI?" — without reading every item.
 *
 * The `icon` field is a slug (e.g. "react", "typescript") that
 * the TechStack UI component can later map to an SVG. If it's
 * absent, the UI just renders the name.
 */

export type Tech = {
  name: string;
  /** Optional slug for icon lookup (e.g. "react", "typescript"). */
  icon?: string;
};

export type TechCategory = {
  /** Human-readable category label. */
  label: string;
  /** Items in this category, in display order. */
  items: Tech[];
};

export const techCategories: TechCategory[] = [
  {
    label: "Frontend",
    items: [
      { name: "React", icon: "react" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Next.js", icon: "nextdotjs" },
      { name: "Angular", icon: "angular" },
      { name: "TailwindCSS", icon: "tailwindcss" },
      { name: "Framer Motion", icon: "framer" },
    ],
  },
  {
    label: "Backend",
    items: [
      { name: "Node.js", icon: "nodedotjs" },
      { name: "ExpressJS", icon: "express" },
      { name: "REST APIs" },
      { name: "MongoDB", icon: "mongodb" },
      { name: "API Integration" },
    ],
  },
  {
    label: "AI / LLM",
    items: [
      { name: "LangChain", icon: "langchain" },
      { name: "OpenAI", icon: "openai" },
      { name: "RAG Pipelines" },
      { name: "LLM Prompt Engineering" },
      { name: "AI Agents" },
    ],
  },
  {
    label: "Tooling & Infra",
    items: [
      { name: "Docker", icon: "docker" },
      { name: "GitHub", icon: "github" },
      { name: "Vercel", icon: "vercel" },
      { name: "Python", icon: "python" },
    ],
  },
];

/**
 * Flat list of all tech names, kept for backward compatibility.
 * Anything still importing { techStack } will keep working.
 *
 * New code should import { techCategories } instead.
 */
export const techStack: string[] = techCategories.flatMap((c) =>
  c.items.map((t) => t.name)
);