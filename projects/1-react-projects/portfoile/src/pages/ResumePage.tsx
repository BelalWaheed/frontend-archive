import { motion, type Variants } from 'framer-motion';
import {
  Mail, Phone, MapPin, ExternalLink, Github, Linkedin,
  GraduationCap, Briefcase, Code2, Wrench, Globe,
  Download, ArrowLeft, ChevronRight, Layers,
} from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '@/components/ui';
import { SEO } from '@/components/SEO';
import { JsonLd } from '@/components/JsonLd';
import { PROFILE, SEO_CONFIG } from '@/lib/constants';

/* ── Data ── */
const contactInfo = [
  { icon: MapPin, value: 'Cairo, Egypt' },
  { icon: Mail, value: 'belalwaheed000@gmail.com', href: 'mailto:belalwaheed000@gmail.com' },
  { icon: Phone, value: '+20 1111004353', href: 'tel:+201111004353' },
  { icon: Globe, value: 'belalwaheed.vercel.app', href: SEO_CONFIG.siteUrl },
];

const profileLinks = [
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/belalwhaeed' },
  { icon: Github, label: 'GitHub', href: 'https://github.com/BelalWaheed' },
];

const skills = {
  'Frontend': ['React.js', 'Redux Toolkit', 'Next.js', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Tailwind CSS', 'Framer Motion'],
  'Backend': ['Node.js', 'Express.js', 'RESTful APIs', 'ASP.NET Core', 'JWT Authentication', 'bcrypt'],
  'Database': ['MongoDB', 'SQL Server'],
  'Tools & Platforms': ['Git', 'GitHub', 'Vercel', 'VS Code', 'Figma', 'Postman'],
};

const skillIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  'Frontend': Layers,
  'Backend': Code2,
  'Database': Wrench,
  'Tools & Platforms': Wrench,
};

const experienceBullets = [
  'Delivered a client-facing product (Tivaq) with a custom admin dashboard, rich UI, and a product authenticity verification system.',
  'Collaborated with a teammate on Moviq, a large-scale movie and series platform, gaining practical experience in async workflows and code review.',
  'Implemented JWT authentication, bcrypt password hashing, and role-based access control across multiple projects.',
];

const projects = [
  {
    title: 'Tivaq — Fragrance E-commerce',
    url: 'https://github.com/BelalWaheed/Tivaq',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'i18n'],
    description: [
      'Built a client-facing fragrance e-commerce platform featuring a rich, polished UI and smooth product browsing experience.',
      'Developed a comprehensive admin dashboard for inventory, order, and user management.',
      'Implemented a custom product authenticity verification system, allowing customers to confirm the origin of their purchases via a unique code flow.',
    ],
  },
  {
    title: 'Moviq — Movie Discovery',
    url: 'https://moviqq.vercel.app',
    tech: ['React', 'Node.js', 'TMDB API', 'Tailwind CSS'],
    description: [
      'Co-developed a full-featured movie and TV series discovery platform powered by the TMDB API, displaying cast, ratings, trailers, and related titles.',
      'Worked collaboratively with a teammate using Git branching, pull requests, and code reviews — gaining realworld team workflow experience.',
    ],
  },
  {
    title: 'Obel — Productivity App',
    url: 'https://github.com/BelalWaheed/Obel',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
    description: [
      'Designed and built a personal productivity application that unifies task management and note-taking in a single, cohesive workspace — inspired by Obsidian.',
      'Architected the backend with a RESTful API and MongoDB for flexible, schema-driven content storage.',
    ],
  },
];

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.08 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const } },
};

/* ── Section heading ── */
function SectionHeading({ icon: Icon, title, delay = 0 }: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  delay?: number;
}) {
  return (
    <motion.div
      className="flex items-center gap-3 mb-5"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="p-2 rounded-xl bg-accent-1/10 print:bg-gray-100">
        <Icon size={17} className="text-accent-1 print:text-gray-600" />
      </div>
      <h2 className="text-lg font-bold font-display tracking-tight print:text-black">{title}</h2>
      <div className="flex-1 h-px bg-border/40 ml-2 print:bg-gray-200" />
    </motion.div>
  );
}

/* ── Page ── */
export function ResumePage() {
  return (
    <>
      <SEO
        title="Resume — Belal Waheed | Full-Stack Developer"
        description="Belal Waheed's resume — Full-Stack Developer specializing in React, Node.js, and MongoDB. View education, skills, projects, and experience."
        canonical={`${SEO_CONFIG.siteUrl}/resume`}
      />
      <JsonLd type="resume" />

      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 print:p-0 print:bg-white print:min-h-0">
        {/* Top bar */}
        <motion.div
          className="max-w-4xl mx-auto mb-6 flex items-center justify-between print:hidden"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link to="/">
            <Button variant="outline" size="sm">
              <ArrowLeft size={16} />
              Back to Portfolio
            </Button>
          </Link>
          <Button size="sm" asChild>
            <a href="/Belal_Waheed_Resume.pdf" download="Belal_Waheed_Resume.pdf">
              <Download size={16} />
              Download PDF
            </a>
          </Button>
        </motion.div>

        {/* Resume Card */}
        <div className="max-w-4xl mx-auto glass rounded-3xl glow-border overflow-hidden print:rounded-none print:border-none print:shadow-none print:bg-white print:text-black">

          {/* ─── HEADER ─── */}
          <motion.header
            className="p-8 sm:p-10 border-b border-border/30 print:border-gray-200 print:pb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1
              className="text-4xl sm:text-5xl font-bold font-display text-gradient print:text-black mb-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
            >
              {PROFILE.name}
            </motion.h1>
            <motion.p
              className="text-lg text-accent-1 font-semibold print:text-gray-600 mb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Full-Stack Developer &nbsp;|&nbsp; React, Node.js &amp; MongoDB
            </motion.p>

            {/* Contact row */}
            <motion.div
              className="flex flex-wrap items-center gap-x-5 gap-y-2"
              variants={stagger}
              initial="hidden"
              animate="visible"
            >
              {contactInfo.map((c) => (
                <motion.span key={c.value} variants={fadeUp} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground print:text-gray-600">
                  <c.icon size={13} className="text-accent-1/70 print:text-gray-400 shrink-0" />
                  {c.href ? (
                    <a href={c.href} target="_blank" rel="noopener noreferrer" className="hover:text-accent-1 transition-colors print:text-blue-600 print:underline">{c.value}</a>
                  ) : (
                    c.value
                  )}
                </motion.span>
              ))}
              <span className="text-border print:text-gray-300">|</span>
              {profileLinks.map((l) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={fadeUp}
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent-1 transition-colors print:text-blue-600 print:underline"
                >
                  <l.icon size={13} />
                  {l.label}
                </motion.a>
              ))}
            </motion.div>
          </motion.header>

          {/* ─── BODY ─── */}
          <div className="p-8 sm:p-10 space-y-9 print:space-y-6 print:pt-6">

            {/* Professional Summary */}
            <section>
              <SectionHeading icon={Briefcase} title="Professional Summary" delay={0.15} />
              <motion.p
                className="text-sm text-muted-foreground leading-relaxed print:text-gray-700"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Full-Stack Developer and Information Technology student. Proficient in React, Node.js, and MongoDB,
                with a strong focus on clean architecture, performance, and user experience.
              </motion.p>
            </section>

            {/* Technical Skills */}
            <section>
              <SectionHeading icon={Code2} title="Technical Skills" delay={0.2} />
              <div className="grid sm:grid-cols-2 gap-4">
                {Object.entries(skills).map(([category, items], i) => {
                  const Icon = skillIcons[category] || Code2;
                  return (
                    <motion.div
                      key={category}
                      className="glass rounded-xl p-4 glow-border print:border print:border-gray-200 print:bg-gray-50"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.25 + i * 0.05 }}
                    >
                      <h3 className="text-xs font-bold text-accent-1 uppercase tracking-wider mb-2.5 flex items-center gap-1.5 print:text-gray-700">
                        <Icon size={13} />
                        {category}
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {items.map((skill) => (
                          <span key={skill} className="px-2.5 py-1 rounded-lg text-xs bg-muted text-muted-foreground print:bg-gray-100 print:text-gray-700">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            {/* Experience */}
            <section>
              <SectionHeading icon={Briefcase} title="Experience" delay={0.3} />
              <motion.div
                className="glass rounded-xl p-5 glow-border print:border print:border-gray-200 print:bg-gray-50"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
                  <div>
                    <h3 className="font-semibold text-foreground print:text-black">Full-Stack Developer</h3>
                    <p className="text-sm text-accent-1 font-medium print:text-gray-600">Self-Initiated & Client Projects</p>
                  </div>
                  <span className="text-xs text-muted-foreground print:text-gray-500 font-mono shrink-0">Aug 2024 — Present</span>
                </div>
                <ul className="space-y-2">
                  {experienceBullets.map((bullet, i) => (
                    <motion.li
                      key={bullet}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                      className="text-sm text-muted-foreground leading-relaxed flex items-start gap-2 print:text-gray-700"
                    >
                      <ChevronRight size={14} className="text-accent-1/60 shrink-0 mt-0.5 print:text-gray-400" />
                      {bullet}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </section>

            {/* Projects */}
            <section>
              <SectionHeading icon={ExternalLink} title="Projects" delay={0.35} />
              <motion.div
                className="space-y-4"
                variants={stagger}
                initial="hidden"
                animate="visible"
              >
                {projects.map((project) => (
                  <motion.div
                    key={project.title}
                    variants={fadeUp}
                    className="glass rounded-xl p-5 glow-border group hover:bg-muted/20 transition-all duration-300 print:border print:border-gray-200 print:bg-gray-50"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-semibold text-foreground print:text-black group-hover:text-accent-1 transition-colors text-sm">
                        {project.title}
                      </h3>
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent-1 hover:text-accent-2 transition-colors shrink-0 print:text-blue-600"
                        aria-label={`View ${project.title}`}
                      >
                        <ExternalLink size={15} />
                      </a>
                    </div>
                    <ul className="space-y-1.5 mb-3">
                      {project.description.map((desc, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground leading-relaxed flex items-start gap-2 print:text-gray-600">
                          <span className="text-accent-1/60 shrink-0 mt-0.5">•</span>
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-accent-1/8 text-accent-1/80 print:bg-gray-100 print:text-gray-600">
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </section>

            {/* Education */}
            <section>
              <SectionHeading icon={GraduationCap} title="Education" delay={0.4} />
              <motion.div
                className="glass rounded-xl p-5 glow-border print:border print:border-gray-200 print:bg-gray-50"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.45 }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <div>
                    <h3 className="font-semibold text-foreground print:text-black">Bachelor of Information Technology</h3>
                    <p className="text-sm text-accent-1 font-medium mt-0.5 print:text-gray-600">Sinai University — Arish, Egypt</p>
                  </div>
                  <span className="text-xs text-muted-foreground print:text-gray-500 font-mono shrink-0">Sep 2023 — Present</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2 print:text-gray-600">
                  GPA: <span className="text-foreground font-semibold print:text-black">3.3</span>
                </p>
              </motion.div>
            </section>

          </div>
        </div>
      </div>
    </>
  );
}
