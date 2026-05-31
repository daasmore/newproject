"use client";
export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] gap-4 p-6">
      <p className="text-white/60 text-center">Terjadi kesalahan</p>
      <button onClick={reset} className="px-4 py-2 rounded-lg bg-white/[0.06] text-white/60 hover:bg-white/[0.1] transition-colors text-sm">
        Coba Lagi
      </button>
    </div>
  );
}
