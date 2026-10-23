import type { MetadataRoute } from 'next';
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Seatora', short_name: 'Seatora', description: 'Free wedding seating chart, table plan and budget tools.',
    start_url: '/', display: 'standalone', background_color: '#FFFCF8', theme_color: '#A8677A',
    icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' }],
  };
}
