import Link from 'next/link';
export default function NotFound() {
  return (
    <div className="wrap" style={{ padding: '80px 20px', textAlign: 'center' }}>
      <h1>Page not found</h1>
      <p className="muted">That page does not exist. Try one of our tools instead.</p>
      <div className="row" style={{ justifyContent: 'center' }}><Link className="btn" href="/wedding-seating-chart-maker/">Seating chart maker</Link><Link className="btn ghost" href="/">Home</Link></div>
    </div>
  );
}
