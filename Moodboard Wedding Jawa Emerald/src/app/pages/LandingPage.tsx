import { Link } from "react-router";
import { ArrowRight, Sparkles, Image as ImageIcon, Users, Palette, CheckCircle2 } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#040D09] text-white overflow-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-emerald-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#b89445]/10 blur-[120px] rounded-full" />
        <div 
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1632610992723-82d7c212f6d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwaW52aXRhdGlvbiUyMHBhdHRlcm4lMjBnb2xkfGVufDF8fHx8MTc4MDMwMTAyOXww&ixlib=rb-4.1.0&q=80&w=1080')`, backgroundSize: 'cover' }}
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 px-6 lg:px-12 py-6 flex items-center justify-between">
        <div className="text-2xl font-serif text-[#d4af37] tracking-wider">
          WeddingKu
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <a href="#features" className="hover:text-[#d4af37] transition-colors">Fitur</a>
          <a href="#templates" className="hover:text-[#d4af37] transition-colors">Tema</a>
          <a href="#pricing" className="hover:text-[#d4af37] transition-colors">Harga</a>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="text-sm font-medium hover:text-[#d4af37] transition-colors hidden sm:block">
            Masuk
          </Link>
          <Link to="/dashboard" className="px-5 py-2.5 bg-[#d4af37] text-[#040D09] text-sm font-bold rounded-full hover:bg-[#b89445] transition-colors">
            Mulai Buat
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 pt-16 pb-24 lg:pt-32 lg:pb-40 px-6 lg:px-12 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        <div className="flex-1 space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/50 border border-emerald-800/50 text-emerald-400 text-sm font-medium">
            <Sparkles className="w-4 h-4" /> Builder Undangan Digital #1
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-serif leading-[1.1] tracking-tight">
            Ceritakan Kisah <br className="hidden lg:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#f3e5ab] italic">
              Cinta Anda
            </span>
          </h1>
          
          <p className="text-lg text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Buat undangan pernikahan digital elegan dengan sentuhan budaya Indonesia. Mudah, cepat, dan cantik dalam hitungan menit.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
            <Link to="/dashboard" className="w-full sm:w-auto px-8 py-4 bg-[#d4af37] text-[#040D09] font-bold rounded-full hover:bg-[#b89445] transition-all hover:scale-105 flex items-center justify-center gap-2">
              Buat Undangan Sekarang <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/preview/javanese-heritage" className="w-full sm:w-auto px-8 py-4 border border-[#d4af37]/30 text-[#d4af37] font-medium rounded-full hover:bg-[#d4af37]/10 transition-colors flex items-center justify-center">
              Lihat Demo
            </Link>
          </div>
          
          <div className="pt-8 flex items-center justify-center lg:justify-start gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Tanpa Coding
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 50+ Tema Premium
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> RSVP Otomatis
            </div>
          </div>
        </div>
        
        <div className="flex-1 relative w-full max-w-lg lg:max-w-none">
          <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden border border-emerald-900/30 shadow-2xl shadow-emerald-900/20 rotate-2 hover:rotate-0 transition-transform duration-700">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1745704474543-b7a65ae075ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGphdmFuZXNlJTIwYnJpZGUlMjBhbmQlMjBncm9vbXxlbnwxfHx8fDE3ODAzMDEwMjl8MA&ixlib=rb-4.1.0&q=80&w=1080" 
              alt="Traditional Javanese Bride and Groom"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#040D09] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="bg-[#040D09]/80 backdrop-blur-md p-4 rounded-xl border border-[#d4af37]/20 flex items-center gap-4">
                <div className="w-12 h-12 bg-[#d4af37]/20 rounded-full flex items-center justify-center text-[#d4af37]">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">RSVP Masuk</p>
                  <p className="text-xl font-bold text-white">Budi & Sarah <span className="text-[#d4af37] text-sm ml-2">Hadir (2)</span></p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-emerald-800 rounded-full blur-[40px] opacity-50" />
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#d4af37] rounded-full blur-[40px] opacity-20" />
        </div>
      </main>
      
      {/* Features Section */}
      <section id="features" className="relative z-10 py-24 bg-[#020704] border-t border-emerald-900/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-5xl font-serif text-[#d4af37] mb-6">Fitur Lengkap & Elegan</h2>
            <p className="text-gray-400">Semua yang Anda butuhkan untuk mengelola undangan digital dengan mudah dan profesional.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-emerald-950/20 border border-emerald-900/30 hover:bg-emerald-950/40 transition-colors">
              <Palette className="w-10 h-10 text-[#d4af37] mb-6" />
              <h3 className="text-xl font-bold text-white mb-3">Tema Kustom</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Beragam pilihan tema mulai dari modern, floral, hingga tradisional Jawa & Sunda yang elegan.</p>
            </div>
            <div className="p-8 rounded-2xl bg-emerald-950/20 border border-emerald-900/30 hover:bg-emerald-950/40 transition-colors">
              <Users className="w-10 h-10 text-[#d4af37] mb-6" />
              <h3 className="text-xl font-bold text-white mb-3">Manajemen Tamu</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Kelola daftar tamu, tracking RSVP, dan integrasi pengiriman via WhatsApp dengan mudah.</p>
            </div>
            <div className="p-8 rounded-2xl bg-emerald-950/20 border border-emerald-900/30 hover:bg-emerald-950/40 transition-colors">
              <ImageIcon className="w-10 h-10 text-[#d4af37] mb-6" />
              <h3 className="text-xl font-bold text-white mb-3">Galeri & Cerita</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Tampilkan foto prewedding terbaik Anda dan ceritakan perjalanan cinta Anda dalam timeline interaktif.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}