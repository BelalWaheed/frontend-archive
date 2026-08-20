import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router';
import { Github, Linkedin, Instagram, Mail, Heart } from 'lucide-react';
import { SOCIAL_LINKS, PROFILE } from '@/lib/constants';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  github: Github, linkedin: Linkedin, instagram: Instagram, mail: Mail,
};

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  const { scrollYProgress } = useScroll();
  const footerOpacity = useTransform(scrollYProgress, [0.85, 1], [0, 1]);

  return (
    <motion.footer 
      className="border-t border-border/30 bg-card/20 relative"
      style={{ opacity: footerOpacity }}
    >
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[150px] rounded-full blur-3xl opacity-[0.02] pointer-events-none"
        style={{ background: 'var(--color-accent-1)' }}
      />

      <div className="container mx-auto px-6 lg:px-8 py-10 relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-2">
            <span className="font-display font-semibold text-sm text-muted-foreground group-hover:text-foreground transition-colors">
              Belal<span className="text-accent-1">.</span>
            </span>
          </Link>

          {/* Social */}
          <div className="flex items-center gap-1">
            {SOCIAL_LINKS.map((link) => {
              const Icon = iconMap[link.icon];
              return Icon ? (
                <motion.a
                  key={link.name} href={link.url} target="_blank" rel="noopener noreferrer"
                  className="p-2 text-muted-foreground hover:text-accent-1 transition-colors duration-300"
                  aria-label={link.name} whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}
                >
                  <Icon size={16} />
                </motion.a>
              ) : null;
            })}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border/20 text-center">
          <p className="text-xs text-muted-foreground/70 flex items-center justify-center gap-1">
            © {currentYear} Made with
            <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
              <Heart size={11} className="text-accent-1 fill-accent-1" />
            </motion.span>
            by {PROFILE.name}
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
