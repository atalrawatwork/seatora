// Renders nothing until you set NEXT_PUBLIC_ADSENSE_ID (and add a consent banner). Keeps ad positions ready.
export default function AdSlot() {
  if (!process.env.NEXT_PUBLIC_ADSENSE_ID) return null;
  return <aside className="ad" aria-label="Advertisement" data-ad-slot />;
}
