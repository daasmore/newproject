export default function Loading() {
  return (
    <div className="min-h-screen bg-[#06060c] flex items-center justify-center">
      <div className="text-center">
        <div className="w-10 h-10 border-2 border-amber-500/20 border-t-amber-500 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm text-white/30 font-[Inter]">Memuat...</p>
      </div>
    </div>
  );
}
