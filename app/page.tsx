import Link from 'next/link';
import { PAGES, SITE } from '@/lib/site';

export default function Home() {
  const tools = PAGES.filter((p) => p.kind !== 'text');
  const ld = [{ '@context': 'https://schema.org', '@type': 'WebSite', name: 'Seatora', url: SITE }, { '@context': 'https://schema.org', '@type': 'Organization', name: 'Seatora', url: SITE, logo: `${SITE}/icon.svg` }];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <section className="hero"><div className="wrap">
        <span className="pill">Free · No sign-up</span>
        <h1>Wedding planning tools,<br />beautifully simple.</h1>
        <p>Plan your seating, build your table plan and split your budget in minutes. Made for couples in the US, UK and beyond.</p>
        <div className="row"><Link className="btn" href="/wedding-seating-chart-maker/">Start your seating chart</Link><Link className="btn ghost" href="/wedding-budget-calculator/">Budget calculator</Link></div>
      </div></section>
      <div className="wrap">
        <h2>Our tools</h2>
        <div className="grid">{tools.map((t) => <Link key={t.slug} href={`/${t.slug}/`} className="card"><h3>{t.h1}</h3><p className="muted">{t.intro}</p></Link>)}</div>
        <h2>Why couples use Seatora</h2>
        <div className="grid">
          <div className="card"><h3>Private</h3><p className="muted">Your guest list stays in your browser. Nothing is uploaded.</p></div>
          <div className="card"><h3>Quick</h3><p className="muted">No account, no setup. Open a tool and start planning.</p></div>
          <div className="card"><h3>Works on your phone</h3><p className="muted">Fully responsive, so you can plan on the go.</p></div>
        </div>
      </div>
    </>
  );
}
