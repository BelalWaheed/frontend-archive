import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { Send, Mail, MapPin, Clock, Github, Linkedin, Instagram, Check, Loader2 } from 'lucide-react';
import { Button, Input, Textarea } from '@/components/ui';
import { PROFILE, SOCIAL_LINKS } from '@/lib/constants';

interface FormData { name: string; email: string; subject: string; message: string; }
interface FormErrors { name?: string; email?: string; message?: string; }

const socialIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  github: Github, linkedin: Linkedin, instagram: Instagram, mail: Mail,
};

export function Contact() {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Invalid email';
    if (!formData.message.trim()) errs.message = 'Message is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setSubmitError(false);
    try {
      // It's important that these variables exactly match the {{ variables }} in your EmailJS template!
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'New Portfolio Contact',
          message: formData.message,
          // Common EmailJS template fields (just in case)
          from_name: formData.name,
          reply_to: formData.email,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error('EmailJS Error:', error); // Log the exact error to the console so we can debug it
      setSubmitError(true);
      setTimeout(() => setSubmitError(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const contactCards = [
    { icon: Mail, label: 'Email', value: PROFILE.email, href: `mailto:${PROFILE.email}` },
    { icon: MapPin, label: 'Location', value: PROFILE.location },
    { icon: Clock, label: 'Status', value: 'Open for work' },
  ];

  return (
    <section ref={sectionRef} id="contact" className="section-padding relative overflow-hidden">
      <motion.div 
        className="absolute left-1/4 top-0 w-[400px] h-[400px] rounded-full opacity-[0.03] pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--color-accent-1), transparent 70%)', filter: 'blur(100px)', y: bgY }}
      />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-accent-1 text-sm font-semibold tracking-widest uppercase mb-3 font-mono">// contact</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-5">
            Let's build something{' '}
            <span className="text-gradient">together</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl">
            Have a project in mind? Drop me a message and let's bring your vision to life.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 max-w-6xl">
          {/* Left: Contact Info + Social */}
          <motion.div 
            className="lg:col-span-2 space-y-5"
            initial={{ opacity: 0, x: -25 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {contactCards.map((card, i) => (
              <motion.div
                key={card.label}
                className="glass rounded-xl p-5 glow-border hover:bg-muted/20 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
              >
                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-xl bg-accent-1/8">
                    <card.icon size={18} className="text-accent-1" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{card.label}</p>
                    {card.href ? (
                      <a href={card.href} className="font-medium text-sm hover:text-accent-1 transition-colors">{card.value}</a>
                    ) : (
                      <p className="font-medium text-sm">{card.value}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Social Links */}
            <div className="pt-4 border-t border-border/30">
              <p className="text-xs text-muted-foreground mb-3 tracking-wide uppercase">Connect</p>
              <div className="flex gap-2">
                {SOCIAL_LINKS.map((s) => {
                  const Icon = socialIcons[s.icon.toLowerCase()] || Mail;
                  return (
                    <motion.a
                      key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
                      className="p-3 rounded-xl glass glow-border hover:bg-accent-1/8 transition-all duration-300 group"
                      aria-label={s.name} whileHover={{ y: -3 }} whileTap={{ scale: 0.95 }}
                    >
                      <Icon size={18} className="group-hover:text-accent-1 transition-colors" />
                    </motion.a>
                  );
                })}
              </div>
            </div>

          </motion.div>

          {/* Right: Form */}
          <motion.div 
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 25 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="glass rounded-2xl p-7 sm:p-8 glow-border">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    className="flex flex-col items-center justify-center py-14 text-center"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-accent-1/15 flex items-center justify-center mb-5">
                      <Check size={28} className="text-accent-1" />
                    </div>
                    <h3 className="text-xl font-semibold font-display mb-2">Message Sent!</h3>
                    <p className="text-sm text-muted-foreground">Thank you! I'll get back to you soon.</p>
                  </motion.div>
                ) : submitError ? (
                  <motion.div
                    key="error"
                    className="flex flex-col items-center justify-center py-14 text-center"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-red-500/15 flex items-center justify-center mb-5">
                      <Mail size={28} className="text-red-400" />
                    </div>
                    <h3 className="text-xl font-semibold font-display mb-2">Failed to send</h3>
                    <p className="text-sm text-muted-foreground">Something went wrong. Please try again or email me directly.</p>
                  </motion.div>
                ) : (
                  <motion.form onSubmit={handleSubmit} className="space-y-5" key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <Input name="name" placeholder="Your name" value={formData.name} onChange={handleChange} className={errors.name ? 'border-red-500/50' : ''} />
                        {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <Input name="email" type="email" placeholder="Your email" value={formData.email} onChange={handleChange} className={errors.email ? 'border-red-500/50' : ''} />
                        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                      </div>
                    </div>
                    <Input name="subject" placeholder="Subject (optional)" value={formData.subject} onChange={handleChange} />
                    <div>
                      <Textarea name="message" placeholder="Your message..." rows={5} value={formData.message} onChange={handleChange} className={errors.message ? 'border-red-500/50' : ''} />
                      {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                    </div>
                    <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (<><Loader2 size={18} className="animate-spin" /> Sending...</>) : (<><Send size={18} /> Send Message</>)}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
