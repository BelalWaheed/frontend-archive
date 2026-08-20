import { Hero, About, Projects, Skills, Contact } from '@/components/sections';
import { SEO } from '@/components/SEO';
import { JsonLd } from '@/components/JsonLd';

export function HomePage() {
  return (
    <>
      <SEO />
      <JsonLd />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
    </>
  );
}
