'use client';
import { useState } from 'react';

const CATS: [string, number][] = [['Venue & catering', 45], ['Photography & video', 12], ['Attire & beauty', 9], ['Flowers & decor', 8], ['Music & entertainment', 7], ['Stationery & gifts', 4], ['Transport', 3], ['Rings', 4], ['Contingency', 8]];
export default function Budget() {
  const [total, setTotal] = useState(25000);
  const [guests, setGuests] = useState(100);
  const [cur, setCur] = useState('USD');
  const [pct, setPct] = useState(CATS.map((c) => c[1]));
  const sum = pct.reduce((a, b) => a + b, 0);
  const fmt = (n: number) => new Intl.NumberFormat('en', { style: 'currency', currency: cur, maximumFractionDigits: 0 }).format(n);
  return (
    <div className="tool two">
      <div className="card">
        <label htmlFor="cur">Currency</label>
        <select id="cur" value={cur} onChange={(e) => setCur(e.target.value)}><option value="USD">US dollar ($)</option><option value="GBP">British pound (£)</option><option value="EUR">Euro (€)</option></select>
        <label htmlFor="tot">Total budget</label>
        <input id="tot" type="number" min={0} value={total} onChange={(e) => setTotal(Math.max(0, +e.target.value || 0))} />
        <label htmlFor="gs">Guests</label>
        <input id="gs" type="number" min={1} value={guests} onChange={(e) => setGuests(Math.max(1, +e.target.value || 1))} />
        <p style={{ marginTop: 16 }}><span className="pill">Cost per guest</span> <strong>{fmt(total / guests)}</strong></p>
      </div>
      <div className="card">
        <table className="b"><tbody>
          {CATS.map(([name], i) => (
            <tr key={name}><td><label htmlFor={`p${i}`} style={{ margin: 0 }}>{name}</label></td>
              <td><input id={`p${i}`} type="number" min={0} max={100} value={pct[i]} onChange={(e) => setPct(pct.map((v, j) => (j === i ? Math.max(0, Math.min(100, +e.target.value || 0)) : v)))} /> %</td>
              <td style={{ textAlign: 'right' }}><strong>{fmt((total * pct[i]) / 100)}</strong></td></tr>
          ))}
        </tbody></table>
        <p style={{ color: sum === 100 ? 'inherit' : '#b23b37' }}>Total allocated: {sum}% {sum !== 100 && '(should equal 100%)'}</p>
      </div>
    </div>
  );
}
