import type { Metadata } from 'next';
import Link from 'next/link';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import './globals.css';
import { SITE } from '@/lib/site';
import Logo from '@/components/Logo';
//google analytics
import { GoogleAnalytics } from '@next/third-parties/google';

const serif = Cormorant_Garamond({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--f-serif' });
const sans = Manrope({ subsets: ['latin'], variable: '--f-sans' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: 'Seatora – Free Wedding Seating Chart & Budget Tools',
  description: 'Free wedding planning tools: seating chart maker, table plan maker and budget calculator. No sign-up needed.',
  alternates: { canonical: '/' },
  openGraph: { siteName: 'Seatora', type: 'website', title: 'Seatora – Free Wedding Planning Tools' },
  verification: {
    google: "5qBtk0UUBU7xmo0ZSVbWTw0ZIrr5zAVl_DSOP_rDSa8", 
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <header className="top"><div className="wrap">
          <Link href="/" className="logo" aria-label="Seatora home"><Logo size={34} /><span>Seat<b>ora</b></span></Link>
          <nav aria-label="Main">
            <Link href="/wedding-seating-chart-maker/">Seating Chart</Link>
            <Link href="/wedding-table-plan-maker/">Table Plan</Link>
            <Link href="/wedding-budget-calculator/">Budget</Link>
            <Link href="/about/">About</Link>
          </nav>
        </div></header>
        <main>{children}</main>
        <footer><div className="wrap">
          <div><strong className="logo">Seatora</strong><p>Free, simple wedding planning tools.</p></div>
          <div><strong>Tools</strong><Link href="/wedding-seating-chart-maker/">Seating Chart Maker</Link><Link href="/wedding-table-plan-maker/">Table Plan Maker</Link><Link href="/wedding-budget-calculator/">Budget Calculator</Link></div>
          <div><strong>Company</strong><Link href="/about/">About</Link><Link href="/contact/">Contact</Link><Link href="/privacy-policy/">Privacy Policy</Link><Link href="/terms/">Terms</Link><Link href="/cookie-policy/">Cookie Policy</Link></div>
        </div></footer>

              <GoogleAnalytics gaId="G-0WG6PSKT42" />

      </body>
    </html>
  );
}
