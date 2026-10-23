import { ImageResponse } from 'next/og';
export const alt = 'Seatora – Free Wedding Seating Chart & Budget Tools';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 80, background: 'linear-gradient(135deg,#F8E9EC,#EEEAF8 60%,#E6EFE8)', color: '#2E2A33' }}>
        <div style={{ fontSize: 96, fontWeight: 700, color: '#8C4F63' }}>Seatora</div>
        <div style={{ fontSize: 48, marginTop: 16 }}>Free wedding seating chart, table plan & budget tools</div>
        <div style={{ fontSize: 30, marginTop: 28, color: '#6F6A75' }}>No sign-up · Works on your phone</div>
      </div>
    ),
    size,
  );
}
