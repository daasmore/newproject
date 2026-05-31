'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Heart, MapPin, Calendar, Copy, Volume2, VolumeX } from 'lucide-react';
import { toast } from 'sonner';
import api from '@/lib/api';
import type { Tamu } from '@/types';

interface Props {
  invitation: {
    id: string;
    title: string;
    template_id: string;
    bride_name?: string;
    groom_name?: string;
    akad_date?: string;
    akad_time?: string;
    akad_location?: string;
    resepsi_date?: string;
    resepsi_time?: string;
    resepsi_location?: string;
    cover_photo_url?: string;
    music_url?: string;
    is_published?: boolean;
    slug: string;
  };
}

function Section({ children, className = '', id = '' }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <motion.section
      ref={ref} id={id}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
      className={className}
    >{children}</motion.section>
  );
}

function useCountdown(targetDate: string) {
  const calc = () => {
    const diff = new Date(targetDate).getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return { days: Math.floor(diff / 86400000), hours: Math.floor((diff % 86400000) / 3600000), minutes: Math.floor((diff % 3600000) / 60000), seconds: Math.floor((diff % 60000) / 1000) };
  };
  const [t, setT] = useState(calc);
  useEffect(() => { const i = setInterval(() => setT(calc), 1000); return () => clearInterval(i); }, [targetDate]);
  return t;
}

export default function UndanganClient({ invitation }: Props) {
  const [opened, setOpened] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [rsvpStatus, setRsvpStatus] = useState('');
  const [rsvpCount, setRsvpCount] = useState('1');
  const [rsvpMsg, setRsvpMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const countdown = useCountdown(invitation?.akad_date || new Date().toISOString());

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get('to');
    if (name) setGuestName(decodeURIComponent(name));
  }, []);

  useEffect(() => {
    if (invitation?.music_url) {
      const audio = new Audio(invitation.music_url);
      audio.loop = true;
      audioRef.current = audio;
    }
    return () => { audioRef.current?.pause(); };
  }, [invitation?.music_url]);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (musicPlaying) audioRef.current.pause(); else audioRef.current.play().catch(() => {});
    setMusicPlaying(!musicPlaying);
  };

  const handleRsvp = async () => {
    if (!guestName.trim()) { toast.error('Nama wajib diisi'); return; }
    if (!rsvpStatus) { toast.error('Pilih status kehadiran'); return; }
    try {
      // Get guest token from name match
      const { data } = await api.get(`/invitations/${invitation.id}/guests`);
      const guests: Tamu[] = data.data?.data || data.data || [];
      const matched = guests.find((g) => g.name.toLowerCase() === guestName.toLowerCase());
      if (!matched) { toast.error('\'' + guestName + '\' tidak ditemukan di daftar tamu'); return; }
      await api.post(`/rsvp/${matched.link_token}`, {
        attending: rsvpStatus === 'hadir',
        guest_count: parseInt(rsvpCount) || 1,
        message: rsvpMsg,
      });
      setSubmitted(true);
      toast.success('RSVP berhasil dikirim!');
    } catch (err: unknown) {
      const msg = err && typeof err === 'object' && 'response' in err
        ? (err as { response?: { data?: { message?: string } } })?.response?.data?.message
        : 'Gagal mengirim RSVP';
      toast.error(msg || 'Gagal mengirim RSVP');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Berhasil disalin');
  };

  const formattedDate = (d?: string) => {
    if (!d) return '';
    return new Date(d).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  const templateId = invitation?.template_id || 'classic';
  const isDark = templateId === 'classic' || templateId === '3';
  const bg = isDark ? 'bg-[#0f0f23]' : 'bg-white';
  const text = isDark ? 'text-[#e8e0d4]' : 'text-[#0a0a0a]';
  const accent = isDark ? 'text-amber-400' : 'text-amber-600';
  const cardBg = isDark ? 'bg-[#1a1a2e]/50' : 'bg-gray-50';

  if (!invitation) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className={`min-h-screen ${bg} ${text}`}>
      {/* Opening */}
      <AnimatePresence>
        {!opened && (
          <motion.div exit={{ opacity: 0 }} className={`fixed inset-0 z-50 flex flex-col items-center justify-center ${bg} p-6 text-center`}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-sm">
              <p className={`text-xs tracking-[0.3em] uppercase ${accent}/60 mb-4`}>UNDANGAN PERNIKAHAN</p>
              <h1 className="text-3xl font-bold mb-1">{invitation.groom_name || 'Mempelai Pria'}</h1>
              <div className="flex items-center justify-center gap-3 my-3">
                <div className={`h-px w-8 ${isDark ? 'bg-amber-500/30' : 'bg-amber-600/30'}`} />
                <Heart className={`h-4 w-4 ${accent}`} />
                <div className={`h-px w-8 ${isDark ? 'bg-amber-500/30' : 'bg-amber-600/30'}`} />
              </div>
              <h1 className="text-3xl font-bold mb-4">{invitation.bride_name || 'Mempelai Wanita'}</h1>
              {invitation.akad_date && <p className="text-sm text-muted-foreground mb-6">{formattedDate(invitation.akad_date)}</p>}
              <button onClick={() => setOpened(true)} className={`px-8 py-3 rounded-full ${isDark ? 'border border-amber-500/30 text-amber-400 hover:bg-amber-500/10' : 'bg-amber-600 text-white hover:bg-amber-700'} transition-colors`}>
                💌 Buka Undangan
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {opened && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {/* Hero */}
          <Section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden">
            <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-b from-[#1a1a2e]/80 to-[#0f0f23]' : 'bg-gradient-to-b from-amber-50/80 to-white'}`} />
            <div className="relative z-10 px-6 max-w-2xl">
              <p className={`text-xs tracking-[0.3em] uppercase ${accent}/60 mb-4`}>THE WEDDING OF</p>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{invitation.groom_name}</h1>
              <div className="flex items-center justify-center gap-3 my-3">
                <div className={`h-px w-8 ${isDark ? 'bg-amber-500/30' : 'bg-amber-600/30'}`} />
                <Heart className={`h-4 w-4 ${accent}`} />
                <div className={`h-px w-8 ${isDark ? 'bg-amber-500/30' : 'bg-amber-600/30'}`} />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{invitation.bride_name}</h1>
              {invitation.akad_date && <p className="text-sm text-muted-foreground">{formattedDate(invitation.akad_date)}</p>}
            </div>
          </Section>

          {/* Countdown */}
          <Section className={`py-16 px-6 text-center ${cardBg}`}>
            <p className={`text-xs tracking-[0.2em] uppercase ${accent}/60 mb-6`}>Menghitung Hari</p>
            <div className="flex justify-center gap-4">
              {[{ v: countdown.days, l: 'Hari' }, { v: countdown.hours, l: 'Jam' }, { v: countdown.minutes, l: 'Menit' }, { v: countdown.seconds, l: 'Detik' }].map((c, i) => (
                <div key={i} className={`w-16 h-16 rounded-xl ${isDark ? 'bg-[#1a1a2e] border border-amber-500/10' : 'bg-white border border-amber-100'} flex flex-col items-center justify-center`}>
                  <span className={`text-xl font-bold ${accent}`}>{c.v}</span>
                  <span className="text-[9px] text-muted-foreground">{c.l}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* Events */}
          <Section className="py-16 px-6">
            <p className={`text-xs tracking-[0.2em] uppercase ${accent}/60 mb-8 text-center`}>Detail Acara</p>
            <div className="max-w-lg mx-auto space-y-6">
              {invitation.akad_date && (
                <div className={`${isDark ? 'border border-amber-500/15 bg-amber-500/[0.03]' : 'bg-amber-50'} rounded-2xl p-6`}>
                  <h3 className={`text-base font-semibold ${accent} mb-3`}>💍 Akad Nikah</h3>
                  <div className="space-y-1.5 text-sm text-muted-foreground">
                    <p className="flex items-center gap-2"><Calendar className="h-4 w-4" />{formattedDate(invitation.akad_date)}</p>
                    {invitation.akad_time && <p>🕐 {invitation.akad_time} WIB</p>}
                    {invitation.akad_location && <p className="flex items-center gap-2"><MapPin className="h-4 w-4" />{invitation.akad_location}</p>}
                  </div>
                </div>
              )}
              {invitation.resepsi_date && (
                <div className={`${isDark ? 'border border-amber-500/15 bg-amber-500/[0.03]' : 'bg-amber-50'} rounded-2xl p-6`}>
                  <h3 className={`text-base font-semibold ${accent} mb-3`}>🎊 Resepsi</h3>
                  <div className="space-y-1.5 text-sm text-muted-foreground">
                    <p className="flex items-center gap-2"><Calendar className="h-4 w-4" />{formattedDate(invitation.resepsi_date)}</p>
                    {invitation.resepsi_time && <p>🕐 {invitation.resepsi_time} WIB</p>}
                    {invitation.resepsi_location && <p className="flex items-center gap-2"><MapPin className="h-4 w-4" />{invitation.resepsi_location}</p>}
                  </div>
                </div>
              )}
            </div>
          </Section>

          {/* RSVP */}
          <Section className={`py-16 px-6 ${cardBg}`} id="rsvp">
            <p className={`text-xs tracking-[0.2em] uppercase ${accent}/60 mb-6 text-center`}>Konfirmasi Kehadiran</p>
            <div className="max-w-sm mx-auto">
              {submitted ? (
                <div className={`text-center py-8 ${isDark ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-emerald-50'} rounded-2xl`}>
                  <div className="text-3xl mb-2">✅</div>
                  <p className="font-semibold text-emerald-500">Terima Kasih!</p>
                  <p className="text-sm text-muted-foreground mt-1">RSVP Anda berhasil dikirim</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <input placeholder="Nama Tamu" value={guestName} onChange={(e) => setGuestName(e.target.value)} className={`w-full px-4 py-3 rounded-xl ${inputClass(isDark)}`} />
                  <div className="flex gap-3">
                    {['hadir', 'tidak_hadir'].map((s) => (
                      <label key={s} className={`flex-1 flex items-center justify-center py-3 rounded-xl border cursor-pointer transition-colors ${rsvpStatus === s ? (isDark ? 'border-amber-500/40 bg-amber-500/10 text-amber-400' : 'border-amber-600 bg-amber-50 text-amber-600') : (isDark ? 'border-white/10 text-white/50' : 'border-gray-200 text-gray-500')}`}>
                        <input type="radio" name="rsvp" value={s} className="sr-only" onChange={() => setRsvpStatus(s)} />
                        <span className="text-sm">{s === 'hadir' ? '✅ Hadir' : '❌ Tidak'}</span>
                      </label>
                    ))}
                  </div>
                  {rsvpStatus === 'hadir' && (
                    <select value={rsvpCount} onChange={(e) => setRsvpCount(e.target.value)} className={`w-full px-4 py-3 rounded-xl ${inputClass(isDark)}`}>
                      {[1,2,3,4,5].map((n) => <option key={n} value={n}>{n} Orang</option>)}
                    </select>
                  )}
                  <textarea placeholder="Ucapan untuk mempelai..." rows={3} value={rsvpMsg} onChange={(e) => setRsvpMsg(e.target.value)} className={`w-full px-4 py-3 rounded-xl resize-none ${inputClass(isDark)}`} />
                  <button onClick={handleRsvp} className={`w-full py-3 rounded-xl font-semibold transition-all ${isDark ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:shadow-lg hover:shadow-amber-500/20' : 'bg-amber-600 text-white hover:bg-amber-700'}`}>
                    Kirim RSVP
                  </button>
                </div>
              )}
            </div>
          </Section>

          <div className={`py-8 text-center text-xs ${isDark ? 'text-white/15' : 'text-gray-400'}`}>
            Made with ❤️ using Undangan Digital
          </div>
        </motion.div>
      )}

      {/* Music toggle */}
      {opened && invitation?.music_url && (
        <button onClick={toggleMusic} className={`fixed bottom-6 left-6 z-40 w-10 h-10 rounded-full flex items-center justify-center border transition-all ${musicPlaying ? (isDark ? 'bg-amber-500/20 border-amber-500/30 text-amber-400' : 'bg-amber-100 border-amber-300 text-amber-600') : (isDark ? 'bg-white/5 border-white/10 text-white/30' : 'bg-white border-gray-200 text-gray-400')}`}>
          {musicPlaying ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
        </button>
      )}
    </div>
  );
}

function inputClass(isDark: boolean) {
  return isDark ? 'bg-[#1a1a2e] border border-white/10 text-white placeholder:text-white/25 focus:outline-none focus:border-amber-500/40' : 'bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-amber-500';
}
