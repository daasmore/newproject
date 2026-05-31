'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';

export default function HeroSection() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background orbs */}
      <motion.div style={{ opacity, scale }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full bg-amber-500/[0.04] blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-amber-600/[0.03] blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-amber-400/[0.02] blur-[200px]" />
      </motion.div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'linear-gradient(rgba(212,165,116,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,165,116,0.3) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      {/* Corner ornaments */}
      <motion.svg
        className="absolute top-6 left-6 w-32 h-32 md:w-48 md:h-48 opacity-[0.07]"
        viewBox="0 0 200 200" fill="none"
        initial={{ opacity: 0, rotate: -10 }}
        animate={{ opacity: 0.07, rotate: 0 }}
        transition={{ duration: 2 }}
      >
        <path d="M0 0 Q50 30 40 80 Q30 120 10 160" stroke="#d4a574" strokeWidth="0.5" fill="none" />
        <path d="M0 10 Q40 40 35 75 Q30 100 20 140" stroke="#d4a574" strokeWidth="0.3" fill="none" />
        <circle cx="40" cy="80" r="3" fill="#d4a574" opacity="0.5" />
        <circle cx="25" cy="120" r="2" fill="#d4a574" opacity="0.3" />
        <path d="M10 55 L20 40 L30 55 L20 70Z" fill="#d4a574" opacity="0.25" />
      </motion.svg>
      <motion.svg
        className="absolute bottom-6 right-6 w-32 h-32 md:w-48 md:h-48 opacity-[0.07] scale-[-1]"
        viewBox="0 0 200 200" fill="none"
        initial={{ opacity: 0, rotate: 10 }}
        animate={{ opacity: 0.07, rotate: 0 }}
        transition={{ duration: 2, delay: 0.3 }}
      >
        <path d="M0 0 Q50 30 40 80 Q30 120 10 160" stroke="#d4a574" strokeWidth="0.5" fill="none" />
        <circle cx="40" cy="80" r="3" fill="#d4a574" opacity="0.5" />
        <path d="M10 55 L20 40 L30 55 L20 70Z" fill="#d4a574" opacity="0.25" />
      </motion.svg>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/15 bg-amber-500/[0.04] mb-10"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-[11px] text-amber-400/70 tracking-[0.2em] uppercase font-[Inter]">
            Platform Undangan Digital Premium
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 0.9, 0.36, 1] }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] mb-8 tracking-tight font-[Playfair_Display]"
        >
          <span className="block text-white">Undangan</span>
          <span className="block text-shimmer mt-2">Digital Premium</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-base md:text-lg text-white/35 max-w-2xl mx-auto leading-relaxed font-[Inter] mb-14"
        >
          Buat undangan pernikahan elegan dengan template pilihan.
          RSVP online, peta interaktif, love story, galeri foto, dan pengiriman otomatis.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href="/register"
            className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold text-base hover:shadow-xl hover:shadow-amber-500/20 transition-all duration-500 font-[Playfair_Display] tracking-tight"
          >
            Buat Undangan Gratis
            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
          </Link>
          <Link
            href="#tema"
            className="px-8 py-4 rounded-2xl border border-white/8 text-white/50 font-medium text-base hover:border-amber-500/20 hover:text-amber-400/80 transition-all duration-500 font-[Inter]"
          >
            Lihat Template
          </Link>
        </motion.div>

        {/* Quick stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-16 flex items-center justify-center gap-8 md:gap-12"
        >
          {[
            { value: '3', label: 'Template Premium' },
            { value: '100%', label: 'Gratis' },
            { value: '∞', label: 'Tamu Undangan' },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-lg md:text-xl font-bold text-amber-400/80 font-[Playfair_Display]">{s.value}</div>
              <div className="text-[10px] text-white/20 tracking-wider uppercase font-[Inter] mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border border-white/10 flex items-start justify-center p-1.5"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
