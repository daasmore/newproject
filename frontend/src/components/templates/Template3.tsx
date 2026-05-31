'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import type { Invitation } from '@/types';
import { formatDate, formatTime, calculateCountdown, copyToClipboard } from '@/lib/utils';

/* ═══════════════════════════════════════════════════
   TEMPLATE 3 — NUSANTARA
   Palette: Warm cream #faf5eb + Gold #c59732 + Brown #5c3317
   Font: Cormorant Garamond (elegant serif)
   Animations: Bloom/organic growth, warm glows, floating ornaments
   Layout: Centered, ornate borders, cultural patterns (batik, gonjong)
   ═══════════════════════════════════════════════════ */

function useCountdown(date: string) {
  const [t, setT] = useState(calculateCountdown(date));
  useEffect(() => {
    const i = setInterval(() => setT(calculateCountdown(date)), 1000);
    return () => clearInterval(i);
  }, [date]);
  return t;
}

function BloomSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 0.9, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* Batik-inspired SVG ornament */
function BatikOrnament({ className = '' }: { className?: string }) {
  return (
    <svg className={`opacity-20 ${className}`} viewBox="0 0 200 40" fill="none">
      <path d="M0 20 Q25 5 50 20 Q75 35 100 20 Q125 5 150 20 Q175 35 200 20" stroke="#c59732" strokeWidth="1" fill="none" />
      <path d="M0 15 Q25 0 50 15 Q75 30 100 15 Q125 0 150 15 Q175 30 200 15" stroke="#c59732" strokeWidth="0.5" fill="none" opacity="0.5" />
      <circle cx="50" cy="20" r="3" fill="#c59732" opacity="0.3" />
      <circle cx="100" cy="20" r="4" fill="#c59732" opacity="0.3" />
      <circle cx="150" cy="20" r="3" fill="#c59732" opacity="0.3" />
      <path d="M30 20 L50 10 L70 20 L50 30Z" fill="#c59732" opacity="0.15" />
      <path d="M130 20 L150 10 L170 20 L150 30Z" fill="#c59732" opacity="0.15" />
    </svg>
  );
}

/* Parang pattern border */
function ParangBorder() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Top border */}
      <svg className="absolute top-0 left-0 right-0 h-8 opacity-20" viewBox="0 0 400 20" preserveAspectRatio="none">
        <path d="M0 10 L20 0 L40 10 L20 20Z" fill="#c59732" />
        <path d="M40 10 L60 0 L80 10 L60 20Z" fill="#c59732" />
        <path d="M80 10 L100 0 L120 10 L100 20Z" fill="#c59732" />
        <path d="M120 10 L140 0 L160 10 L140 20Z" fill="#c59732" />
        <path d="M160 10 L180 0 L200 10 L180 20Z" fill="#c59732" />
        <path d="M200 10 L220 0 L240 10 L220 20Z" fill="#c59732" />
        <path d="M240 10 L260 0 L280 10 L260 20Z" fill="#c59732" />
        <path d="M280 10 L300 0 L320 10 L300 20Z" fill="#c59732" />
        <path d="M320 10 L340 0 L360 10 L340 20Z" fill="#c59732" />
        <path d="M360 10 L380 0 L400 10 L380 20Z" fill="#c59732" />
      </svg>
      {/* Bottom border */}
      <svg className="absolute bottom-0 left-0 right-0 h-8 opacity-20 scale-y-[-1]" viewBox="0 0 400 20" preserveAspectRatio="none">
        <path d="M0 10 L20 0 L40 10 L20 20Z" fill="#c59732" />
        <path d="M40 10 L60 0 L80 10 L60 20Z" fill="#c59732" />
        <path d="M80 10 L100 0 L120 10 L100 20Z" fill="#c59732" />
        <path d="M120 10 L140 0 L160 10 L140 20Z" fill="#c59732" />
        <path d="M160 10 L180 0 L200 10 L180 20Z" fill="#c59732" />
        <path d="M200 10 L220 0 L240 10 L220 20Z" fill="#c59732" />
        <path d="M240 10 L260 0 L280 10 L260 20Z" fill="#c59732" />
        <path d="M280 10 L300 0 L320 10 L300 20Z" fill="#c59732" />
        <path d="M320 10 L340 0 L360 10 L340 20Z" fill="#c59732" />
        <path d="M360 10 L380 0 L400 10 L380 20Z" fill="#c59732" />
      </svg>
    </div>
  );
}

export default function Template3({ data }: { data: Invitation }) {
  const [opened, setOpened] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const event = data.events?.[0];
  const countdown = useCountdown(event?.date || new Date().toISOString());

  useEffect(() => {
    if (data.music_url) {
      const audio = new Audio(data.music_url);
      audio.loop = true;
      audioRef.current = audio;
    }
    return () => { audioRef.current?.pause(); };
  }, [data.music_url]);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (musicPlaying) { audioRef.current.pause(); } else { audioRef.current.play().catch(() => {}); }
    setMusicPlaying(!musicPlaying);
  };

  return (
    <div className="min-h-screen bg-[#faf5eb] text-[#2c1810]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
      {/* ═══ OPENING — Warm bloom animation ═══ */}
      <AnimatePresence>
        {!opened && (
          <motion.div
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-[#faf5eb] via-[#f5eddd] to-[#faf5eb] p-6 text-center"
          >
            <ParangBorder />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 1, ease: [0.22, 0.9, 0.36, 1] }}
              className="relative z-10 max-w-md"
            >
              <BatikOrnament className="mx-auto mb-8 w-48" />
              <p className="text-[10px] tracking-[0.5em] uppercase text-[#8b6914]/50 mb-4 font-[Inter]">PERNIKAHAN</p>
              <h1 className="text-4xl md:text-5xl font-bold text-[#4a2c1a] mb-2">{data.groom?.full_name || 'Mempelai Pria'}</h1>
              <div className="flex items-center justify-center gap-4 my-4">
                <div className="w-12 h-px bg-[#c59732]/30" />
                <svg width="20" height="20" viewBox="0 0 20 20" className="text-[#c59732]/40">
                  <path d="M10 2 Q15 8 10 18 Q5 8 10 2Z" fill="currentColor" />
                </svg>
                <div className="w-12 h-px bg-[#c59732]/30" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-[#4a2c1a] mb-6">{data.bride?.full_name || 'Mempelai Wanita'}</h1>
              {event && <p className="text-[#8b6914]/50 text-sm mb-8 font-[Inter]">{formatDate(event.date)}</p>}
              <button
                onClick={() => setOpened(true)}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-[#c59732] to-[#8b6914] text-white text-sm font-[Inter] hover:shadow-lg hover:shadow-[#c59732]/20 transition-all"
              >
                💌 Buka Undangan
              </button>
              <BatikOrnament className="mx-auto mt-8 w-48 rotate-180" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ MAIN CONTENT ═══ */}
      {opened && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          {/* HERO — Warm golden gradient */}
          <BloomSection className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#faf5eb] via-[#f5eddd] to-[#faf5eb]" />
            <div className="absolute ornament-dots" style={{ backgroundImage: 'radial-gradient(circle, rgba(197,151,50,0.08) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
            <ParangBorder />
            <div className="relative z-10 text-center px-6 max-w-2xl">
              <BatikOrnament className="mx-auto mb-8 w-48" />
              <p className="text-[10px] tracking-[0.5em] uppercase text-[#8b6914]/40 mb-4 font-[Inter]">PERNIKAHAN</p>
              <h1 className="text-4xl md:text-6xl font-bold text-[#4a2c1a] mb-2">{data.groom?.full_name}</h1>
              <div className="flex items-center justify-center gap-4 my-4">
                <div className="w-12 h-px bg-[#c59732]/30" />
                <svg width="20" height="20" viewBox="0 0 20 20" className="text-[#c59732]/40">
                  <path d="M10 2 Q15 8 10 18 Q5 8 10 2Z" fill="currentColor" />
                </svg>
                <div className="w-12 h-px bg-[#c59732]/30" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-[#4a2c1a] mb-6">{data.bride?.full_name}</h1>
              {event && <p className="text-[#8b6914]/60 font-[Inter] text-sm">{formatDate(event.date)}</p>}
              <BatikOrnament className="mx-auto mt-8 w-48 rotate-180" />
            </div>
          </BloomSection>

          {/* BISMILLAH */}
          <div className="py-8 text-center bg-[#faf5eb]">
            <p className="text-[#c59732] text-sm font-[Inter] tracking-wider">بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</p>
            <p className="text-[#8b6914]/40 text-xs mt-2 font-[Inter]">Dengan menyebut nama Allah Yang Maha Pengasih lagi Maha Penyayang</p>
          </div>

          {/* COUPLE — Symmetrical with ornate frames */}
          <BloomSection className="py-20 px-6 bg-[#f5eddd]">
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
              <div className="text-center">
                <div className="relative w-40 h-40 mx-auto mb-6">
                  <div className="absolute inset-0 border-2 border-[#c59732]/20 rotate-45 rounded-2xl" />
                  <div className="absolute inset-2 border border-[#c59732]/10 rotate-45 rounded-xl" />
                  <div className="absolute inset-4 overflow-hidden rotate-45 rounded-lg bg-gradient-to-br from-[#c59732]/10 to-[#8b6914]/5 flex items-center justify-center">
                    <div className="-rotate-45">
                      {data.bride?.photo_url ? (
                        <img src={data.bride.photo_url} alt="" className="w-24 h-24 rounded-full object-cover border-2 border-[#c59732]/20" />
                      ) : (
                        <span className="text-4xl">👰</span>
                      )}
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-[#4a2c1a] mb-1">{data.bride?.full_name}</h3>
                <p className="text-[#8b6914]/50 text-xs font-[Inter] mb-2">PUTRI dari</p>
                <p className="text-[#5c3317]/60 text-sm font-[Inter]">{data.bride?.father_name} & {data.bride?.mother_name}</p>
              </div>
              <div className="text-center">
                <div className="relative w-40 h-40 mx-auto mb-6">
                  <div className="absolute inset-0 border-2 border-[#c59732]/20 rotate-45 rounded-2xl" />
                  <div className="absolute inset-2 border border-[#c59732]/10 rotate-45 rounded-xl" />
                  <div className="absolute inset-4 overflow-hidden rotate-45 rounded-lg bg-gradient-to-br from-[#c59732]/10 to-[#8b6914]/5 flex items-center justify-center">
                    <div className="-rotate-45">
                      {data.groom?.photo_url ? (
                        <img src={data.groom.photo_url} alt="" className="w-24 h-24 rounded-full object-cover border-2 border-[#c59732]/20" />
                      ) : (
                        <span className="text-4xl">🤵</span>
                      )}
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-[#4a2c1a] mb-1">{data.groom?.full_name}</h3>
                <p className="text-[#8b6914]/50 text-xs font-[Inter] mb-2">PUTRA dari</p>
                <p className="text-[#5c3317]/60 text-sm font-[Inter]">{data.groom?.father_name} & {data.groom?.mother_name}</p>
              </div>
            </div>
          </BloomSection>

          {/* COUNTDOWN — Ornate cards */}
          {event && (
            <BloomSection className="py-16 px-6 text-center bg-[#faf5eb]">
              <BatikOrnament className="mx-auto mb-4 w-32" />
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#8b6914]/40 mb-8 font-[Inter]">Menghitung Hari</p>
              <div className="flex justify-center gap-4 md:gap-6">
                {[
                  { v: countdown.days, l: 'Hari' },
                  { v: countdown.hours, l: 'Jam' },
                  { v: countdown.minutes, l: 'Menit' },
                  { v: countdown.seconds, l: 'Detik' },
                ].map((c, i) => (
                  <div key={i} className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-b from-[#fffbf5] to-[#f5eddd] border border-[#c59732]/15 flex flex-col items-center justify-center shadow-sm">
                    <span className="countdown-num text-xl md:text-2xl font-bold text-[#4a2c1a]">{c.v}</span>
                    <span className="text-[8px] text-[#8b6914]/40 font-[Inter] mt-0.5">{c.l}</span>
                  </div>
                ))}
              </div>
              <BatikOrnament className="mx-auto mt-4 w-32 rotate-180" />
            </BloomSection>
          )}

          {/* EVENTS — Centered with warm cards */}
          <BloomSection className="py-20 px-6 bg-[#f5eddd]">
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#8b6914]/40 mb-8 text-center font-[Inter]">Detail Acara</p>
            <div className="max-w-2xl mx-auto space-y-6">
              {data.events?.map((ev, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="border border-[#c59732]/15 rounded-2xl p-6 bg-gradient-to-r from-[#c59732]/[0.04] to-[#faf5eb] relative overflow-hidden"
                >
                  <ParangBorder />
                  <h3 className="text-lg font-bold text-[#4a2c1a] mb-4 relative z-10">{ev.type === 'akad' ? '✦ Akad Nikah' : '✦ Resepsi'}</h3>
                  <div className="space-y-2 text-sm font-[Inter] text-[#5c3317]/60 relative z-10">
                    <p>📅 {formatDate(ev.date)}</p>
                    <p>🕐 {formatTime(ev.start_time)} – {formatTime(ev.end_time)}</p>
                    <p>📍 {ev.location_name}</p>
                    <p className="text-[#5c3317]/40 text-xs">{ev.address}</p>
                  </div>
                  {ev.maps_link && (
                    <a href={ev.maps_link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-4 px-4 py-2 rounded-lg border border-[#c59732]/20 text-[#8b6914] text-xs font-[Inter] hover:bg-[#c59732]/10 transition-colors relative z-10">
                      🗺️ Buka Maps
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </BloomSection>

          {/* LOVE STORY — Ornate timeline */}
          {data.love_stories && data.love_stories.length > 0 && (
            <BloomSection className="py-20 px-6 bg-[#faf5eb]">
              <BatikOrnament className="mx-auto mb-4 w-32" />
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#8b6914]/40 mb-10 text-center font-[Inter]">Love Story</p>
              <div className="max-w-lg mx-auto relative">
                <div className="absolute left-6 top-0 bottom-0 w-px bg-[#c59732]/15" />
                {data.love_stories.map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    className="relative pl-14 pb-8"
                  >
                    <div className="absolute left-4 top-1.5 w-4 h-4 rounded-full bg-[#faf5eb] border-2 border-[#c59732]/30" />
                    <div className="absolute left-5.5 top-3 w-1.5 h-1.5 rounded-full bg-[#c59732]/40" />
                    <p className="text-[#c59732]/60 text-xs font-[Inter] font-semibold mb-1">{s.date}</p>
                    <h4 className="text-base font-bold text-[#4a2c1a] mb-1">{s.title}</h4>
                    <p className="text-sm text-[#5c3317]/50 font-[Inter]">{s.description}</p>
                  </motion.div>
                ))}
              </div>
            </BloomSection>
          )}

          {/* GALLERY — Warm grid with rounded corners */}
          {data.gallery_images && data.gallery_images.length > 0 && (
            <BloomSection className="py-20 px-6 bg-[#f5eddd]">
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#8b6914]/40 mb-8 text-center font-[Inter]">Galeri Foto</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-3xl mx-auto">
                {data.gallery_images.map((img, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="aspect-square rounded-2xl overflow-hidden cursor-pointer border border-[#c59732]/10 bg-[#c59732]/5"
                    onClick={() => setLightboxImg(img.url)}
                  >
                    <img src={img.url} alt={img.caption || ''} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </motion.div>
                ))}
              </div>
            </BloomSection>
          )}

          {/* GIFTS — Warm gold cards */}
          {data.gift_accounts && data.gift_accounts.length > 0 && (
            <BloomSection className="py-20 px-6 bg-[#faf5eb]">
              <BatikOrnament className="mx-auto mb-4 w-32" />
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#8b6914]/40 mb-8 text-center font-[Inter]">Hadiah Pernikahan</p>
              <div className="max-w-md mx-auto space-y-4">
                {data.gift_accounts.map((g, i) => (
                  <div key={i} className="border border-[#c59732]/15 rounded-2xl p-5 bg-gradient-to-r from-[#c59732]/[0.04] to-[#faf5eb] flex items-center justify-between">
                    <div>
                      <p className="text-xs text-[#8b6914]/70 font-[Inter] font-semibold">{g.bank_name}</p>
                      <p className="text-lg font-bold text-[#4a2c1a] font-mono">{g.account_number}</p>
                      <p className="text-xs text-[#5c3317]/40 font-[Inter]">a.n. {g.account_name}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(g.account_number)}
                      className="px-4 py-2 rounded-xl border border-[#c59732]/20 text-[#8b6914] text-xs font-[Inter] hover:bg-[#c59732]/10 transition-colors"
                    >
                      📋 Salin
                    </button>
                  </div>
                ))}
              </div>
            </BloomSection>
          )}

          {/* RSVP — Warm form */}
          <BloomSection className="py-20 px-6 bg-[#f5eddd]" id="rsvp">
            <div className="max-w-md mx-auto">
              <BatikOrnament className="mx-auto mb-4 w-32" />
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#8b6914]/40 mb-2 text-center font-[Inter]">Konfirmasi Kehadiran</p>
              <p className="text-center text-[#5c3317]/40 text-sm mb-8 font-[Inter]">Isi form berikut untuk konfirmasi kehadiran Anda</p>
              <form onSubmit={(e) => { e.preventDefault(); alert('Terima kasih!'); }} className="space-y-4">
                <input placeholder="Nama Anda" className="w-full px-4 py-3 rounded-xl bg-[#faf5eb] border border-[#c59732]/15 text-[#4a2c1a] text-sm font-[Inter] placeholder:text-[#8b6914]/25 focus:outline-none focus:border-[#c59732]/40" />
                <div className="flex gap-3">
                  {['hadir', 'tidak'].map((opt) => (
                    <label key={opt} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-[#c59732]/15 cursor-pointer hover:bg-[#c59732]/5 transition-colors has-[:checked]:border-[#c59732]/50 has-[:checked]:bg-[#c59732]/10">
                      <input type="radio" name="attending" value={opt} className="sr-only" />
                      <span className="text-sm font-[Inter] text-[#5c3317]/60">
                        {opt === 'hadir' ? '✅ Hadir' : '❌ Tidak'}
                      </span>
                    </label>
                  ))}
                </div>
                <textarea placeholder="Ucapan untuk mempelai..." rows={3} className="w-full px-4 py-3 rounded-xl bg-[#faf5eb] border border-[#c59732]/15 text-[#4a2c1a] text-sm font-[Inter] placeholder:text-[#8b6914]/25 focus:outline-none focus:border-[#c59732]/40 resize-none" />
                <button type="submit" className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#c59732] to-[#8b6914] text-white font-semibold text-sm font-[Inter] hover:shadow-lg hover:shadow-[#c59732]/20 transition-all">
                  Kirim RSVP
                </button>
              </form>
            </div>
          </BloomSection>

          {/* WISHES WALL */}
          <BloomSection className="py-16 px-6 bg-[#faf5eb]">
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#8b6914]/40 mb-8 text-center font-[Inter]">Ucapan & Doa</p>
            <div className="max-w-lg mx-auto">
              <div className="text-center text-[#8b6914]/25 text-sm font-[Inter] py-12">Belum ada ucapan. Jadilah yang pertama!</div>
            </div>
          </BloomSection>

          {/* FOOTER */}
          <div className="py-12 text-center text-[#8b6914]/20 text-xs font-[Inter] bg-[#f5eddd]">
            <BatikOrnament className="mx-auto mb-4 w-24" />
            <p>Made with ❤️ — WeddingInv</p>
            <p className="mt-1">© 2026</p>
          </div>
        </motion.div>
      )}

      {/* MUSIC TOGGLE */}
      {opened && data.music_url && (
        <button
          onClick={toggleMusic}
          className={`fixed bottom-6 left-6 z-40 w-12 h-12 rounded-full flex items-center justify-center text-lg transition-all duration-300 ${
            musicPlaying ? 'bg-[#c59732]/20 text-[#8b6914] music-btn shadow-lg shadow-[#c59732]/10' : 'bg-[#faf5eb] text-[#8b6914]/30 border border-[#c59732]/10'
          }`}
          aria-label="Toggle music"
        >
          {musicPlaying ? '🎵' : '🔇'}
        </button>
      )}

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] lightbox-overlay flex items-center justify-center p-4"
            onClick={() => setLightboxImg(null)}
          >
            <img src={lightboxImg} alt="" className="max-w-full max-h-full object-contain rounded-lg" />
            <button className="absolute top-4 right-4 text-white/60 text-2xl hover:text-white" onClick={() => setLightboxImg(null)}>✕</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
