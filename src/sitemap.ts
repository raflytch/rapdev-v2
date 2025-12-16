import { MetadataRoute } from 'next';
import { SITE_METADATA } from '@/constants';

/**
 * Generate sitemap for SEO optimization
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_METADATA.url;
  const currentDate = new Date();

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
