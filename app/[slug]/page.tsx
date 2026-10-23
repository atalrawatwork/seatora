import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import SeatingChart from '@/components/SeatingChart';
import Budget from '@/components/Budget';
import AdSlot from '@/components/AdSlot';
import { PAGES, SITE, getPage } from '@/lib/site';

export const dynamicParams = false;
export const generateStaticParams = () => PAGES.map((p) => ({ slug: p.slug }));
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getPage((await params).slug);
  if (!p) return {};
  return { title: p.title, description: p.desc, alternates: { canonical: `/${p.slug}/` }, openGraph: { title: p.title, description: p.desc, url: `${SITE}/${p.slug}/` } };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const p = getPage((await params).slug);
  if (!p) notFound();
  const isTool = p.kind !== 'text';
  const ld = isTool ? { '@context': 'https://schema.org', '@type': 'WebApplication', name: p.h1, url: `${SITE}/${p.slug}/`, applicationCategory: 'LifestyleApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } } : null;
  return (
    <div className="wrap" style={{ paddingTop: 36 }}>
      {ld && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />}
      <nav aria-label="Breadcrumb" className="muted" style={{ fontSize: 14 }}><Link href="/">Home</Link> / {p.h1}</nav>
      <h1 style={{ marginTop: 12 }}>{p.h1}</h1>
      <p className="muted" style={{ fontSize: 18, maxWidth: 680 }}>{p.intro}</p>
      {p.kind === 'seating' && <SeatingChart storageKey={p.slug} />}
      {p.kind === 'budget' && <Budget />}
      {isTool && <AdSlot />}
      {p.body.map(([h, t]) => <section key={h}><h2>{h}</h2><p style={{ maxWidth: 740 }}>{t}</p></section>)}
      {p.faqs && <><h2>FAQ</h2>{p.faqs.map(([q, a]) => <p key={q}><strong>{q}</strong><br />{a}</p>)}</>}
      {isTool && <><h2>More tools</h2><div className="grid">{PAGES.filter((x) => x.kind !== 'text' && x.slug !== p.slug).map((x) => <Link key={x.slug} className="card" href={`/${x.slug}/`}><h3>{x.h1}</h3></Link>)}</div></>}
    </div>
  );
}
