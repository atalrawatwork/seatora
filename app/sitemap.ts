import type { MetadataRoute } from 'next';
import { PAGES, SITE } from '@/lib/site';

const now = new Date();
export default function sitemap(): MetadataRoute.Sitemap {
  const tool = (k: string) => (k === 'text' ? 0.3 : 0.9);
  return [
    { url: `${SITE}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    ...PAGES.map((p) => ({ url: `${SITE}/${p.slug}/`, lastModified: now, changeFrequency: (p.kind === 'text' ? 'yearly' : 'monthly') as 'yearly' | 'monthly', priority: tool(p.kind) })),
  ];
}
