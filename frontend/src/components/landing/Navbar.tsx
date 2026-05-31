'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const links = [
    { label: 'Fitur', href: '/#fitur' },
    { label: 'Template', href: '/#tema' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass py-3 shadow-lg shadow-black/20' : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
              <span className="text-black font-bold text-sm font-[Playfair_Display]">W</span>
            </div>
            <span className="text-lg font-bold font-[Playfair_Display] text-white/90">
              Wedding<span className="text-gradient">Inv</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white/35 hover:text-amber-400/70 transition-colors font-[Inter]"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="px-5 py-2.5 rounded-xl text-sm text-white/50 hover:text-white/80 transition-colors font-[Inter]"
            >
              Masuk
            </Link>
            <Link
              href="/register"
              className="px-5 py-2.5 rounded-xl text-sm btn-primary font-[Inter]"
            >
              Daftar Gratis
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-white/5 text-white/50"
          >
            {mobileOpen ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile sheet */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 pt-20 glass"
          >
            <div className="flex flex-col p-6 gap-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-xl text-white/50 hover:bg-white/5 hover:text-white/80 font-[Inter] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4 flex flex-col gap-3">
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-xl text-center btn-secondary text-sm font-[Inter]"
                >
                  Masuk
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-xl text-center btn-primary text-sm font-[Inter]"
                >
                  Daftar Gratis
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
