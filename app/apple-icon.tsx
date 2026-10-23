import { ImageResponse } from 'next/og';
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';
export default function AppleIcon() {
  const dots = [0, 60, 120, 180, 240, 300].map((a) => [32 + 20 * Math.cos((a * Math.PI) / 180), 32 + 20 * Math.sin((a * Math.PI) / 180)]);
  return new ImageResponse(
    (
      <svg width="180" height="180" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <rect width="64" height="64" fill="#A8677A" />
        <circle cx="32" cy="32" r="11" fill="#FFFCF8" />
        {dots.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="4.5" fill="#F3D9A4" />)}
      </svg>
    ),
    size,
  );
}
