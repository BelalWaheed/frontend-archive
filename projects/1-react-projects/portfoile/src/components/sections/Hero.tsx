import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '@/components/ui';
import { PROFILE } from '@/lib/constants';

export function Hero() {
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 600], [1, 0.95]);
  const heroY = useTransform(scrollY, [0, 600], [0, 100]);
  const imageY = useTransform(scrollY, [0, 600], [0, -50]);
  const imageRotate = useTransform(scrollY, [0, 600], [0, 3]);

  const handleScrollDown = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.section 
      className="relative min-h-screen flex items-center overflow-hidden pt-24 lg:pt-0"
      style={{ opacity: heroOpacity }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute w-[700px] h-[700px] rounded-full opacity-[0.07]"
          style={{
            background: 'radial-gradient(circle, var(--color-accent-1), transparent 70%)',
            left: '-10%',
            top: '-20%',
            filter: 'blur(120px)',
            y: useTransform(scrollY, [0, 500], [0, -80]),
          }}
        />
        <motion.div 
          className="absolute w-[500px] h-[500px] rounded-full opacity-[0.05]"
          style={{
            background: 'radial-gradient(circle, var(--color-accent-3), transparent 70%)',
            right: '-5%',
            bottom: '0%',
            filter: 'blur(100px)',
            y: useTransform(scrollY, [0, 500], [0, 60]),
          }}
        />
      </div>

      <motion.div 
        className="container mx-auto px-6 lg:px-8 relative z-10"
        style={{ y: heroY, scale: heroScale }}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[80vh]">
          
          {/* Left: Text */}
          <motion.div 
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Status badge */}
            {PROFILE.availability && (
              <motion.div 
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass glow-border mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-1 opacity-60"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-1"></span>
                </span>
                <span className="text-xs font-medium text-muted-foreground tracking-wide">Available for projects</span>
              </motion.div>
            )}

            {/* Name  */}
            <motion.h1 
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.95] tracking-tight mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-muted-foreground/70 block text-2xl sm:text-3xl font-medium mb-3 tracking-normal">
                Hello, I'm
              </span>
              <span className="text-gradient block">{PROFILE.name}</span>
            </motion.h1>

            {/* Title */}
            <motion.p 
              className="text-xl sm:text-2xl text-muted-foreground font-light mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              {PROFILE.title}
            </motion.p>

            {/* Tagline */}
            <motion.p 
              className="text-base text-muted-foreground/80 max-w-lg leading-relaxed mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
            >
              {PROFILE.tagline}. I build <span className="text-accent-1">pixel-perfect</span>{' '}
              interfaces with clean code and smooth interactions.
            </motion.p>

            {/* CTAs */}
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
            >
              <Button size="lg" onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}>
                <Sparkles size={18} />
                View Projects
              </Button>
              <Button variant="outline" size="lg" onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}>
                Get In Touch
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/resume">
                  Resume
                </Link>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="flex gap-10 mt-14 pt-8 border-t border-border/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {[
                { value: '17+', label: 'Projects' },
                { value: '3+', label: 'Years' },
                { value: '100%', label: 'Passion' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl sm:text-4xl font-bold font-display text-gradient">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1 tracking-wider uppercase">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Photo */}
          <motion.div 
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 40, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div 
              className="relative"
              style={{ y: imageY, rotate: imageRotate }}
            >
              {/* Glow behind image */}
              <div 
                className="absolute -inset-8 rounded-3xl opacity-20 blur-3xl"
                style={{ background: 'linear-gradient(135deg, var(--color-accent-1), var(--color-accent-3))' }}
              />
              
              {/* Photo container */}
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-3xl overflow-hidden glow-border">
                <img 
                  src="/profile.jpg"
                  alt={`${PROFILE.name} - ${PROFILE.title}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback if image not found
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.innerHTML = `
                      <div class="w-full h-full bg-linear-to-br from-accent-1/20 to-accent-3/20 flex items-center justify-center">
                        <span class="text-7xl font-display font-bold text-gradient">BW</span>
                      </div>
                    `;
                  }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-background/40 via-transparent to-transparent" />
              </div>

              {/* Floating decoration */}
              <motion.div 
                className="absolute -top-4 -right-4 glass rounded-2xl px-4 py-3 glow-border"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <p className="text-xs text-muted-foreground">Based in</p>
                <p className="text-sm font-semibold text-accent-1">{PROFILE.location}</p>
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-4 -left-4 glass rounded-2xl px-4 py-3 glow-border"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              >
                <p className="text-xs text-muted-foreground">Crafting</p>
                <p className="text-sm font-semibold text-accent-2">Web Experiences</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <button 
            onClick={handleScrollDown}
            className="flex flex-col items-center gap-2 group"
            aria-label="Scroll down"
          >
            <span className="text-xs text-muted-foreground/60 tracking-widest uppercase">Scroll</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowDown size={16} className="text-accent-1/60 group-hover:text-accent-1 transition-colors" />
            </motion.div>
          </button>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
