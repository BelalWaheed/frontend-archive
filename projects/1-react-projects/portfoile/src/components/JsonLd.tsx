import { PROFILE, SEO_CONFIG, SOCIAL_LINKS, SKILLS } from '@/lib/constants';

interface JsonLdProps {
  type?: 'home' | 'resume';
}

/**
 * JSON-LD structured data for Google rich results.
 * Supports different schema types depending on the page.
 */
export function JsonLd({ type = 'home' }: JsonLdProps) {
  const sameAsUrls = SOCIAL_LINKS.filter((l) => l.url.startsWith('http')).map((l) => l.url);
  const skillNames = SKILLS.map((s) => s.name);

  // Common Person definition
  const personBase = {
    '@type': 'Person',
    name: PROFILE.name,
    jobTitle: PROFILE.title,
    description: PROFILE.bio,
    url: SEO_CONFIG.siteUrl,
    image: `${SEO_CONFIG.siteUrl}${SEO_CONFIG.ogImage}`,
    email: PROFILE.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Cairo',
      addressCountry: 'EG',
    },
    sameAs: sameAsUrls,
    knowsAbout: skillNames,
  };

  if (type === 'resume') {
    const resumeSchema = {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      mainEntity: {
        ...personBase,
        url: `${SEO_CONFIG.siteUrl}/resume`,
        alumniOf: {
          '@type': 'EducationalOrganization',
          name: 'Sinai University',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Arish',
            addressCountry: 'EG',
          },
        },
      },
    };

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(resumeSchema) }}
      />
    );
  }

  // Home schemas: Person + WebSite
  const personSchema = {
    '@context': 'https://schema.org',
    ...personBase,
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SEO_CONFIG.siteName,
    url: SEO_CONFIG.siteUrl,
    description: SEO_CONFIG.siteDescription,
    author: {
      '@type': 'Person',
      name: PROFILE.name,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
