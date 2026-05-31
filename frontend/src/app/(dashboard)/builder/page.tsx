'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StepIndicator from '@/components/wizard/StepIndicator';
import Button from '@/components/ui/Button';
import { useBuilderStore } from '@/store/builder.store';

/* ═══ WIZARD STEPS ═══ */

function Step1Template() {
  const { invitation, setTemplate } = useBuilderStore();
  const templates = [
    { id: 'classic', name: 'Classic Elegance', label: 'Emas & Navy', desc: 'Elegan klasik dengan aksen emas dan ornamen floral', icon: '👑' },
    { id: 'modern', name: 'Modern Minimal', label: 'Putih & Hitam', desc: 'Bersih dan kontemporer dengan layout geometris', icon: '▪️' },
    { id: 'nusantara', name: 'Nusantara', label: 'Batik & Budaya', desc: 'Kaya ornamen budaya Indonesia dengan warna hangat', icon: '✦' },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold text-white font-[Playfair_Display] mb-2">Pilih Template</h2>
      <p className="text-sm text-white/30 mb-6 font-[Inter]">Pilih tema undangan yang sesuai dengan gaya pernikahan Anda</p>
      <div className="grid md:grid-cols-3 gap-4">
        {templates.map((t) => (
          <button
            key={t.id}
            onClick={() => setTemplate(t.id)}
            className={`text-left p-6 rounded-2xl border transition-all duration-300 ${
              invitation.template_id === t.id
                ? 'border-amber-500/40 bg-amber-500/10'
                : 'border-white/[0.06] bg-white/[0.02] hover:border-white/10'
            }`}
          >
            <div className="text-3xl mb-3">{t.icon}</div>
            <h3 className="text-base font-semibold text-white/90 font-[Playfair_Display]">{t.name}</h3>
            <p className="text-xs text-amber-400/50 mb-2 font-[Inter]">{t.label}</p>
            <p className="text-xs text-white/30 font-[Inter]">{t.desc}</p>
            {invitation.template_id === t.id && (
              <div className="mt-3 text-xs text-amber-400 font-[Inter]">✓ Dipilih</div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function Step2Couple() {
  const { invitation, setBrideGroom } = useBuilderStore();
  const bride = (invitation.bride || {}) as Record<string, string>;
  const groom = (invitation.groom || {}) as Record<string, string>;

  return (
    <div>
      <h2 className="text-xl font-bold text-white font-[Playfair_Display] mb-2">Info Mempelai</h2>
      <p className="text-sm text-white/30 mb-6 font-[Inter]">Isi data mempelai pria dan wanita</p>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Bride */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-amber-400/70 font-[Inter]">👩 Mempelai Wanita</h3>
          <input placeholder="Nama Lengkap" defaultValue={bride.full_name || ''} onChange={(e) => setBrideGroom('bride', { ...bride, full_name: e.target.value })} className="w-full px-4 py-3 rounded-xl input-dark font-[Inter] text-sm" />
          <input placeholder="Nama Panggilan" defaultValue={bride.nickname || ''} onChange={(e) => setBrideGroom('bride', { ...bride, nickname: e.target.value })} className="w-full px-4 py-3 rounded-xl input-dark font-[Inter] text-sm" />
          <input placeholder="Nama Ayah" defaultValue={bride.father_name || ''} onChange={(e) => setBrideGroom('bride', { ...bride, father_name: e.target.value })} className="w-full px-4 py-3 rounded-xl input-dark font-[Inter] text-sm" />
          <input placeholder="Nama Ibu" defaultValue={bride.mother_name || ''} onChange={(e) => setBrideGroom('bride', { ...bride, mother_name: e.target.value })} className="w-full px-4 py-3 rounded-xl input-dark font-[Inter] text-sm" />
          <input placeholder="Urutan anak (contoh: kedua dari tiga bersaudara)" defaultValue={bride.child_order || ''} onChange={(e) => setBrideGroom('bride', { ...bride, child_order: e.target.value })} className="w-full px-4 py-3 rounded-xl input-dark font-[Inter] text-sm" />
        </div>
        {/* Groom */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-amber-400/70 font-[Inter]">👨 Mempelai Pria</h3>
          <input placeholder="Nama Lengkap" defaultValue={groom.full_name || ''} onChange={(e) => setBrideGroom('groom', { ...groom, full_name: e.target.value })} className="w-full px-4 py-3 rounded-xl input-dark font-[Inter] text-sm" />
          <input placeholder="Nama Panggilan" defaultValue={groom.nickname || ''} onChange={(e) => setBrideGroom('groom', { ...groom, nickname: e.target.value })} className="w-full px-4 py-3 rounded-xl input-dark font-[Inter] text-sm" />
          <input placeholder="Nama Ayah" defaultValue={groom.father_name || ''} onChange={(e) => setBrideGroom('groom', { ...groom, father_name: e.target.value })} className="w-full px-4 py-3 rounded-xl input-dark font-[Inter] text-sm" />
          <input placeholder="Nama Ibu" defaultValue={groom.mother_name || ''} onChange={(e) => setBrideGroom('groom', { ...groom, mother_name: e.target.value })} className="w-full px-4 py-3 rounded-xl input-dark font-[Inter] text-sm" />
          <input placeholder="Urutan anak" defaultValue={groom.child_order || ''} onChange={(e) => setBrideGroom('groom', { ...groom, child_order: e.target.value })} className="w-full px-4 py-3 rounded-xl input-dark font-[Inter] text-sm" />
        </div>
      </div>
    </div>
  );
}

function Step3Events() {
  const { invitation, setEvents } = useBuilderStore();
  const events = invitation.events || [{ type: 'akad', date: '', start_time: '', end_time: '', location_name: '', address: '' }, { type: 'resepsi', date: '', start_time: '', end_time: '', location_name: '', address: '' }];

  const updateEvent = (index: number, field: string, value: string) => {
    const updated = events.map((ev, i) => i === index ? { ...ev, [field]: value } : ev);
    setEvents(updated);
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-white font-[Playfair_Display] mb-2">Detail Acara</h2>
      <p className="text-sm text-white/30 mb-6 font-[Inter]">Isi jadwal akad dan resepsi</p>
      <div className="space-y-8">
        {events.map((ev, i) => (
          <div key={i} className="glass-card rounded-2xl p-6">
            <h3 className="text-base font-semibold text-amber-400/80 font-[Playfair_Display] mb-4">{ev.type === 'akad' ? '💍 Akad Nikah' : '🎊 Resepsi'}</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-white/30 font-[Inter] mb-1 block">Tanggal</label>
                <input type="date" value={ev.date} onChange={(e) => updateEvent(i, 'date', e.target.value)} className="w-full px-4 py-3 rounded-xl input-dark font-[Inter] text-sm" />
              </div>
              <div>
                <label className="text-xs text-white/30 font-[Inter] mb-1 block">Nama Lokasi</label>
                <input placeholder="Gedung Pernikahan" value={ev.location_name} onChange={(e) => updateEvent(i, 'location_name', e.target.value)} className="w-full px-4 py-3 rounded-xl input-dark font-[Inter] text-sm" />
              </div>
              <div>
                <label className="text-xs text-white/30 font-[Inter] mb-1 block">Waktu Mulai</label>
                <input type="time" value={ev.start_time} onChange={(e) => updateEvent(i, 'start_time', e.target.value)} className="w-full px-4 py-3 rounded-xl input-dark font-[Inter] text-sm" />
              </div>
              <div>
                <label className="text-xs text-white/30 font-[Inter] mb-1 block">Waktu Selesai</label>
                <input type="time" value={ev.end_time} onChange={(e) => updateEvent(i, 'end_time', e.target.value)} className="w-full px-4 py-3 rounded-xl input-dark font-[Inter] text-sm" />
              </div>
              <div className="md:col-span-2">
                <label className="text-xs text-white/30 font-[Inter] mb-1 block">Alamat Lengkap</label>
                <input placeholder="Jl. ..." value={ev.address} onChange={(e) => updateEvent(i, 'address', e.target.value)} className="w-full px-4 py-3 rounded-xl input-dark font-[Inter] text-sm" />
              </div>
              <div className="md:col-span-2">
                <label className="text-xs text-white/30 font-[Inter] mb-1 block">Link Google Maps</label>
                <input placeholder="https://maps.google.com/..." value={ev.maps_link || ''} onChange={(e) => updateEvent(i, 'maps_link', e.target.value)} className="w-full px-4 py-3 rounded-xl input-dark font-[Inter] text-sm" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Step4Story() {
  const { invitation, setLoveStories } = useBuilderStore();
  const stories = invitation.love_stories || [];

  const addStory = () => {
    setLoveStories([...stories, { date: '', title: '', description: '', photo_url: '' }]);
  };

  const updateStory = (index: number, field: string, value: string) => {
    const updated = stories.map((s, i) => i === index ? { ...s, [field]: value } : s);
    setLoveStories(updated);
  };

  const removeStory = (index: number) => {
    setLoveStories(stories.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-white font-[Playfair_Display] mb-2">Love Story</h2>
      <p className="text-sm text-white/30 mb-6 font-[Inter]">Ceritakan kisah cinta Anda</p>
      <div className="space-y-4">
        {stories.map((s, i) => (
          <div key={i} className="glass-card rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-amber-400/50 font-[Inter]">Moment #{i + 1}</span>
              <button onClick={() => removeStory(i)} className="text-red-400/50 text-xs font-[Inter] hover:text-red-400">Hapus</button>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              <input placeholder="Tanggal (contoh: Januari 2020)" value={s.date} onChange={(e) => updateStory(i, 'date', e.target.value)} className="px-4 py-2.5 rounded-lg input-dark font-[Inter] text-sm" />
              <input placeholder="Judul (contoh: Pertama Bertemu)" value={s.title} onChange={(e) => updateStory(i, 'title', e.target.value)} className="px-4 py-2.5 rounded-lg input-dark font-[Inter] text-sm" />
            </div>
            <textarea placeholder="Ceritakan moment ini..." rows={2} value={s.description} onChange={(e) => updateStory(i, 'description', e.target.value)} className="w-full px-4 py-2.5 rounded-lg input-dark font-[Inter] text-sm resize-none" />
          </div>
        ))}
        <button onClick={addStory} className="w-full py-3 rounded-xl border border-dashed border-white/10 text-white/30 text-sm font-[Inter] hover:border-amber-500/30 hover:text-amber-400/50 transition-colors">
          + Tambah Moment
        </button>
      </div>
    </div>
  );
}

function Step5Gallery() {
  const { invitation, setGallery } = useBuilderStore();
  const images = invitation.gallery_images || [];

  const addPlaceholder = () => {
    setGallery([...images, { url: '', caption: '', order: images.length }]);
  };

  const updateImage = (index: number, field: string, value: string) => {
    const updated = images.map((img, i) => i === index ? { ...img, [field]: value } : img);
    setGallery(updated);
  };

  const removeImage = (index: number) => {
    setGallery(images.filter((_, i) => i !== index).map((img, i) => ({ ...img, order: i })));
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-white font-[Playfair_Display] mb-2">Galeri Foto</h2>
      <p className="text-sm text-white/30 mb-6 font-[Inter]">Upload foto-foto prewedding atau moment berharga</p>
      <div className="space-y-4">
        {images.map((img, i) => (
          <div key={i} className="glass-card rounded-xl p-4 flex items-center gap-4">
            <div className="w-16 h-16 rounded-lg bg-white/[0.03] flex items-center justify-center overflow-hidden flex-shrink-0">
              {img.url ? <img src={img.url} alt="" className="w-full h-full object-cover" /> : <span className="text-white/20 text-xs">+</span>}
            </div>
            <div className="flex-1 grid md:grid-cols-2 gap-3">
              <input placeholder="URL Foto" value={img.url} onChange={(e) => updateImage(i, 'url', e.target.value)} className="px-4 py-2.5 rounded-lg input-dark font-[Inter] text-sm" />
              <input placeholder="Keterangan foto" value={img.caption || ''} onChange={(e) => updateImage(i, 'caption', e.target.value)} className="px-4 py-2.5 rounded-lg input-dark font-[Inter] text-sm" />
            </div>
            <button onClick={() => removeImage(i)} className="text-red-400/50 text-xs font-[Inter] hover:text-red-400">✕</button>
          </div>
        ))}
        <button onClick={addPlaceholder} className="w-full py-6 rounded-xl border-2 border-dashed border-white/10 text-white/25 font-[Inter] hover:border-amber-500/30 hover:text-amber-400/50 transition-colors">
          + Tambah Foto
        </button>
      </div>
    </div>
  );
}

function Step6Gifts() {
  const { invitation, setGifts } = useBuilderStore();
  const gifts = invitation.gift_accounts || [];

  const addGift = () => {
    setGifts([...gifts, { bank_name: '', account_number: '', account_name: '', type: 'bank' }]);
  };

  const updateGift = (index: number, field: string, value: string) => {
    const updated = gifts.map((g, i) => i === index ? { ...g, [field]: value } : g);
    setGifts(updated);
  };

  const removeGift = (index: number) => {
    setGifts(gifts.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-white font-[Playfair_Display] mb-2">Hadiah Pernikahan</h2>
      <p className="text-sm text-white/30 mb-6 font-[Inter]">Tambahkan info rekening atau e-wallet untuk hadiah digital</p>
      <div className="space-y-4">
        {gifts.map((g, i) => (
          <div key={i} className="glass-card rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-amber-400/50 font-[Inter]">Rekening #{i + 1}</span>
              <button onClick={() => removeGift(i)} className="text-red-400/50 text-xs font-[Inter] hover:text-red-400">Hapus</button>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              <select value={g.type} onChange={(e) => updateGift(i, 'type', e.target.value)} className="px-4 py-2.5 rounded-lg input-dark font-[Inter] text-sm">
                <option value="bank">Transfer Bank</option>
                <option value="ewallet">E-Wallet</option>
              </select>
              <input placeholder="Nama Bank/E-Wallet" value={g.bank_name} onChange={(e) => updateGift(i, 'bank_name', e.target.value)} className="px-4 py-2.5 rounded-lg input-dark font-[Inter] text-sm" />
              <input placeholder="Nomor Rekening/E-Wallet" value={g.account_number} onChange={(e) => updateGift(i, 'account_number', e.target.value)} className="px-4 py-2.5 rounded-lg input-dark font-[Inter] text-sm" />
              <input placeholder="Atas Nama" value={g.account_name} onChange={(e) => updateGift(i, 'account_name', e.target.value)} className="px-4 py-2.5 rounded-lg input-dark font-[Inter] text-sm" />
            </div>
          </div>
        ))}
        <button onClick={addGift} className="w-full py-3 rounded-xl border border-dashed border-white/10 text-white/30 text-sm font-[Inter] hover:border-amber-500/30 hover:text-amber-400/50 transition-colors">
          + Tambah Rekening
        </button>
      </div>
    </div>
  );
}

function Step7Rsvp() {
  const { invitation, setRsvpSettings } = useBuilderStore();

  return (
    <div>
      <h2 className="text-xl font-bold text-white font-[Playfair_Display] mb-2">Pengaturan</h2>
      <p className="text-sm text-white/30 mb-6 font-[Inter]">Atur pesan dan deadline RSVP</p>
      <div className="space-y-4">
        <div>
          <label className="text-xs text-white/30 font-[Inter] mb-1 block">Tanggal Deadline RSVP</label>
          <input type="date" value={invitation.rsvp_deadline || ''} onChange={(e) => setRsvpSettings({ deadline: e.target.value })} className="w-full px-4 py-3 rounded-xl input-dark font-[Inter] text-sm" />
        </div>
        <div>
          <label className="text-xs text-white/30 font-[Inter] mb-1 block">Pesan Sambutan</label>
          <textarea
            placeholder="Terima kasih telah hadir di hari bahagia kami..."
            rows={4}
            defaultValue={invitation.welcome_message || ''}
            onChange={(e) => setRsvpSettings({ welcome_message: e.target.value })}
            className="w-full px-4 py-3 rounded-xl input-dark font-[Inter] text-sm resize-none"
          />
        </div>
      </div>
    </div>
  );
}

function Step8Publish() {
  const { invitation, setTitle, setSlug } = useBuilderStore();
  return (
    <div>
      <h2 className="text-xl font-bold text-white font-[Playfair_Display] mb-2">Publish Undangan</h2>
      <p className="text-sm text-white/30 mb-6 font-[Inter]">Review dan publikasikan undangan Anda</p>
      <div className="space-y-4">
        <div>
          <label className="text-xs text-white/30 font-[Inter] mb-1 block">Judul Undangan</label>
          <input
            placeholder="Pernikahan Ahmad & Siti"
            defaultValue={invitation.title || ''}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 rounded-xl input-dark font-[Inter] text-sm"
          />
        </div>
        <div>
          <label className="text-xs text-white/30 font-[Inter] mb-1 block">Slug URL</label>
          <div className="flex items-center gap-0">
            <span className="px-4 py-3 rounded-l-xl bg-white/[0.03] border border-r-0 border-white/5 text-white/20 text-sm font-[Inter]">/undangan/</span>
            <input
              placeholder="ahmad-siti-2026"
              defaultValue={invitation.slug || ''}
              onChange={(e) => setSlug(e.target.value)}
              className="flex-1 px-4 py-3 rounded-r-xl input-dark font-[Inter] text-sm"
            />
          </div>
        </div>

        {/* Summary */}
        <div className="glass-card rounded-2xl p-6 mt-6">
          <h3 className="text-base font-semibold text-amber-400/80 font-[Playfair_Display] mb-4">Ringkasan</h3>
          <div className="grid grid-cols-2 gap-4 text-sm font-[Inter]">
            <div>
              <span className="text-white/25">Template</span>
              <p className="text-white/70 capitalize">{invitation.template_id || '—'}</p>
            </div>
            <div>
              <span className="text-white/25">Slug</span>
              <p className="text-white/70">{invitation.slug || '—'}</p>
            </div>
            <div>
              <span className="text-white/25">Mempelai Wanita</span>
              <p className="text-white/70">{invitation.bride?.full_name || '—'}</p>
            </div>
            <div>
              <span className="text-white/25">Mempelai Pria</span>
              <p className="text-white/70">{invitation.groom?.full_name || '—'}</p>
            </div>
            <div>
              <span className="text-white/25">Total Acara</span>
              <p className="text-white/70">{invitation.events?.length || 0} acara</p>
            </div>
            <div>
              <span className="text-white/25">Total Foto</span>
              <p className="text-white/70">{invitation.gallery_images?.length || 0} foto</p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-[Inter]">
          ✓ Undangan siap dipublikasikan! Link akan tersedia setelah publish.
        </div>
      </div>
    </div>
  );
}

/* ═══ MAIN BUILDER PAGE ═══ */

export default function BuilderPage() {
  const { currentStep, setStep, reset } = useBuilderStore();
  const [submitting, setSubmitting] = useState(false);

  const steps = [
    { label: 'Template', component: <Step1Template /> },
    { label: 'Mempelai', component: <Step2Couple /> },
    { label: 'Acara', component: <Step3Events /> },
    { label: 'Story', component: <Step4Story /> },
    { label: 'Galeri', component: <Step5Gallery /> },
    { label: 'Hadiah', component: <Step6Gifts /> },
    { label: 'RSVP', component: <Step7Rsvp /> },
    { label: 'Publish', component: <Step8Publish /> },
  ];

  const canNext = currentStep < steps.length - 1;
  const canPrev = currentStep > 0;

  const handleNext = () => {
    if (canNext) setStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (canPrev) setStep(currentStep - 1);
  };

  const handlePublish = async () => {
    setSubmitting(true);
    // TODO: POST to API
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitting(false);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white font-[Playfair_Display]">Buat Undangan Baru</h1>
        <p className="text-sm text-white/30 mt-1 font-[Inter]">Ikuti langkah berikut untuk membuat undangan digital</p>
      </div>

      <StepIndicator current={currentStep} />

      <div className="glass-card rounded-2xl p-6 md:p-8 min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {steps[currentStep].component}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6">
        <div className="flex gap-3">
          {canPrev && (
            <Button variant="secondary" onClick={handlePrev}>← Sebelumnya</Button>
          )}
        </div>
        <div className="flex gap-3">
          <Button variant="ghost" onClick={() => { reset(); setStep(0); }}>Reset</Button>
          {currentStep === steps.length - 1 ? (
            <Button variant="primary" onClick={handlePublish} loading={submitting}>
              🚀 Publish Undangan
            </Button>
          ) : (
            <Button variant="primary" onClick={handleNext}>Selanjutnya →</Button>
          )}
        </div>
      </div>
    </div>
  );
}
