'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="relative py-32">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/[0.02] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-3xl p-12 md:p-20 border border-white/5"
        >
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-amber-500/[0.05] blur-[200px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-amber-600/[0.03] blur-[150px] translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="flex-1 text-left">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-[Playfair_Display] tracking-tight mb-6">
                Siap Membuat<br />
                <span className="text-shimmer">Undangan Impian?</span>
              </h2>
              <p className="text-white/30 font-[Inter] leading-relaxed max-w-lg text-sm">
                Daftar gratis, pilih template, isi data, dan bagikan undangan digital premium ke semua tamu dalam hitungan menit.
              </p>
            </div>
            <div className="flex flex-col gap-4 shrink-0">
              <Link
                href="/register"
                className="px-10 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold text-base hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-500 font-[Playfair_Display] tracking-tight text-center"
              >
                Mulai Sekarang — Gratis
              </Link>
              <Link
                href="/login"
                className="px-10 py-4 rounded-2xl border border-white/8 text-white/50 font-medium text-base hover:border-amber-500/20 hover:text-amber-400/80 transition-all duration-500 text-center font-[Inter]"
              >
                Sudah Punya Akun?
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
