'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error('App error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#06060c] flex items-center justify-center px-6">
      <div className="text-center">
        <div className="text-5xl mb-4">😔</div>
        <h1 className="text-xl font-bold text-white font-[Playfair_Display] mb-2">Terjadi Kesalahan</h1>
        <p className="text-sm text-white/30 font-[Inter] mb-6">Maaf, terjadi masalah. Silakan coba lagi.</p>
        <button onClick={reset} className="px-6 py-3 rounded-xl btn-primary font-[Inter] text-sm">
          Coba Lagi
        </button>
      </div>
    </div>
  );
}
