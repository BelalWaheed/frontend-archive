import { SEO_CONFIG, PROFILE } from '@/lib/constants';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  noindex?: boolean;
}

/**
 * SEO component using React 19 native document metadata.
 * Tags render inside <head> automatically — no third-party library needed.
 */
export function SEO({
  title = SEO_CONFIG.siteName,
  description = SEO_CONFIG.siteDescription,
  keywords = SEO_CONFIG.keywords,
  canonical = SEO_CONFIG.siteUrl,
  ogType = 'website',
  ogImage = `${SEO_CONFIG.siteUrl}${SEO_CONFIG.ogImage}`,
  noindex = false,
}: SEOProps) {
  return (
    <>
      {/* Primary */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content={PROFILE.name} />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={SEO_CONFIG.siteName} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      {SEO_CONFIG.twitterHandle && (
        <meta name="twitter:creator" content={SEO_CONFIG.twitterHandle} />
      )}
    </>
  );
}
