import type { Project, Skill, SocialLink, NavItem } from "@/types";

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { name: "GitHub", url: "https://github.com/BelalWaheed", icon: "github" },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/belalwhaeed",
    icon: "linkedin",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/belalwaheed_/",
    icon: "instagram",
  },
  { name: "Email", url: "mailto:belalwaheed000@gmail.com", icon: "mail" },
];

export const PROJECTS: Project[] = [
  {
    id: "1",
    title: "Tivaq — Fragrance E-commerce",
    description:
      "Polished UI, comprehensive admin dashboard, and a unique product authenticity verification system.",
    image:
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&q=80",
    tags: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "i18n"],
    liveUrl: "https://www.tivaqfragrance.com/",
    featured: true,
  },
  {
    id: "2",
    title: "Obel — Productivity App",
    description:
      "Unified task management and note-taking workspace inspired by Obsidian, with a RESTful API and flexible MongoDB storage.",
    image:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?w=800&q=80",
    tags: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    githubUrl: "https://github.com/BelalWaheed/Obel",
    liveUrl: "https://obel.vercel.app",

    featured: true,
  },
  {
    id: "3",
    title: "Moviq - Movie & TV Discovery",
    description:
      "A comprehensive movie and TV discovery platform with TMDB integration, featuring content browsing, trailers, cast info, user authentication, and responsive dark theme design.",
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80",
    tags: ["React", "Node.js", "TMDB API", "Tailwind CSS"],
    liveUrl: "https://moviqq.vercel.app",
    githubUrl: "https://github.com/BelalWaheed/moviq",
    featured: true,
  },

  {
    id: "4",
    title: "Cema ",
    description:
      "A comprehensive healthcare management system for Cinema and theaters, featuring movies, shows, and ticketing system.",
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80",

    tags: ["ASP.Net MVC", "SQL Server", "Bootstrap"],
    githubUrl: "https://github.com/BelalWaheed/cema-mvc",

    featured: true,
  },
  {
    id: "5",
    title: "Travel Guide",
    description:
      "A travel guide application helping users discover destinations and plan their trips.",
    image:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80",
    tags: ["HTML", "CSS", "JavaScript"],
    githubUrl: "https://github.com/BelalWaheed/travel-guide",
  },
];

export const SKILLS: Skill[] = [
  // Frontend
  { name: "React", level: 92, category: "frontend" },
  { name: "JavaScript", level: 95, category: "frontend" },
  { name: "TypeScript", level: 85, category: "frontend" },
  { name: "Tailwind CSS", level: 90, category: "frontend" },
  { name: "Redux Toolkit", level: 88, category: "frontend" },
  { name: "Next.js", level: 75, category: "frontend" },
  { name: "HTML/CSS", level: 95, category: "frontend" },
  // Backend & Database
  { name: "Node.js", level: 85, category: "backend" },
  { name: "Express.js", level: 85, category: "backend" },
  { name: "MongoDB", level: 80, category: "backend" },
  { name: "REST APIs", level: 88, category: "backend" },
  { name: "C# / ASP.NET", level: 75, category: "backend" },
  { name: "SQL Server", level: 78, category: "backend" },
  // Tools
  { name: "Git", level: 90, category: "tools" },
  { name: "VS Code", level: 95, category: "tools" },
  { name: "Vercel", level: 85, category: "tools" },
  { name: "Postman", level: 85, category: "tools" },
  { name: "Figma", level: 70, category: "tools" },
];

export const PROFILE = {
  name: "Belal Waheed",
  title: "Full-Stack Developer",
  tagline: "Building modern web experiences with React, Node.js & MongoDB",
  bio: `Full-Stack Developer and Information Technology student. Proficient in React, Node.js, and MongoDB, 
        with a strong focus on clean architecture, performance, and user experience. Experienced in building 
        scalable applications, RESTful APIs, and responsive frontends.`,
  location: "Cairo, Egypt",
  email: "belalwaheed000@gmail.com",
  availability: true,
};

export const SEO_CONFIG = {
  siteUrl: "https://belalwaheed.vercel.app",
  siteName: "Belal Waheed | Full-Stack Developer",
  siteDescription:
    "Belal Waheed — Full-Stack Developer based in Cairo, crafting modern web experiences with React, Node.js, and MongoDB. View my portfolio, projects, and get in touch.",
  keywords: [
    "Belal Waheed",
    "Full-Stack Developer",
    "React Developer",
    "Node.js Developer",
    "MongoDB",
    "Portfolio",
    "Web Developer Cairo",
    "React Portfolio",
    "Tailwind CSS",
    "JavaScript Developer",
    "Software Engineer",
  ],
  ogImage: "/profile.jpg",
  twitterHandle: "@BelalWah8ed",
};
