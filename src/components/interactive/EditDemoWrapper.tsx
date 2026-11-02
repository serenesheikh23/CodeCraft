'use client';
import dynamic from 'next/dynamic';

export const EditDemo = dynamic(() => import('./EditDemo'), {
  ssr: false,
  loading: () => <div className="h-40 bg-surface border border-border rounded-lg animate-pulse" />,
});
