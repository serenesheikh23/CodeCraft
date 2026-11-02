import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Code Craft | Websites for small businesses';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#EEF0F4',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
          <span style={{ fontSize: '64px', fontWeight: 800, fontFamily: 'sans-serif', color: '#0F1720', letterSpacing: '-0.04em' }}>
            codecraft<span style={{ color: '#2B45FF' }}>.</span>
          </span>
        </div>
        <div style={{ fontSize: '72px', fontWeight: 800, fontFamily: 'sans-serif', color: '#0F1720', lineHeight: 1.1, letterSpacing: '-0.03em', maxWidth: '900px' }}>
          Websites for small businesses that need customers.
        </div>
        <div style={{ marginTop: '60px', background: '#2B45FF', color: '#fff', padding: '16px 32px', borderRadius: '4px', fontSize: '24px', fontWeight: 500, fontFamily: 'sans-serif' }}>
          Book a free call
        </div>
      </div>
    ),
    { ...size }
  );
}
