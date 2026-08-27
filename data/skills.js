/* =============================================================
   data/skills.js — Skills Data
   Edit this file to add, remove, or reorder skills.
   Layout code in main.js reads from this array automatically.

   For items with a devicon CDN class, set `devicon`.
   For CS fundamentals or custom items, use `emoji` instead.
   ============================================================= */

const SKILLS = [
  {
    category: "Programming",
    items: [
      { name: "C++",        devicon: "devicon-cplusplus-plain colored" },
      { name: "Python",     devicon: "devicon-python-plain colored"    },
      { name: "JavaScript", devicon: "devicon-javascript-plain colored" },
    ],
  },
  {
    category: "Web Development",
    items: [
      { name: "HTML",       devicon: "devicon-html5-plain colored"      },
      { name: "CSS",        devicon: "devicon-css3-plain colored"       },
      { name: "JavaScript", devicon: "devicon-javascript-plain colored" },
      { name: "React",      devicon: "devicon-react-original colored"   },
      { name: "Node.js",    devicon: "devicon-nodejs-plain colored"     },
    ],
  },
  {
    category: "Database",
    items: [
      { name: "MySQL",      devicon: "devicon-mysql-plain colored" },
    ],
  },
  {
    category: "Tools & Technologies",
    items: [
      { name: "Git",        devicon: "devicon-git-plain colored"        },
      { name: "GitHub",     devicon: "devicon-github-original"          },
      { name: "VS Code",    devicon: "devicon-vscode-plain colored"     },
    ],
  },
  {
    category: "CS Fundamentals",
    items: [
      { name: "Data Structures & Algorithms", emoji: "🧩" },
      { name: "Object-Oriented Programming",  emoji: "🏗️" },
      { name: "Database Management Systems",  emoji: "🗄️" },
    ],
  },
];
