/* =============================================================
   data/projects.js — Projects Data
   Edit this file to add / update projects.
   main.js reads this array and builds the project cards.

   `thumbnail` options:
     "stream"  — CSS-only streaming-UI mockup (no brand logos)
     "default" — Monogram fallback card
   ============================================================= */

const PROJECTS = [
  {
    title: "Netflix Clone",
    description:
      "A responsive Netflix-inspired web project created to practice modern frontend development, responsive UI design, and interactive web interfaces.",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/HimanshuYadav5998/COLLEGE_PROJECT_CSE-15",
    demo:   "https://radiant-boba-59792a.netlify.app/",
    thumbnail: "stream", // CSS-only streaming UI mockup — no Netflix trademarks used
  },
  {
    title: "Notion Automation Project",
    description: "An end-to-end Notion-powered AI request automation platform built for the Automate India Hackathon. It extracts data from messy requests using AI, pauses for human approval in Notion, and triggers real external actions.",
    tech: ["Python", "FastAPI", "Notion API", "LLM"],
    github: "https://github.com/HimanshuYadav5998/AZURE",
    demo:   "https://project-azure.netlify.app/",
    thumbnail: "notion",
  },

  // ── Add more projects below in the same format ──────────────
  // {
  //   title: "Project Name",
  //   description: "Short description of what you built and why.",
  //   tech: ["Tech1", "Tech2", "Tech3"],
  //   github: "https://github.com/HimanshuYadav5998/repo-name",
  //   demo:   "https://your-live-url.netlify.app/",
  //   thumbnail: "default",
  // },
];
