import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView, type Variants } from 'framer-motion';
import { Layers, Server, Wrench, Layout } from 'lucide-react';
import { SKILLS } from '@/lib/constants';
import { Badge } from '@/components/ui';

const categoryIcons = {
  frontend: Layout,
  backend: Server,
  tools: Wrench,
  other: Layers,
};

const categoryTitles = {
  frontend: 'Frontend Development',
  backend: 'Backend & Database',
  tools: 'Tools & Platforms',
  other: 'Other Skills',
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const bgX = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  const categories = ['frontend', 'backend', 'tools'] as const;

  return (
    <section ref={sectionRef} id="skills" className="section-padding relative overflow-hidden">
      {/* Parallax bg */}
      <motion.div 
        className="absolute left-0 top-1/3 w-[500px] h-[500px] rounded-full opacity-[0.03] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, var(--color-accent-1), transparent 70%)',
          filter: 'blur(100px)',
          x: bgX,
        }}
      />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-accent-2 text-sm font-semibold tracking-widest uppercase mb-3 font-mono">// technical proficiency</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-5">
            Core <span className="text-gradient">Competencies</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl">
            A comprehensive overview of the technologies and frameworks I leverage to build scalable and robust applications.
          </p>
        </motion.div>

        {/* Skills Cards Grid */}
        <motion.div 
          className="grid lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {categories.map((category) => {
            const categorySkills = SKILLS.filter(s => s.category === category);
            if (categorySkills.length === 0) return null;
            const Icon = categoryIcons[category];

            return (
              <motion.div
                key={category}
                variants={staggerItem}
                className="glass rounded-3xl p-8 glow-border hover:bg-muted/10 transition-colors duration-500 flex flex-col h-full"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 rounded-2xl bg-accent-1/10 text-accent-1">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-display">{categoryTitles[category]}</h3>
                </div>
                
                <div className="flex flex-wrap gap-2.5 mt-auto">
                  {categorySkills.map((skill) => (
                    <Badge 
                      key={skill.name} 
                      variant="secondary" 
                      className="px-4 py-2 text-sm bg-muted/50 border-border/40 hover:border-accent-1/30 hover:bg-accent-1/5 transition-all duration-300"
                    >
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
