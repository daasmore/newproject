import { useState, useEffect } from "react";
import { Link } from "react-router";
import { ChevronDown, MapPin, Calendar, Clock, Music, ArrowLeft } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export default function TemplatePreview() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#040D09] font-serif text-[#f3e5ab] selection:bg-[#d4af37] selection:text-[#040D09] overflow-x-hidden">
      {/* Back to Dashboard Button (Appears on Hover or Fixed Top) */}
      <div className="fixed top-6 left-6 z-50">
        <Link to="/" className="flex items-center gap-2 px-4 py-2 bg-[#040D09]/80 backdrop-blur-md border border-[#d4af37]/30 text-[#d4af37] text-sm font-sans font-medium rounded-full hover:bg-[#d4af37] hover:text-[#040D09] transition-all">
          <ArrowLeft className="w-4 h-4" /> Kembali
        </Link>
      </div>

      {/* Floating Music Button */}
      <button className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-[#d4af37] text-[#040D09] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.3)] animate-spin-slow">
        <Music className="w-5 h-5" />
      </button>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Background Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.05] mix-blend-overlay z-0"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1632610992723-82d7c212f6d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwaW52aXRhdGlvbiUyMHBhdHRlcm4lMjBnb2xkfGVufDF8fHx8MTc4MDMwMTAyOXww&ixlib=rb-4.1.0&q=80&w=1080')`, backgroundSize: 'cover' }}
        />
        
        {/* Image Frame */}
        <div 
          className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        >
          <div className="w-[80vw] md:w-[40vw] max-w-[500px] aspect-[3/4] rounded-t-[50%] overflow-hidden border border-[#d4af37]/40 p-2">
            <div className="w-full h-full rounded-t-[50%] overflow-hidden">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1745704474543-b7a65ae075ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGphdmFuZXNlJTIwYnJpZGUlMjBhbmQlMjBncm9vbXxlbnwxfHx8fDE3ODAzMDEwMjl8MA&ixlib=rb-4.1.0&q=80&w=1080" 
                alt="Rizky and Andin"
                className="w-full h-full object-cover object-top opacity-80"
              />
            </div>
          </div>
        </div>

        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#040D09] via-[#040D09]/50 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#040D09] via-transparent to-transparent z-10" />

        {/* Content */}
        <div className="relative z-20 text-center mt-auto pb-32 space-y-6">
          <p className="tracking-[0.3em] text-xs uppercase text-[#d4af37] font-sans">Pernikahan Adat Jawa</p>
          <h1 className="text-6xl md:text-8xl italic font-light drop-shadow-2xl">Rizky & Andin</h1>
          <p className="text-lg md:text-xl text-gray-400 font-light">12 . 10 . 2026</p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 z-20 flex flex-col items-center gap-2 animate-bounce opacity-70">
          <span className="text-[10px] uppercase tracking-widest font-sans">Scroll</span>
          <ChevronDown className="w-4 h-4" />
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-24 px-6 relative z-20 bg-[#040D09]">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="w-12 h-px bg-[#d4af37] mx-auto opacity-50" />
          <p className="text-xl md:text-2xl leading-relaxed italic text-gray-300">
            "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya."
          </p>
          <p className="text-sm font-sans text-[#d4af37] tracking-widest uppercase">Ar-Rum 21</p>
          <div className="w-12 h-px bg-[#d4af37] mx-auto opacity-50" />
        </div>
      </section>

      {/* Event Details Section */}
      <section className="py-24 px-6 relative z-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl italic text-[#d4af37]">Rangkaian Acara</h2>
            <p className="font-sans text-sm tracking-widest text-gray-400 uppercase">Save the Date</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Akad */}
            <div className="relative p-8 md:p-12 border border-[#d4af37]/20 rounded-2xl bg-[#020704]/50 backdrop-blur-sm group hover:border-[#d4af37]/50 transition-colors">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#040D09] px-4">
                <span className="font-sans text-xs tracking-widest text-[#d4af37] uppercase">Akad Nikah</span>
              </div>
              
              <div className="space-y-8 text-center mt-4">
                <div className="space-y-2">
                  <h3 className="text-3xl italic">Sabtu, 12 Oktober</h3>
                  <p className="font-sans text-gray-400">2026</p>
                </div>
                
                <div className="space-y-4 font-sans text-sm text-gray-300">
                  <div className="flex items-center justify-center gap-3">
                    <Clock className="w-4 h-4 text-[#d4af37]" />
                    <span>08:00 WIB - Selesai</span>
                  </div>
                  <div className="flex items-start justify-center gap-3 max-w-xs mx-auto">
                    <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-1" />
                    <span>Masjid Agung Jawa Tengah<br/>Jl. Gajah Raya, Semarang</span>
                  </div>
                </div>

                <button className="px-6 py-3 border border-[#d4af37] text-[#d4af37] font-sans text-xs tracking-widest uppercase hover:bg-[#d4af37] hover:text-[#040D09] transition-all">
                  Lihat Lokasi
                </button>
              </div>
            </div>

            {/* Resepsi */}
            <div className="relative p-8 md:p-12 border border-[#d4af37]/20 rounded-2xl bg-[#020704]/50 backdrop-blur-sm group hover:border-[#d4af37]/50 transition-colors">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#040D09] px-4">
                <span className="font-sans text-xs tracking-widest text-[#d4af37] uppercase">Resepsi</span>
              </div>
              
              <div className="space-y-8 text-center mt-4">
                <div className="space-y-2">
                  <h3 className="text-3xl italic">Sabtu, 12 Oktober</h3>
                  <p className="font-sans text-gray-400">2026</p>
                </div>
                
                <div className="space-y-4 font-sans text-sm text-gray-300">
                  <div className="flex items-center justify-center gap-3">
                    <Clock className="w-4 h-4 text-[#d4af37]" />
                    <span>11:00 WIB - 14:00 WIB</span>
                  </div>
                  <div className="flex items-start justify-center gap-3 max-w-xs mx-auto">
                    <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-1" />
                    <span>Patra Semarang Hotel & Convention<br/>Jl. Sisingamangaraja, Semarang</span>
                  </div>
                </div>

                <button className="px-6 py-3 border border-[#d4af37] text-[#d4af37] font-sans text-xs tracking-widest uppercase hover:bg-[#d4af37] hover:text-[#040D09] transition-all">
                  Lihat Lokasi
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Decor Section */}
      <section className="py-24 px-6 relative z-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 w-full relative">
             <div className="aspect-square md:aspect-[4/5] overflow-hidden rounded-tr-[4rem] rounded-bl-[4rem] border border-[#d4af37]/30">
               <ImageWithFallback 
                src="https://images.unsplash.com/photo-1744805624954-a6686543c3ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGphdmFuZXNlJTIvd2VkZGluZyUyMGRlY29yYXRpb258ZW58MXx8fHwxNzgwMzAxMDI5fDA&ixlib=rb-4.1.0&q=80&w=1080" 
                alt="Javanese Decoration"
                className="w-full h-full object-cover opacity-80"
              />
             </div>
             {/* Decorative element */}
             <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-[#d4af37] rounded-tr-[2rem] rounded-bl-[2rem] -z-10" />
          </div>
          <div className="flex-1 space-y-6 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl italic text-[#d4af37]">Nuansa Tradisi</h2>
            <p className="text-gray-400 leading-relaxed font-sans font-light">
              Menyatukan dua keluarga dalam balutan adat Jawa yang sakral dan penuh makna. Setiap detail mengisahkan doa dan harapan untuk perjalanan hidup yang baru.
            </p>
          </div>
        </div>
      </section>

      {/* RSVP Form Preview */}
      <section className="py-24 px-6 relative z-20 bg-[#020704] border-t border-[#d4af37]/10">
        <div className="max-w-md mx-auto text-center space-y-8">
          <h2 className="text-4xl italic text-[#d4af37]">RSVP</h2>
          <p className="font-sans text-sm text-gray-400">Kehadiran Anda adalah anugerah terindah bagi kami.</p>
          
          <div className="space-y-4 font-sans text-left">
            <input 
              type="text" 
              placeholder="Nama Lengkap" 
              className="w-full bg-[#040D09] border border-[#d4af37]/30 px-4 py-3 text-white focus:outline-none focus:border-[#d4af37] transition-colors"
            />
            <select className="w-full bg-[#040D09] border border-[#d4af37]/30 px-4 py-3 text-white focus:outline-none focus:border-[#d4af37] transition-colors appearance-none">
              <option value="">Konfirmasi Kehadiran</option>
              <option value="hadir">Ya, Saya akan hadir</option>
              <option value="tidak">Maaf, Saya tidak bisa hadir</option>
            </select>
            <select className="w-full bg-[#040D09] border border-[#d4af37]/30 px-4 py-3 text-white focus:outline-none focus:border-[#d4af37] transition-colors appearance-none">
              <option value="1">1 Orang</option>
              <option value="2">2 Orang</option>
            </select>
            <button className="w-full bg-[#d4af37] text-[#040D09] font-bold uppercase tracking-widest py-4 hover:bg-[#b89445] transition-colors">
              Kirim Konfirmasi
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center text-gray-500 font-sans text-xs tracking-widest uppercase border-t border-[#d4af37]/10">
        <p>Made with WeddingKu &copy; 2026</p>
      </footer>
    </div>
  );
}