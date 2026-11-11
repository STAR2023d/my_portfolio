// Chatbot knowledge base — extracted from portfolio website content

export interface IntentConfig {
  patterns: string[];
  keywords: string[];
}

export interface ChatbotKnowledgeBase {
  profile: {
    name: string;
    roles: string[];
    location: string;
    email: string;
    github: string;
    portfolio: string;
    experience: string;
    experienceJob: {
      company: string;
      period: string;
      description: string;
    };
    summary: string;
  };
  projects: {
    scienceRagAnalyzer: { name: string; description: string; tech: string[] };
    shop: { name: string; description: string; tech: string[] };
    openSourceTutor: { name: string; description: string; tech: string[] };
  };
  techStack: { frontend: string[]; backend: string[]; database: string[]; ai: string[]; infrastructure: string[] };
  aiEngineering: { title: string; description: string; focus: string[] };
  faqs: string[];
  intents: Record<string, IntentConfig>;
  contact: {
    availableFor: string[];
    message: string;
  };
  experience: string;
  experienceJob: { company: string; period: string; description: string };
}

export const chatbotKnowledgeBase: ChatbotKnowledgeBase = {
  profile: {
    name: "Dan Kamau Mwaura",
    roles: ["Full Stack Developer", "AI Engineer", "Flutter Developer"],
    location: "Kenya",
    email: "mwauradan37@gmail.com",
    github: "https://github.com/STAR2023d",
    portfolio: "https://dan-kamau-mwaura-portfolio.vercel.app",
    experience: "2023 – Present",
    experienceJob: {
      company: "Freelance Full Stack Developer & AI Engineer",
      period: "2023 – Present",
      description:
        "Building full stack applications, AI-powered systems and scalable SaaS products for clients and independent projects.",
    },
    summary:
      "I build scalable SaaS, AI and mobile products. I design and ship production-ready SaaS platforms, Flutter apps and RAG-powered AI tools.",
  },

  projects: {
    scienceRagAnalyzer: {
      name: "SCIENCE-RAG-ANALYZER",
      description:
        "A Retrieval-Augmented Generation (RAG) system that turns science PDFs (notes, textbooks, past papers) into a searchable knowledge base, so integrated science students can ask questions and get answers grounded in their own study material.",
      tech: ["Python", "FastAPI", "Uvicorn", "Inngest", "Streamlit"],
    },
    shop: {
      name: "SHOP",
      description:
        "An online shop for Kenyan sellers and shoppers, with M-Pesa checkout. Built end to end in Dart for a Flutter app on a Serverpod 4 backend with PostgreSQL.",
      tech: ["Flutter", "Dart", "Serverpod", "PostgreSQL"],
    },
    openSourceTutor: {
      name: "Open-Source-Tutor",
      description:
        "A mathematics self-tutor website that assists students for free and collects no data from students.",
      tech: ["Flutter", "Dart", "LangGraph", "LLM Systems"],
    },
  },

  techStack: {
    frontend: ["Dart", "Flutter", "React", "TypeScript", "Next.js", "Angular", "TailwindCSS", "Framer Motion"],
    backend: ["Serverpod", "Node.js", "ExpressJS", "Django", "REST APIs"],
    database: ["PostgreSQL", "MongoDB", "Firebase", "Supabase"],
    ai: [
      "CrewAI",
      "LangChain",
      "LangGraph",
      "OpenAI",
      "RAG Pipelines",
      "LLM Prompt Engineering",
      "AI Agents",
      "Fine-Tuning",
      "Embeddings",
      "Vector Databases",
      "FAISS",
    ],
    infrastructure: ["Docker", "GitHub", "Vercel"],
  },

  aiEngineering: {
    title: "AI Engineering",
    description:
      "Building intelligent systems using LangChain, OpenAI APIs, embeddings, vector databases and reasoning pipelines.",
    focus: [
      "RAG Pipelines",
      "Agentic AI",
      "Fine-Tuning",
      "LangChain",
      "LangGraph",
      "OpenAI",
      "FAISS",
    ],
  },

  experience: "2023 – Present",
  experienceJob: {
    company: "Freelance Full Stack Developer & AI Engineer",
    period: "2023 – Present",
    description:
      "Building full stack applications, AI-powered systems and scalable SaaS products for clients and independent projects.",
  },

  contact: {
    availableFor: [
      "freelance projects",
      "remote opportunities",
      "AI-focused collaborations",
    ],
    message: "Let's engineer a high-impact solution.",
  },

  faqs: [
    "Tell me about yourself",
    "What do you do?",
    "What technologies do you work with?",
    "What projects have you built?",
    "Tell me about your experience",
    "How can I contact you?",
    "What is Science RAG Analyzer?",
    "Tell me about your shop project",
    "Tell me about Open-Source-Tutor",
    "Are you available for work?",
    "What AI technologies do you use?",
  ],

  // Keywords → intent mapping for matching
  intents: {
    about: {
      patterns: [
        "about you",
        "who are you",
        "tell me about yourself",
        "your self",
        "your name",
        "what do you do",
        "what is your name",
        "introduce yourself",
      ],
      keywords: ["develop", "engineer", "build", "work", "role", "position", "what do you"],
    },
    experience: {
      patterns: ["experience", "career", "work history", "how long", "since when"],
      keywords: ["year", "2023", "present", "since", "career", "experience", "history"],
    },
    contact: {
      patterns: ["contact", "email", "reach", "hire", "available for", "how to reach"],
      keywords: ["email", "phone", "contact", "hire", "reach", "available", "collaboration", "hire"],
    },
    projects: {
      patterns: ["project", "work", "what have you built", "portfolio"],
      keywords: ["project", "built", "shop", "rag", "tutor", "projects", "portfolio"],
    },
    tech: {
      patterns: ["technology", "tech stack", "technologies", "skills", "what do you know"],
      keywords: ["tech", "language", "framework", "tool", "stack", "skill", "technology", "react", "flutter", "python", "node", "django", "postgresql", "mongodb", "firebase", "supabase", "langchain", "openai"],
    },
    ai: {
      patterns: ["ai", "machine learning", "llm", "agent", "rag"],
      keywords: ["ai", "machine learning", "llm", "agent", "rag", "openai", "langchain", "langgraph", "embedding", "vector", "fine-tuning", "llm"],
    },
    scienceRag: {
      patterns: ["science rag", "science rag analyzer"],
      keywords: ["science", "rag", "pdf", "textbook", "integrated science", "analyzer"],
    },
    shop: {
      patterns: ["shop", "m-pesa"],
      keywords: ["shop", "m-pesa", "online", "store", "kenyan", "seller", "checkout"],
    },
    tutor: {
      patterns: ["tutor", "math"],
      keywords: ["tutor", "math", "mathematics", "student", "education", "learn"],
    },
    faq: {
      patterns: ["what", "who", "where", "when", "why", "how", "tell me", "describe"],
      keywords: ["what", "who", "where", "when", "why", "how", "tell me", "describe"],
    },
    default: {
      patterns: [],
      keywords: [],
    },
  },
};

export type ChatbotResponses = Record<string, string[]>;

export const chatbotResponses: ChatbotResponses = {
  about: [
    `I'm **${chatbotKnowledgeBase.profile.name}**. I work as a ${chatbotKnowledgeBase.profile.roles.join(", ")}.`,
    `I'm based in ${chatbotKnowledgeBase.profile.location} and have been working as a Freelance Full Stack Developer & AI Engineer since ${chatbotKnowledgeBase.profile.experience}.`,
    ` ${chatbotKnowledgeBase.profile.summary}`,
  ],
  experience: [
    `I've been working as a Freelance Full Stack Developer & AI Engineer since ${chatbotKnowledgeBase.profile.experience}.`,
    ` ${chatbotKnowledgeBase.profile.experienceJob.description}`,
    `I focus on building full stack applications, AI-powered systems and scalable SaaS products.`,
  ],
  contact: [
    `You can reach me at **${chatbotKnowledgeBase.profile.email}**.`,
    `I'm available for freelance projects, remote opportunities and AI-focused collaborations.`,
    `Check out my GitHub: ${chatbotKnowledgeBase.profile.github} or my portfolio: ${chatbotKnowledgeBase.profile.portfolio}.`,
  ],
  projects: [
    "Here are my selected projects:",
    ...Object.values(chatbotKnowledgeBase.projects).map(
      (p) => `- **${p.name}**: ${p.description}`
    ),
    "",
    "You can see all projects on the site's Projects section.",
  ],
  tech: [
    "Here's the technologies I work with:",
    "",
    "**Frontend:** " + chatbotKnowledgeBase.techStack.frontend.join(", "),
    "**Backend:** " + chatbotKnowledgeBase.techStack.backend.join(", "),
    "**Database:** " + chatbotKnowledgeBase.techStack.database.join(", "),
    "**AI/ML:** " + chatbotKnowledgeBase.techStack.ai.join(", "),
    "**Infrastructure:** " + chatbotKnowledgeBase.techStack.infrastructure.join(", "),
  ],
  ai: [
    "I focus on AI engineering, building intelligent systems using:",
    ...chatbotKnowledgeBase.aiEngineering.focus.map((f) => `- ${f}`),
    "",
    "I build RAG pipelines, agentic AI systems and work on fine-tuning models using LangChain, LangGraph, OpenAI and FAISS.",
  ],
  scienceRag: [
    "The **Science RAG Analyzer** is a Retrieval-Augmented Generation (RAG) system that turns science PDFs (notes, textbooks, past papers) into a searchable knowledge base.",
    "Students can ask questions and get answers grounded in their own study material.",
    `Built with: ${chatbotKnowledgeBase.projects.scienceRagAnalyzer.tech.join(", ")}`,
  ],
  shop: [
    "The **SHOP** project is an online shop for Kenyan sellers and shoppers, with M-Pesa checkout.",
    "It's built end to end in Dart for a Flutter app on a Serverpod 4 backend with PostgreSQL.",
    `Built with: ${chatbotKnowledgeBase.projects.shop.tech.join(", ")}`,
  ],
  tutor: [
    "The **Open-Source-Tutor** is a mathematics self-tutor website that assists students for free and collects no data from students.",
    "It's built with Flutter, Dart, LangGraph and LLM Systems.",
    `Built with: ${chatbotKnowledgeBase.projects.openSourceTutor.tech.join(", ")}`,
  ],
  faq: [
    "Here are answers to common questions:",
    ...chatbotKnowledgeBase.faqs.map((f) => `- ${f}`),
  ],
  default: [
    "I'd be happy to help! Here are some things I can tell you about:",
    ...chatbotKnowledgeBase.faqs,
    "",
    "You can also ask about my experience, projects, tech stack, or how to contact me.",
  ],
};
