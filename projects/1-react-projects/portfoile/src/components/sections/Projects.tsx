import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView, type Variants } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { Badge, Button } from '@/components/ui';
import { PROJECTS } from '@/lib/constants';

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const featured = PROJECTS.filter(p => p.featured);
  const others = PROJECTS.filter(p => !p.featured);

  return (
    <section ref={sectionRef} id="projects" className="section-padding relative overflow-hidden">
      {/* Parallax element */}
      <motion.div 
        className="absolute right-0 bottom-1/4 w-[500px] h-[500px] rounded-full opacity-[0.03] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, var(--color-accent-3), transparent 70%)',
          filter: 'blur(100px)',
          y: bgY,
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
          <p className="text-accent-3 text-sm font-semibold tracking-widest uppercase mb-3 font-mono">// projects</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-5">
            Selected <span className="text-gradient-warm">work</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl">
            Projects I've built with passion, precision, and a love for clean code.
          </p>
        </motion.div>

        {/* Featured Project — hero-style */}
        {featured[0] && (
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="glass rounded-3xl overflow-hidden glow-border group">
              <div className="grid lg:grid-cols-5 gap-0">
                {/* Image */}
                <div className="lg:col-span-3 relative aspect-video lg:aspect-auto lg:h-[450px] overflow-hidden">
                  <img
                    src={featured[0].image}
                    alt={featured[0].title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-linear-to-r from-card/80 via-card/20 to-transparent" />
                </div>
                
                {/* Content */}
                <div className="lg:col-span-2 p-8 lg:p-10 flex flex-col justify-center">
                  <Badge className="w-fit mb-4">Featured</Badge>
                  <h3 className="text-3xl font-bold font-display mb-3">{featured[0].title}</h3>
                  <p className="text-muted-foreground mb-5 leading-relaxed">{featured[0].description}</p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {featured[0].tags.map((tag) => (
                      <Badge key={tag} variant="outline">{tag}</Badge>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    {featured[0].liveUrl && (
                      <Button asChild>
                        <a href={featured[0].liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink size={16} /> Live Demo
                        </a>
                      </Button>
                    )}
                    {featured[0].githubUrl && (
                      <Button variant="outline" asChild>
                        <a href={featured[0].githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github size={16} /> Code
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Project Grid — cards */}
        <motion.div 
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {[...featured.slice(1), ...others].map((project) => (
            <motion.div key={project.id} variants={staggerItem}>
              <div className="h-full glass rounded-2xl overflow-hidden glow-border group hover:bg-muted/15 transition-all duration-400">
                {/* Image */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-card via-transparent to-transparent" />
                  
                  {/* Hover overlay with links */}
                  <div className="absolute inset-0 bg-card/70 backdrop-blur-sm flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                        className="p-4 rounded-2xl glass hover:bg-accent-1/10 transition-colors" aria-label="Live demo">
                        <ExternalLink size={22} className="text-accent-1" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                        className="p-4 rounded-2xl glass hover:bg-accent-2/10 transition-colors" aria-label="Source code">
                        <Github size={22} className="text-accent-2" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-semibold font-display text-lg mb-2 group-hover:text-accent-1 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                    ))}
                    {project.tags.length > 3 && (
                      <Badge variant="secondary" className="text-xs">+{project.tags.length - 3}</Badge>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
