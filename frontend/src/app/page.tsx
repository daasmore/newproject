import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-20 text-center">
        <div className="max-w-2xl mx-auto space-y-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-amber-900 leading-tight">
            Undangan Digital
            <span className="block text-amber-600">Pernikahan</span>
            <span className="block text-3xl sm:text-4xl md:text-5xl mt-2">Elegan & Modern</span>
          </h1>
          <p className="text-lg sm:text-xl text-amber-700/70 max-w-md mx-auto">
            Buat undangan pernikahan digital interaktif dengan mudah. Bagikan momen spesial Anda kepada orang-orang terkasih.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold rounded-full bg-amber-600 text-white hover:bg-amber-700 transition shadow-lg"
            >
              Mulai Gratis
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold rounded-full border-2 border-amber-300 text-amber-800 hover:bg-amber-100 transition"
            >
              Masuk
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto w-full px-4">
          <div className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-sm border border-amber-100">
            <div className="text-3xl mb-3">🎨</div>
            <h3 className="text-lg font-semibold text-amber-900">Template Elegan</h3>
            <p className="text-sm text-amber-700/60 mt-1">Pilih dari berbagai template indah dan dapatkan desain profesional</p>
          </div>
          <div className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-sm border border-amber-100">
            <div className="text-3xl mb-3">📱</div>
            <h3 className="text-lg font-semibold text-amber-900">Mobile Friendly</h3>
            <p className="text-sm text-amber-700/60 mt-1">Undangan tampil sempurna di semua perangkat — HP, tablet, desktop</p>
          </div>
          <div className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-sm border border-amber-100">
            <div className="text-3xl mb-3">💌</div>
            <h3 className="text-lg font-semibold text-amber-900">WhatsApp Blast</h3>
            <p className="text-sm text-amber-700/60 mt-1">Kirim undangan ke semua tamu sekaligus via WhatsApp dengan mudah</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-amber-600/50">
        © {new Date().getFullYear()} Wedding Invitation App — Dibuat dengan ❤️ untuk momen spesial Anda
      </footer>
    </div>
  );
}
