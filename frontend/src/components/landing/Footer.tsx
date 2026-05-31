'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/4 bg-[#06060c]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold font-[Playfair_Display] text-white/90 mb-3">
              Wedding<span className="text-gradient">Inv</span>
            </h3>
            <p className="text-sm text-white/25 font-[Inter] leading-relaxed max-w-sm">
              Platform undangan digital premium untuk momen spesial pernikahan Anda.
              Elegan, modern, dan mudah digunakan.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs font-semibold text-white/40 tracking-[0.2em] uppercase mb-4 font-[Inter]">Navigasi</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Beranda', href: '/' },
                { label: 'Fitur', href: '/#fitur' },
                { label: 'Template', href: '/#tema' },
                { label: 'Masuk', href: '/login' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/20 hover:text-amber-400/70 transition-colors font-[Inter]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold text-white/40 tracking-[0.2em] uppercase mb-4 font-[Inter]">Kontak</h4>
            <ul className="space-y-2.5 text-sm text-white/20 font-[Inter]">
              <li>hello@weddinginv.id</li>
              <li>+62 812-3456-7890</li>
              <li className="flex gap-3 pt-2">
                {['IG', 'TW', 'YT'].map((s) => (
                  <span key={s} className="w-8 h-8 rounded-lg bg-white/4 border border-white/6 flex items-center justify-center text-[10px] text-white/30 hover:text-amber-400/60 hover:border-amber-500/15 cursor-pointer transition-all">
                    {s}
                  </span>
                ))}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/15 font-[Inter]">
            © {new Date().getFullYear()} WeddingInv. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-xs text-white/15 hover:text-white/30 transition-colors font-[Inter]">Privacy</Link>
            <Link href="/terms" className="text-xs text-white/15 hover:text-white/30 transition-colors font-[Inter]">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
