'use client';

import { motion } from 'framer-motion';

const features = [
  { icon: '✉️', title: 'Undangan Digital', desc: 'Desain elegan dengan template premium yang bisa dikustomisasi sepenuhnya.' },
  { icon: '📝', title: 'RSVP Online', desc: 'Tamu konfirmasi kehadiran langsung melalui link undangan pribadi.' },
  { icon: '🗺️', title: 'Peta Interaktif', desc: 'Integrasi Google Maps untuk multi-lokasi acara pernikahan.' },
  { icon: '📖', title: 'Love Story', desc: 'Tampilkan kisah cinta dengan timeline yang indah dan personal.' },
  { icon: '🖼️', title: 'Galeri Foto', desc: 'Album foto dengan lightbox dan navigasi yang smooth.' },
  { icon: '🎁', title: 'Hadiah Digital', desc: 'Info rekening & e-wallet dengan tombol salin satu klik.' },
  { icon: '💬', title: 'Ucapan Tamu', desc: 'Wall ucapan dari tamu undangan yang tersimpan rapi.' },
  { icon: '🎵', title: 'Background Musik', desc: 'Musik otomatis dengan kontrol play/pause untuk tamu.' },
  { icon: '📊', title: 'Dashboard Admin', desc: 'Pantau statistik RSVP dan kehadiran secara real-time.' },
];

export default function FeaturesSection() {
  return (
    <section id="fitur" className="relative py-32 md:py-40">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <p className="text-amber-400/50 text-xs tracking-[0.3em] uppercase font-[Inter] mb-4">Fitur Lengkap</p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-[Playfair_Display] tracking-tight max-w-3xl">
            Semua Yang <span className="text-shimmer">Dibutuhkan</span>
          </h2>
          <p className="text-white/30 mt-4 max-w-lg font-[Inter] leading-relaxed text-sm">
            Platform undangan digital terintegrasi — dari pembuatan hingga pengiriman, semua dalam satu dashboard.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group p-7 rounded-2xl glass-card cursor-default"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/10 flex items-center justify-center text-2xl mb-5 group-hover:scale-110 group-hover:border-amber-500/20 transition-all duration-500">
                {f.icon}
              </div>
              <h3 className="text-base font-semibold mb-2 text-white/85 font-[Playfair_Display]">{f.title}</h3>
              <p className="text-sm text-white/30 leading-relaxed font-[Inter]">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
