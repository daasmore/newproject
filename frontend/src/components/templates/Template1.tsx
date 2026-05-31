'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import type { Invitation } from '@/types';
import { formatDate, formatTime, calculateCountdown, copyToClipboard } from '@/lib/utils';

/* ═══════════════════════════════════════════════════
   TEMPLATE 1 — CLASSIC ELEGANCE
   Palette: Navy #1a1a2e + Gold #d4a574 + Ivory
   Font: Playfair Display (serif)
   Animations: Curtain reveal, slow fade-up, parallax
   ═══════════════════════════════════════════════════ */

function useCountdown(date: string) {
  const [t, setT] = useState(calculateCountdown(date));
  useEffect(() => {
    const i = setInterval(() => setT(calculateCountdown(date)), 1000);
    return () => clearInterval(i);
  }, [date]);
  return t;
}

function Section({ children, className = '', delay = 0, id }: { children: React.ReactNode; className?: string; delay?: number; id?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 0.9, 0.36, 1] }}
      className={className} id={id}
    >
      {children}
    </motion.section>
  );
}

function OrnamentalDivider() {
  return (
    <div className="flex items-center justify-center gap-4 py-6">
      <div className="h-px w-20 bg-gradient-to-r from-transparent to-amber-500/40" />
      <svg width="24" height="24" viewBox="0 0 24 24" className="text-amber-500/50">
        <path d="M12 2L14 8L20 8L15 12L17 18L12 14L7 18L9 12L4 8L10 8Z" fill="currentColor" />
      </svg>
      <div className="h-px w-20 bg-gradient-to-l from-transparent to-amber-500/40" />
    </div>
  );
}

export default function Template1({ data }: { data: Invitation }) {
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
    if (musicPlaying) { audioRef.current.pause(); }
    else { audioRef.current.play().catch(() => {}); }
    setMusicPlaying(!musicPlaying);
  };

  return (
    <div className="min-h-screen bg-[#0f0f23] text-[#e8e0d4]" style={{ fontFamily: "'Playfair Display', serif" }}>
      {/* ═══ OPENING COVER ═══ */}
      <AnimatePresence>
        {!opened && (
          <motion.div
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-[#0f0f23] via-[#1a1a2e] to-[#0f0f23] p-6 text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-amber-500/60 text-xs tracking-[0.4em] uppercase mb-4 font-[Inter]"
            >
              THE WEDDING OF
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold text-amber-100 mb-2"
            >
              {data.groom?.full_name || 'Mempelai Pria'}
            </motion.h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="w-16 h-px bg-amber-500/40 my-4"
            />
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold text-amber-100 mb-6"
            >
              {data.bride?.full_name || 'Mempelai Wanita'}
            </motion.h1>
            {event && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="text-amber-500/50 text-xs tracking-[0.2em] uppercase mb-8 font-[Inter]"
              >
                {formatDate(event.date)}
              </motion.p>
            )}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
              onClick={() => setOpened(true)}
              className="px-8 py-3 rounded-full border border-amber-500/30 text-amber-400 text-sm font-[Inter] hover:bg-amber-500/10 transition-colors"
            >
              💌 Buka Undangan
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ MAIN CONTENT ═══ */}
      {opened && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* HERO with couple photos */}
          <Section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a2e]/80 via-transparent to-[#0f0f23] z-10" />
            <div className="absolute inset-0 ornament-dots opacity-30" style={{ backgroundImage: 'radial-gradient(circle, rgba(212,165,116,0.1) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

            <div className="relative z-20 text-center px-6 max-w-2xl">
              <p className="text-amber-500/50 text-xs tracking-[0.4em] uppercase mb-6 font-[Inter]">THE WEDDING OF</p>
              <h1 className="text-4xl md:text-6xl font-bold text-amber-100 mb-3">{data.groom?.full_name || 'Mempelai Pria'}</h1>
              <div className="flex items-center justify-center gap-4 my-4">
                <div className="h-px w-12 bg-amber-500/30" />
                <span className="text-2xl text-amber-500/60">&</span>
                <div className="h-px w-12 bg-amber-500/30" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-amber-100 mb-6">{data.bride?.full_name || 'Mempelai Wanita'}</h1>
              {event && <p className="text-amber-500/60 font-[Inter] text-sm">{formatDate(event.date)}</p>}
            </div>
          </Section>

          {/* COUPLE INFO */}
          <Section className="py-20 px-6 bg-[#12122a]">
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
              {/* Bride */}
              <div className="text-center">
                <div className="w-28 h-28 rounded-full mx-auto mb-4 border-2 border-amber-500/30 flex items-center justify-center bg-gradient-to-br from-amber-500/10 to-amber-600/5 overflow-hidden">
                  {data.bride?.photo_url ? (
                    <img src={data.bride.photo_url} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-3xl">👰</span>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-amber-100 mb-1">{data.bride?.full_name}</h3>
                <p className="text-amber-500/50 text-xs font-[Inter] mb-2">PUTRI dari</p>
                <p className="text-white/50 text-sm font-[Inter]">{data.bride?.father_name} & {data.bride?.mother_name}</p>
              </div>
              {/* Groom */}
              <div className="text-center">
                <div className="w-28 h-28 rounded-full mx-auto mb-4 border-2 border-amber-500/30 flex items-center justify-center bg-gradient-to-br from-amber-500/10 to-amber-600/5 overflow-hidden">
                  {data.groom?.photo_url ? (
                    <img src={data.groom.photo_url} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-3xl">🤵</span>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-amber-100 mb-1">{data.groom?.full_name}</h3>
                <p className="text-amber-500/50 text-xs font-[Inter] mb-2">PUTRA dari</p>
                <p className="text-white/50 text-sm font-[Inter]">{data.groom?.father_name} & {data.groom?.mother_name}</p>
              </div>
            </div>
          </Section>

          <OrnamentalDivider />

          {/* COUNTDOWN */}
          {event && (
            <Section className="py-16 px-6 text-center bg-[#0f0f23]">
              <p className="text-amber-500/50 text-xs tracking-[0.3em] uppercase mb-8 font-[Inter]">Menghitung Hari</p>
              <div className="flex justify-center gap-4 md:gap-8">
                {[
                  { v: countdown.days, l: 'Hari' },
                  { v: countdown.hours, l: 'Jam' },
                  { v: countdown.minutes, l: 'Menit' },
                  { v: countdown.seconds, l: 'Detik' },
                ].map((c, i) => (
                  <div key={i} className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-b from-[#1a1a2e] to-[#12122a] border border-amber-500/10 flex flex-col items-center justify-center">
                    <span className="countdown-num text-xl md:text-2xl font-bold text-amber-400">{c.v}</span>
                    <span className="text-[9px] text-white/30 font-[Inter] mt-0.5">{c.l}</span>
                  </div>
                ))}
              </div>
            </Section>
          )}

          <OrnamentalDivider />

          {/* EVENTS */}
          <Section className="py-20 px-6 bg-[#12122a]">
            <p className="text-amber-500/50 text-xs tracking-[0.3em] uppercase mb-8 text-center font-[Inter]">Detail Acara</p>
            <div className="max-w-2xl mx-auto space-y-8">
              {data.events?.map((ev, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="border border-amber-500/15 rounded-2xl p-6 bg-gradient-to-r from-amber-500/[0.03] to-transparent"
                >
                  <h3 className="text-lg font-bold text-amber-100 mb-4">{ev.type === 'akad' ? 'Akad Nikah' : 'Resepsi'}</h3>
                  <div className="space-y-2 text-sm font-[Inter] text-white/60">
                    <p>📅 {formatDate(ev.date)}</p>
                    <p>🕐 {formatTime(ev.start_time)} – {formatTime(ev.end_time)}</p>
                    <p>📍 {ev.location_name}</p>
                    <p className="text-white/40 text-xs">{ev.address}</p>
                  </div>
                  {ev.maps_link && (
                    <a href={ev.maps_link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-4 px-4 py-2 rounded-lg border border-amber-500/20 text-amber-400 text-xs font-[Inter] hover:bg-amber-500/10 transition-colors">
                      🗺️ Buka Maps
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </Section>

          <OrnamentalDivider />

          {/* LOVE STORY */}
          {data.love_stories && data.love_stories.length > 0 && (
            <Section className="py-20 px-6 bg-[#0f0f23]">
              <p className="text-amber-500/50 text-xs tracking-[0.3em] uppercase mb-10 text-center font-[Inter]">Love Story</p>
              <div className="max-w-lg mx-auto relative">
                <div className="absolute left-4 top-0 bottom-0 w-px bg-amber-500/15" />
                {data.love_stories.map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    className="relative pl-12 pb-8"
                  >
                    <div className="absolute left-2.5 top-1 w-3 h-3 rounded-full bg-amber-500/30 border-2 border-amber-500/50" />
                    <p className="text-amber-500/60 text-xs font-[Inter] mb-1">{s.date}</p>
                    <h4 className="text-base font-semibold text-amber-100 mb-1">{s.title}</h4>
                    <p className="text-sm text-white/40 font-[Inter]">{s.description}</p>
                  </motion.div>
                ))}
              </div>
            </Section>
          )}

          {/* GALLERY */}
          {data.gallery_images && data.gallery_images.length > 0 && (
            <Section className="py-20 px-6 bg-[#12122a]">
              <p className="text-amber-500/50 text-xs tracking-[0.3em] uppercase mb-8 text-center font-[Inter]">Galeri Foto</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-3xl mx-auto">
                {data.gallery_images.map((img, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="aspect-square rounded-2xl overflow-hidden cursor-pointer bg-amber-500/5"
                    onClick={() => setLightboxImg(img.url)}
                  >
                    <img src={img.url} alt={img.caption || ''} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </motion.div>
                ))}
              </div>
            </Section>
          )}

          {/* GIFTS */}
          {data.gift_accounts && data.gift_accounts.length > 0 && (
            <Section className="py-20 px-6 bg-[#0f0f23]">
              <p className="text-amber-500/50 text-xs tracking-[0.3em] uppercase mb-8 text-center font-[Inter]">Hadiah Pernikahan</p>
              <div className="max-w-md mx-auto space-y-4">
                {data.gift_accounts.map((g, i) => (
                  <div key={i} className="border border-amber-500/15 rounded-2xl p-5 bg-gradient-to-r from-amber-500/[0.03] to-transparent flex items-center justify-between">
                    <div>
                      <p className="text-xs text-amber-500/60 font-[Inter]">{g.bank_name}</p>
                      <p className="text-lg font-bold text-amber-100 font-mono">{g.account_number}</p>
                      <p className="text-xs text-white/40 font-[Inter]">a.n. {g.account_name}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(g.account_number)}
                      className="px-4 py-2 rounded-xl border border-amber-500/20 text-amber-400 text-xs font-[Inter] hover:bg-amber-500/10 transition-colors"
                    >
                      📋 Salin
                    </button>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* RSVP */}
          <Section className="py-20 px-6 bg-[#12122a]" id="rsvp">
            <div className="max-w-md mx-auto">
              <p className="text-amber-500/50 text-xs tracking-[0.3em] uppercase mb-2 text-center font-[Inter]">Konfirmasi Kehadiran</p>
              <p className="text-center text-white/30 text-sm font-[Inter] mb-8">Isi form berikut untuk konfirmasi kehadiran Anda</p>
              <form onSubmit={(e) => { e.preventDefault(); alert('RSVP terima kasih!'); }} className="space-y-4">
                <input placeholder="Nama Anda" className="w-full px-4 py-3 rounded-xl bg-[#1a1a2e] border border-amber-500/15 text-amber-100 text-sm font-[Inter] placeholder:text-white/20 focus:outline-none focus:border-amber-500/40" />
                <div className="flex gap-3">
                  <label className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-amber-500/15 cursor-pointer hover:bg-amber-500/5 transition-colors has-[:checked]:border-emerald-500/40 has-[:checked]:bg-emerald-500/10">
                    <input type="radio" name="attending" value="yes" className="sr-only" />
                    <span className="text-sm font-[Inter]">✅ Hadir</span>
                  </label>
                  <label className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-amber-500/15 cursor-pointer hover:bg-amber-500/5 transition-colors has-[:checked]:border-red-500/40 has-[:checked]:bg-red-500/10">
                    <input type="radio" name="attending" value="no" className="sr-only" />
                    <span className="text-sm font-[Inter]">❌ Tidak</span>
                  </label>
                </div>
                <textarea placeholder="Ucapan untuk mempelai..." rows={3} className="w-full px-4 py-3 rounded-xl bg-[#1a1a2e] border border-amber-500/15 text-amber-100 text-sm font-[Inter] placeholder:text-white/20 focus:outline-none focus:border-amber-500/40 resize-none" />
                <button type="submit" className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-[#0f0f23] font-semibold text-sm font-[Inter] hover:shadow-lg hover:shadow-amber-500/20 transition-all">
                  Kirim RSVP
                </button>
              </form>
            </div>
          </Section>

          {/* WISHES WALL */}
          <Section className="py-16 px-6 bg-[#0f0f23]">
            <p className="text-amber-500/50 text-xs tracking-[0.3em] uppercase mb-8 text-center font-[Inter]">Ucapan & Doa</p>
            <div className="max-w-lg mx-auto space-y-3">
              <div className="text-center text-white/20 text-sm font-[Inter] py-12">Belum ada ucapan. Jadilah yang pertama!</div>
            </div>
          </Section>

          {/* FOOTER */}
          <div className="py-12 text-center text-white/15 text-xs font-[Inter] bg-[#0f0f23]">
            <p>Made with ❤️ using WeddingInv</p>
            <p className="mt-1">© 2026</p>
          </div>
        </motion.div>
      )}

      {/* ═══ MUSIC TOGGLE ═══ */}
      {opened && data.music_url && (
        <button
          onClick={toggleMusic}
          className={`fixed bottom-6 left-6 z-40 w-12 h-12 rounded-full flex items-center justify-center text-lg transition-all duration-300 ${
            musicPlaying ? 'bg-amber-500/20 text-amber-400 music-btn' : 'bg-white/5 text-white/30'
          }`}
          aria-label="Toggle music"
        >
          {musicPlaying ? '🎵' : '🔇'}
        </button>
      )}

      {/* ═══ LIGHTBOX ═══ */}
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
