'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import type { Invitation } from '@/types';
import { formatDate, formatTime, calculateCountdown, copyToClipboard } from '@/lib/utils';

/* ═══════════════════════════════════════════════════
   TEMPLATE 2 — MODERN MINIMAL
   Palette: White #fff + Black #0a0a0a + Grey
   Font: Inter (sans-serif), geometric
   Animations: Slide from left, scale-in, horizontal reveal
   Layout: Full-bleed images, asymmetric grids, brutalist touches
   ═══════════════════════════════════════════════════ */

function useCountdown(date: string) {
  const [t, setT] = useState(calculateCountdown(date));
  useEffect(() => {
    const i = setInterval(() => setT(calculateCountdown(date)), 1000);
    return () => clearInterval(i);
  }, [date]);
  return t;
}

function SlideSection({ children, className = '', direction = 'left', id }: { children: React.ReactNode; className?: string; direction?: 'left' | 'right'; id?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, x: direction === 'left' ? -60 : 60 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 0.9, 0.36, 1] }}
      className={className} id={id}
    >
      {children}
    </motion.section>
  );
}

export default function Template2({ data }: { data: Invitation }) {
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
    <div className="min-h-screen bg-white text-[#0a0a0a]" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* ═══ OPENING — Minimal full-screen card ═══ */}
      <AnimatePresence>
        {!opened && (
          <motion.div
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white p-6 text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="w-full max-w-sm"
            >
              <div className="w-px h-12 bg-black/10 mx-auto mb-6" />
              <p className="text-[10px] tracking-[0.5em] uppercase text-black/30 mb-3">THE WEDDING</p>
              <h1 className="text-3xl md:text-4xl font-bold text-black mb-1">{data.groom?.full_name || 'Pria'}</h1>
              <div className="flex items-center justify-center gap-3 my-3">
                <div className="h-px w-8 bg-black/10" />
                <span className="text-sm text-black/30">&</span>
                <div className="h-px w-8 bg-black/10" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-black mb-6">{data.bride?.full_name || 'Wanita'}</h1>
              {event && <p className="text-xs text-black/30 mb-8">{formatDate(event.date)}</p>}
              <button
                onClick={() => setOpened(true)}
                className="px-8 py-3 bg-black text-white text-xs tracking-[0.15em] uppercase rounded-none hover:bg-black/80 transition-colors"
              >
                Buka Undangan
              </button>
              <div className="w-px h-12 bg-black/10 mx-auto mt-6" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ MAIN CONTENT ═══ */}
      {opened && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          {/* HERO — Full bleed with overlay text */}
          <SlideSection className="relative min-h-screen flex items-end bg-black">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
            {data.cover_photo_url && (
              <img src={data.cover_photo_url} alt="" className="absolute inset-0 w-full h-full object-cover opacity-60" />
            )}
            <div className="relative z-20 p-8 md:p-16 w-full">
              <p className="text-[10px] tracking-[0.5em] uppercase text-white/40 mb-4">THE WEDDING OF</p>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-1">{data.groom?.full_name}</h1>
              <div className="w-8 h-px bg-white/30 my-4" />
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{data.bride?.full_name}</h1>
              {event && <p className="text-sm text-white/40">{formatDate(event.date)}</p>}
            </div>
          </SlideSection>

          {/* COUPLE — Asymmetric 2-col */}
          <SlideSection className="bg-white py-20 px-6 md:px-16" direction="right">
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16">
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-black/25 mb-6">Mempelai Wanita</p>
                <div className="aspect-[3/4] bg-gray-100 mb-4 overflow-hidden">
                  {data.bride?.photo_url ? (
                    <img src={data.bride.photo_url} alt="" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl">👰</div>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-black mb-1">{data.bride?.full_name}</h3>
                <p className="text-xs text-black/30">Putri dari {data.bride?.father_name} & {data.bride?.mother_name}</p>
              </div>
              <div className="md:pt-20">
                <p className="text-[10px] tracking-[0.3em] uppercase text-black/25 mb-6">Mempelai Pria</p>
                <div className="aspect-[3/4] bg-gray-100 mb-4 overflow-hidden">
                  {data.groom?.photo_url ? (
                    <img src={data.groom.photo_url} alt="" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl">🤵</div>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-black mb-1">{data.groom?.full_name}</h3>
                <p className="text-xs text-black/30">Putra dari {data.groom?.father_name} & {data.groom?.mother_name}</p>
              </div>
            </div>
          </SlideSection>

          {/* COUNTDOWN — Horizontal row on dark bg */}
          {event && (
            <SlideSection className="bg-[#0a0a0a] py-16 px-6 text-center">
              <p className="text-[10px] tracking-[0.3em] uppercase text-white/25 mb-8">Countdown</p>
              <div className="flex justify-center gap-6 md:gap-10">
                {[
                  { v: countdown.days, l: 'Hari' },
                  { v: countdown.hours, l: 'Jam' },
                  { v: countdown.minutes, l: 'Menit' },
                  { v: countdown.seconds, l: 'Detik' },
                ].map((c, i) => (
                  <div key={i} className="text-center">
                    <span className="countdown-num text-3xl md:text-4xl font-bold text-white block">{c.v}</span>
                    <span className="text-[9px] text-white/25 tracking-wider uppercase mt-1 block">{c.l}</span>
                  </div>
                ))}
              </div>
            </SlideSection>
          )}

          {/* EVENTS — Side by side cards */}
          <SlideSection className="bg-white py-20 px-6 md:px-16" direction="right">
            <p className="text-[10px] tracking-[0.3em] uppercase text-black/25 mb-10 text-center">Detail Acara</p>
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
              {data.events?.map((ev, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="border border-black/10 p-8"
                >
                  <div className="w-10 h-px bg-black mb-4" />
                  <h3 className="text-lg font-bold text-black mb-4 uppercase text-xs tracking-[0.2em]">{ev.type === 'akad' ? 'Akad Nikah' : 'Resepsi'}</h3>
                  <div className="space-y-2 text-xs text-black/50">
                    <p>📅 {formatDate(ev.date)}</p>
                    <p>🕐 {formatTime(ev.start_time)} – {formatTime(ev.end_time)}</p>
                    <p>📍 {ev.location_name}</p>
                    <p className="text-black/30">{ev.address}</p>
                  </div>
                  {ev.maps_link && (
                    <a href={ev.maps_link} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-[10px] tracking-[0.15em] uppercase text-black/40 border-b border-black/20 hover:text-black hover:border-black transition-colors">
                      Buka Maps →
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </SlideSection>

          {/* LOVE STORY — Horizontal timeline */}
          {data.love_stories && data.love_stories.length > 0 && (
            <SlideSection className="bg-[#f5f5f5] py-20 px-6 md:px-16">
              <p className="text-[10px] tracking-[0.3em] uppercase text-black/25 mb-10 text-center">Love Story</p>
              <div className="max-w-4xl mx-auto flex gap-8 overflow-x-auto pb-4">
                {data.love_stories.map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex-shrink-0 w-64 bg-white p-6 border border-black/5"
                  >
                    <p className="text-amber-600 text-[10px] font-semibold mb-2">{s.date}</p>
                    <h4 className="text-sm font-bold text-black mb-2">{s.title}</h4>
                    <p className="text-xs text-black/40 leading-relaxed">{s.description}</p>
                  </motion.div>
                ))}
              </div>
            </SlideSection>
          )}

          {/* GALLERY — Masonry style */}
          {data.gallery_images && data.gallery_images.length > 0 && (
            <Section className="bg-white py-20 px-6 md:px-16">
              <p className="text-[10px] tracking-[0.3em] uppercase text-black/25 mb-8 text-center">Galeri</p>
              <div className="max-w-5xl mx-auto columns-2 md:columns-3 gap-3 space-y-3">
                {data.gallery_images.map((img, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="break-inside-avoid cursor-pointer overflow-hidden"
                    onClick={() => setLightboxImg(img.url)}
                  >
                    <img src={img.url} alt={img.caption || ''} className="w-full hover:scale-105 transition-transform duration-500" />
                  </motion.div>
                ))}
              </div>
            </Section>
          )}

          {/* GIFTS — Clean list */}
          {data.gift_accounts && data.gift_accounts.length > 0 && (
            <SlideSection className="bg-[#f5f5f5] py-20 px-6 md:px-16" direction="right">
              <p className="text-[10px] tracking-[0.3em] uppercase text-black/25 mb-8 text-center">Hadiah Pernikahan</p>
              <div className="max-w-md mx-auto space-y-3">
                {data.gift_accounts.map((g, i) => (
                  <div key={i} className="bg-white border border-black/5 p-5 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-black">{g.bank_name}</p>
                      <p className="text-base font-mono font-bold text-black mt-1">{g.account_number}</p>
                      <p className="text-[10px] text-black/30 mt-0.5">a.n. {g.account_name}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(g.account_number)}
                      className="text-[10px] tracking-wider uppercase text-black/40 border border-black/10 px-3 py-2 hover:bg-black hover:text-white transition-all"
                    >
                      Salin
                    </button>
                  </div>
                ))}
              </div>
            </SlideSection>
          )}

          {/* RSVP — Minimal form */}
          <SlideSection className="bg-white py-20 px-6 md:px-16" id="rsvp">
            <div className="max-w-sm mx-auto">
              <p className="text-[10px] tracking-[0.3em] uppercase text-black/25 mb-2 text-center">RSVP</p>
              <p className="text-center text-black/30 text-xs mb-8">Konfirmasi kehadiran Anda</p>
              <form onSubmit={(e) => { e.preventDefault(); alert('Terima kasih!'); }} className="space-y-4">
                <input placeholder="Nama" className="w-full px-0 py-3 border-0 border-b border-black/10 text-sm text-black font-[Inter] placeholder:text-black/20 focus:outline-none focus:border-black/30 bg-transparent" />
                <div className="flex gap-3">
                  {['hadir', 'tidak'].map((opt) => (
                    <label key={opt} className="flex-1 flex items-center justify-center py-3 border border-black/10 cursor-pointer hover:bg-black/5 transition-colors has-[:checked]:bg-black has-[:checked]:text-white has-[:checked]:border-black">
                      <input type="radio" name="attending" value={opt} className="sr-only" />
                      <span className="text-xs uppercase tracking-wider">{opt === 'hadir' ? 'Hadir' : 'Tidak'}</span>
                    </label>
                  ))}
                </div>
                <textarea placeholder="Ucapan..." rows={3} className="w-full px-0 py-3 border-0 border-b border-black/10 text-sm text-black font-[Inter] placeholder:text-black/20 focus:outline-none focus:border-black/30 bg-transparent resize-none" />
                <button type="submit" className="w-full py-3 bg-black text-white text-xs tracking-[0.15em] uppercase hover:bg-black/80 transition-colors">
                  Kirim
                </button>
              </form>
            </div>
          </SlideSection>

          <div className="py-12 text-center text-black/15 text-[10px] tracking-wider uppercase bg-white">
            Made with ♥ using WeddingInv © 2026
          </div>
        </motion.div>
      )}

      {/* Music toggle */}
      {opened && data.music_url && (
        <button onClick={toggleMusic} className={`fixed bottom-6 left-6 z-40 w-10 h-10 rounded-full flex items-center justify-center text-sm border transition-all ${musicPlaying ? 'bg-black text-white border-black' : 'bg-white text-black/30 border-black/10'}`}>
          {musicPlaying ? '♪' : '♪'}
        </button>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-white/95 flex items-center justify-center p-4" onClick={() => setLightboxImg(null)}>
            <img src={lightboxImg} alt="" className="max-w-full max-h-full object-contain" />
            <button className="absolute top-4 right-4 text-black/40 text-xl" onClick={() => setLightboxImg(null)}>✕</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Section({ children, className = '', id }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <motion.section ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className={className} id={id}>
      {children}
    </motion.section>
  );
}
