export default function Logo({ size = 32 }: { size?: number }) {
  const dots = [0, 60, 120, 180, 240, 300].map((a) => [32 + 20 * Math.cos((a * Math.PI) / 180), 32 + 20 * Math.sin((a * Math.PI) / 180)]);
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <rect width="64" height="64" rx="16" fill="#A8677A" />
      <circle cx="32" cy="32" r="11" fill="#FFFCF8" />
      {dots.map(([x, y], i) => <circle key={i} cx={x.toFixed(1)} cy={y.toFixed(1)} r="4.5" fill="#F3D9A4" />)}
    </svg>
  );
}
