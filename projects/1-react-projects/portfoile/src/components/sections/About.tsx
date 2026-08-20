import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView, type Variants } from 'framer-motion';
import { Code2, Palette, Zap, Coffee, MapPin, Calendar, Briefcase, GraduationCap } from 'lucide-react';
import { PROFILE } from '@/lib/constants';

const experiences = [
  {
    title: 'Bachelor of Information Technology',
    company: 'Sinai University – Arish',
    period: 'Sep 2023 – Present',
    description: 'Studying Information Technology with a focus on full-stack development, software engineering, and database management. GPA: 3.3',
    icon: GraduationCap,
    color: 'var(--color-accent-2)',
  },
  {
    title: 'Full-Stack Developer',
    company: 'Self-Initiated & Client Projects',
    period: 'Aug 2024 – Present',
    description: 'Delivering client-facing applications like Tivaq and Moviq. Implementing JWT authentication, RBAC, RESTful APIs, and responsive React interfaces.',
    icon: Briefcase,
    color: 'var(--color-accent-1)',
  },
];

const passions = [
  { icon: Code2, label: 'Clean Code', desc: 'Writing maintainable, scalable code' },
  { icon: Palette, label: 'UI Design', desc: 'Crafting beautiful interfaces' },
  { icon: Zap, label: 'Performance', desc: 'Optimizing for speed and efficiency' },
  { icon: Coffee, label: 'Learning', desc: 'Always exploring new technologies' },
];

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  
  const bgY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section ref={sectionRef} id="about" className="section-padding relative overflow-hidden">
      {/* Parallax background element */}
      <motion.div 
        className="absolute right-0 top-1/4 w-[400px] h-[400px] rounded-full opacity-[0.04] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, var(--color-accent-2), transparent 70%)',
          filter: 'blur(80px)',
          y: bgY,
        }}
      />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <p className="text-accent-1 text-sm font-semibold tracking-widest uppercase mb-3 font-mono">// about</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
            A bit about <span className="text-gradient">me</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column: Bio + Passions */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Bio */}
            <div className="space-y-5 mb-10">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {PROFILE.bio}
              </p>
              <p className="text-base text-muted-foreground/80 leading-relaxed">
                When I'm not crafting code, I'm exploring new technologies, contributing to 
                open-source projects, and continuously pushing the boundaries of what's possible on the web.
              </p>
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="p-2 rounded-lg bg-accent-3/10">
                  <MapPin size={16} className="text-accent-3" />
                </div>
                <span className="text-sm">{PROFILE.location}</span>
              </div>
            </div>

            {/* Passions Grid */}
            <motion.div 
              className="grid grid-cols-2 gap-3"
              variants={staggerContainer}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              {passions.map((item) => (
                <motion.div 
                  key={item.label}
                  variants={staggerItem}
                  className="glass rounded-xl p-4 glow-border group hover:bg-muted/30 transition-all duration-300"
                >
                  <item.icon size={20} className="text-accent-1 mb-2.5 group-hover:scale-110 transition-transform duration-300" />
                  <p className="font-semibold text-sm mb-1">{item.label}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column: Experience Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className="text-xl font-semibold mb-8 font-display">Experience</h3>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-0 bottom-0 w-px bg-linear-to-b from-accent-1/30 via-accent-2/20 to-transparent" />
              
              <div className="space-y-8">
                {experiences.map((exp, index) => (
                  <motion.div 
                    key={index}
                    className="relative pl-12"
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.5, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {/* Timeline dot */}
                    <div 
                      className="absolute left-0 top-2 w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ 
                        backgroundColor: `color-mix(in srgb, ${exp.color} 12%, transparent)`,
                        boxShadow: index === 0 ? `0 0 20px ${exp.color}30` : 'none',
                      }}
                    >
                      <exp.icon size={14} style={{ color: exp.color }} />
                    </div>
                    
                    <div className="glass rounded-xl p-5 glow-border hover:bg-muted/20 transition-all duration-300">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                        <Calendar size={12} />
                        <span>{exp.period}</span>
                      </div>
                      <h4 className="font-semibold text-foreground mb-0.5">{exp.title}</h4>
                      <p className="text-sm font-medium mb-3" style={{ color: exp.color }}>{exp.company}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{exp.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
