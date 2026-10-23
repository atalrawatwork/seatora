'use client';
import { useEffect, useRef, useState } from 'react';
import { toPng } from 'html-to-image';

type Guest = { id: number; name: string; table: number };
export default function SeatingChart({ storageKey }: { storageKey: string }) {
  const [tables, setTables] = useState(8);
  const [seats, setSeats] = useState(8);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [text, setText] = useState('');
  const [ready, setReady] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const key = 'seatora:v1';

  useEffect(() => {
    try { const s = JSON.parse(localStorage.getItem(key) || 'null'); if (s) { setTables(s.tables); setSeats(s.seats); setGuests(s.guests); } } catch {}
    setReady(true);
  }, []);
  useEffect(() => { if (ready) try { localStorage.setItem(key, JSON.stringify({ tables, seats, guests })); } catch {} }, [tables, seats, guests, ready]);

  const add = () => {
    const names = text.split(/[\n,]+/).map((n) => n.trim()).filter(Boolean).slice(0, 300);
    if (!names.length) return;
    const base = Date.now();
    setGuests([...guests, ...names.map((name, i) => ({ id: base + i, name: name.slice(0, 60), table: 0 }))]);
    setText('');
  };
  const autoAssign = () => {
    const count = Array(tables + 1).fill(0);
    guests.forEach((g) => { if (g.table) count[g.table]++; });
    setGuests(guests.map((g) => {
      if (g.table) return g;
      const t = count.findIndex((c, i) => i > 0 && c < seats);
      if (t > 0) { count[t]++; return { ...g, table: t }; }
      return g;
    }));
  };
  const move = (id: number, table: number) => setGuests(guests.map((g) => (g.id === id ? { ...g, table } : g)));
  const remove = (id: number) => setGuests(guests.filter((g) => g.id !== id));
  const download = async () => {
    if (!ref.current) return;
    const url = await toPng(ref.current, { pixelRatio: 2, backgroundColor: '#FFFCF8' });
    const a = document.createElement('a'); a.href = url; a.download = 'seating-chart.png'; a.click();
  };
  const unassigned = guests.filter((g) => !g.table);
  const opts = Array.from({ length: tables }, (_, i) => i + 1);

  return (
    <div className="tool two">
      <div className="card">
        <div className="row" style={{ marginTop: 0 }}>
          <div style={{ flex: 1 }}><label htmlFor="nt">Tables</label><input id="nt" type="number" min={1} max={60} value={tables} onChange={(e) => setTables(Math.min(60, Math.max(1, +e.target.value || 1)))} /></div>
          <div style={{ flex: 1 }}><label htmlFor="ns">Seats per table</label><input id="ns" type="number" min={1} max={20} value={seats} onChange={(e) => setSeats(Math.min(20, Math.max(1, +e.target.value || 1)))} /></div>
        </div>
        <label htmlFor="gl">Add guests (one per line or comma separated)</label>
        <textarea id="gl" rows={4} value={text} onChange={(e) => setText(e.target.value)} placeholder={'Emma Clarke\nJames Clarke'} />
        <div className="row"><button className="btn" onClick={add}>Add guests</button><button className="btn ghost" onClick={autoAssign} disabled={!unassigned.length}>Auto-assign</button></div>
        <h3 style={{ marginTop: 18 }}>Unassigned ({unassigned.length})</h3>
        {unassigned.length === 0 && <p className="muted">{guests.length ? 'All guests are seated.' : 'No guests yet. Add some above.'}</p>}
        {unassigned.map((g) => (
          <div className="chip" key={g.id}><span>{g.name}</span>
            <span><label className="sr" htmlFor={`g${g.id}`} style={{ display: 'none' }}>Table for {g.name}</label>
              <select id={`g${g.id}`} value={0} onChange={(e) => move(g.id, +e.target.value)}><option value={0}>Seat at…</option>{opts.map((t) => <option key={t} value={t}>Table {t}</option>)}</select>
              <button aria-label={`Remove ${g.name}`} onClick={() => remove(g.id)} style={{ border: 0, background: 'none', cursor: 'pointer' }}>✕</button></span></div>
        ))}
      </div>
      <div>
        <div ref={ref} className="tables">
          {opts.map((t) => {
            const list = guests.filter((g) => g.table === t);
            const cls = list.length > seats ? 'over' : list.length === seats ? 'full' : '';
            return (
              <div key={t} className={`tbl ${cls}`}>
                <h4>Table {t} <span className="muted" style={{ fontSize: 13 }}>{list.length}/{seats}</span></h4>
                <ul>{list.map((g) => <li key={g.id} className="chip"><span>{g.name}</span>
                  <select aria-label={`Move ${g.name}`} value={t} onChange={(e) => move(g.id, +e.target.value)}><option value={0}>Unseat</option>{opts.map((o) => <option key={o} value={o}>T{o}</option>)}</select></li>)}</ul>
                {list.length > seats && <p style={{ color: '#b23b37', margin: '6px 0 0', fontSize: 13 }}>Over capacity</p>}
              </div>
            );
          })}
        </div>
        <div className="row"><button className="btn" onClick={download}>Download as image</button>
          <button className="btn ghost" onClick={() => { if (confirm('Clear all guests?')) setGuests([]); }}>Clear all</button></div>
      </div>
    </div>
  );
}
