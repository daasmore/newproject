'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { useBuilderStore } from '@/store/builderStore';
import { BUILDER_STEPS, type BuilderStep } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { Check, ChevronLeft, ChevronRight, Save, PartyPopper, Eye } from 'lucide-react';
import api from '@/lib/api';

// ─── Step configurations ───
const STEP_META: Record<BuilderStep, { title: string; description: string }> = {
  'template': { title: 'Pilih Template', description: 'Pilih desain undangan yang sesuai dengan selera Anda' },
  'mempelai': { title: 'Info Mempelai', description: 'Masukkan informasi kedua mempelai' },
  'acara': { title: 'Detail Acara', description: 'Atur jadwal dan lokasi pernikahan' },
  'love-story': { title: 'Love Story', description: 'Ceritakan perjalanan cinta Anda berdua' },
  'galeri': { title: 'Galeri Foto', description: 'Unggah foto-foto indah momen spesial' },
  'hadiah': { title: 'Hadiah', description: 'Atur informasi hadiah dan rekening' },
  'rsvp': { title: 'RSVP Settings', description: 'Konfirmasi kehadiran dan batas waktu' },
};

export default function BuilderSectionPage() {
  const params = useParams();
  const section = params.section as BuilderStep;
  const {
    currentStep, weddingData, isSaving, currentStepKey,
    setStepByKey, nextStep, prevStep,
    updateMempelai, addAcara, removeAcara, updateAcara,
    updateLoveStory, updateGallery, addGallery, removeGallery,
    addBankGift, removeBankGift, addEWalletGift, removeEWalletGift,
    updateRSVPSettings, setTemplateId, setSlug, setCoverPhoto,
    setMusicUrl, resetBuilder, publish, setSaving, setWeddingData,
  } = useBuilderStore();

  const [localAutoSave, setLocalAutoSave] = useState(false);
  const isValidStep = BUILDER_STEPS.some((s) => s.key === section);

  // Redirect if invalid step
  useEffect(() => {
    if (!isValidStep) setStepByKey('template');
  }, [isValidStep, setStepByKey]);

  // Sync step on mount
  useEffect(() => {
    if (isValidStep) setStepByKey(section);
  }, [section]);

  // Auto-save every 30s
  const autoSave = useCallback(async () => {
    if (!weddingData.slug && !weddingData.template_id) return;
    try {
      setSaving(true);
      if (weddingData.id) {
        await api.put(`/wedding/${weddingData.id}`, weddingData);
      } else if (weddingData.slug) {
        const { data } = await api.post('/wedding', weddingData);
        setWeddingData({ id: data.data.id });
      }
      toast.success('Auto-save berhasil');
    } catch {
      toast.error('Gagal auto-save');
    } finally {
      setSaving(false);
    }
  }, [weddingData, setSaving, setWeddingData]);

  useEffect(() => {
    if (!localAutoSave) return;
    const interval = setInterval(autoSave, 30000);
    return () => clearInterval(interval);
  }, [localAutoSave, autoSave]);

  useEffect(() => {
    setLocalAutoSave(true);
  }, []);

  if (!isValidStep) return null;

  const stepIndex = BUILDER_STEPS.findIndex((s) => s.key === section);
  const progress = ((stepIndex + 1) / BUILDER_STEPS.length) * 100;
  const meta = STEP_META[section];

  const handlePublish = async () => {
    try {
      if (weddingData.id) {
        await api.put(`/wedding/${weddingData.id}`, { ...weddingData, is_published: true });
      }
      publish();
      toast.success('Undangan berhasil dipublikasikan! 🎉');
    } catch {
      toast.error('Gagal mempublikasikan undangan');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Builder Undangan</h1>
          <p className="text-muted-foreground">Langkah {stepIndex + 1} dari {BUILDER_STEPS.length}: {meta.description}</p>
        </div>
        {weddingData.slug && (
          <a href={`/undangan/${weddingData.slug}`} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
          </a>
        )}
      </div>

      {/* Progress */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Progress</span>
            <span className="text-sm font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between mt-3">
            {BUILDER_STEPS.map((step, idx) => (
              <button
                key={step.key}
                onClick={() => setStepByKey(step.key)}
                className={`flex items-center gap-1 text-xs transition ${
                  idx <= stepIndex ? 'text-amber-700 font-medium' : 'text-gray-400'
                }`}
              >
                {idx < stepIndex ? (
                  <Check className="h-3 w-3 text-green-600" />
                ) : (
                  <span className={`w-3 h-3 rounded-full border-2 flex items-center justify-center text-[8px] ${
                    idx === stepIndex ? 'border-amber-600 bg-amber-600 text-white' : 'border-gray-300'
                  }`}>{idx + 1}</span>
                )}
                <span className="hidden sm:inline">{step.label}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Step Content */}
      <Card>
        <CardHeader>
          <CardTitle>{meta.title}</CardTitle>
          <CardDescription>{meta.description}</CardDescription>
        </CardHeader>
        <CardContent>
          {section === 'template' && (
            <TemplateStep
              selectedId={weddingData.template_id || ''}
              onSelect={setTemplateId}
            />
          )}
          {section === 'mempelai' && (
            <MempelaiStep
              data={weddingData.mempelai}
              slug={weddingData.slug || ''}
              onUpdate={updateMempelai}
              onSlugChange={setSlug}
            />
          )}
          {section === 'acara' && (
            <AcaraStep
              acara={weddingData.acara || []}
              onAdd={addAcara}
              onRemove={removeAcara}
              onUpdate={updateAcara}
            />
          )}
          {section === 'love-story' && (
            <LoveStoryStep
              items={weddingData.love_story || []}
              onUpdate={updateLoveStory}
            />
          )}
          {section === 'galeri' && (
            <GaleriStep
              items={weddingData.gallery || []}
              coverPhoto={weddingData.cover_photo}
              musicUrl={weddingData.music_url}
              onAdd={addGallery}
              onRemove={removeGallery}
              onUpdate={updateGallery}
              onCoverChange={setCoverPhoto}
              onMusicChange={setMusicUrl}
            />
          )}
          {section === 'hadiah' && (
            <HadiahStep
              banks={weddingData.gifts?.banks || []}
              ewallets={weddingData.gifts?.e_wallets || []}
              onAddBank={addBankGift}
              onRemoveBank={removeBankGift}
              onAddEWallet={addEWalletGift}
              onRemoveEWallet={removeEWalletGift}
            />
          )}
          {section === 'rsvp' && (
            <RSVPStep
              settings={weddingData.rsvp_settings}
              isPublished={weddingData.is_published || false}
              onUpdate={updateRSVPSettings}
              onPublish={handlePublish}
            />
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={stepIndex === 0}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Sebelumnya
        </Button>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={autoSave} disabled={isSaving}>
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? 'Menyimpan...' : 'Simpan'}
          </Button>
          {stepIndex < BUILDER_STEPS.length - 1 ? (
            <Button onClick={nextStep}>
              Selanjutnya
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          ) : (
            <Button onClick={handlePublish}>
              <PartyPopper className="h-4 w-4 mr-2" />
              Publikasikan
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Template Step ───
function TemplateStep({ selectedId, onSelect }: { selectedId: string; onSelect: (id: string) => void }) {
  const templates = [
    { id: 'classic', name: 'Classic', desc: 'Elegan dengan sentuhan emas dan ornamen tradisional', theme: 'theme-classic', color: 'bg-amber-100 border-amber-300' },
    { id: 'elegant', name: 'Elegant', desc: 'Minimalis, modern, dan berkesan mewah', theme: 'theme-elegant', color: 'bg-slate-100 border-slate-300' },
    { id: 'nature', name: 'Nature', desc: 'Segar dengan warna natural dan nuansa alam', theme: 'theme-nature', color: 'bg-green-100 border-green-300' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {templates.map((t) => (
        <button
          key={t.id}
          onClick={() => onSelect(t.id)}
          className={`p-6 rounded-xl border-2 text-left transition-all hover:shadow-md ${
            selectedId === t.id ? 'border-amber-500 ring-2 ring-amber-200 shadow-lg' : 'border-gray-200 hover:border-amber-300'
          } ${t.color}`}
        >
          <div className="text-lg font-semibold mb-1">{t.name}</div>
          <p className="text-sm text-muted-foreground">{t.desc}</p>
          {selectedId === t.id && (
            <div className="mt-3 flex items-center gap-1 text-amber-700 text-sm font-medium">
              <Check className="h-4 w-4" /> Dipilih
            </div>
          )}
        </button>
      ))}
      <input type="hidden" value={selectedId} />
    </div>
  );
}

// ─── Mempelai Step ───
function MempelaiStep({ data, slug, onUpdate, onSlugChange }: {
  data: any; slug: string;
  onUpdate: (d: any) => void;
  onSlugChange: (s: string) => void;
}) {
  const m = data || {};
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Slug Undangan (URL)</Label>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground whitespace-nowrap">/undangan/</span>
          <Input value={slug} onChange={(e) => onSlugChange(e.target.value.toLowerCase().replace(/\s+/g, '-'))} placeholder="nama-pria-dan-wanita" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Mempelai Wanita */}
        <div className="space-y-4 p-4 bg-pink-50 rounded-xl">
          <h3 className="font-semibold text-pink-800">👰 Mempelai Wanita</h3>
          <div className="space-y-2">
            <Label>Nama Panggilan</Label>
            <Input value={m.bride_nickname || ''} onChange={(e) => onUpdate({ bride_nickname: e.target.value })} placeholder="Contoh: Sarah" />
          </div>
          <div className="space-y-2">
            <Label>Nama Lengkap</Label>
            <Input value={m.bride_full_name || ''} onChange={(e) => onUpdate({ bride_full_name: e.target.value })} placeholder="Sarah Putri Maharani" />
          </div>
          <div className="space-y-2">
            <Label>Nama Ayah</Label>
            <Input value={m.bride_father || ''} onChange={(e) => onUpdate({ bride_father: e.target.value })} placeholder="Bpk. Ahmad" />
          </div>
          <div className="space-y-2">
            <Label>Nama Ibu</Label>
            <Input value={m.bride_mother || ''} onChange={(e) => onUpdate({ bride_mother: e.target.value })} placeholder="Ibu Siti" />
          </div>
        </div>

        {/* Mempelai Pria */}
        <div className="space-y-4 p-4 bg-blue-50 rounded-xl">
          <h3 className="font-semibold text-blue-800">🤵 Mempelai Pria</h3>
          <div className="space-y-2">
            <Label>Nama Panggilan</Label>
            <Input value={m.groom_nickname || ''} onChange={(e) => onUpdate({ groom_nickname: e.target.value })} placeholder="Contoh: Budi" />
          </div>
          <div className="space-y-2">
            <Label>Nama Lengkap</Label>
            <Input value={m.groom_full_name || ''} onChange={(e) => onUpdate({ groom_full_name: e.target.value })} placeholder="Budi Pratama" />
          </div>
          <div className="space-y-2">
            <Label>Nama Ayah</Label>
            <Input value={m.groom_father || ''} onChange={(e) => onUpdate({ groom_father: e.target.value })} placeholder="Bpk. Joko" />
          </div>
          <div className="space-y-2">
            <Label>Nama Ibu</Label>
            <Input value={m.groom_mother || ''} onChange={(e) => onUpdate({ groom_mother: e.target.value })} placeholder="Ibu Rina" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Acara Step ───
function AcaraStep({ acara, onAdd, onRemove, onUpdate }: {
  acara: any[]; onAdd: (a: any) => void; onRemove: (id: string) => void; onUpdate: (a: any[]) => void;
}) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ type: 'akad' as 'akad' | 'resepsi', date: '', start_time: '', end_time: '', timezone: 'WIB', location_name: '', address: '', maps_url: '' });

  const handleAdd = () => {
    if (!form.date || !form.start_time || !form.location_name) {
      toast.error('Tanggal, waktu, dan tempat wajib diisi');
      return;
    }
    onAdd({ ...form, id: crypto.randomUUID() });
    setForm({ type: 'akad', date: '', start_time: '', end_time: '', timezone: 'WIB', location_name: '', address: '', maps_url: '' });
    setShowForm(false);
    toast.success('Acara berhasil ditambahkan');
  };

  return (
    <div className="space-y-4">
      {acara.map((a, idx) => (
        <div key={a.id || idx} className="p-4 bg-gray-50 rounded-xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-medium capitalize">{a.type === 'akad' ? '💒 Akad Nikah' : '🎉 Resepsi'}</span>
            <Button variant="ghost" size="sm" onClick={() => a.id && onRemove(a.id)}>Hapus</Button>
          </div>
          <p className="text-sm text-muted-foreground">{a.date} · {a.start_time}-{a.end_time} {a.timezone}</p>
          <p className="text-sm">{a.location_name} — {a.address}</p>
        </div>
      ))}

      {showForm ? (
        <div className="p-4 border rounded-xl space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Tipe</Label>
              <select className="w-full border rounded-lg p-2 text-sm" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as 'akad' | 'resepsi' })}>
                <option value="akad">Akad Nikah</option>
                <option value="resepsi">Resepsi</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Tanggal</Label>
              <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Waktu Mulai</Label>
              <Input type="time" value={form.start_time} onChange={(e) => setForm({ ...form, start_time: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Waktu Selesai</Label>
              <Input type="time" value={form.end_time} onChange={(e) => setForm({ ...form, end_time: e.target.value })} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Nama Tempat</Label>
            <Input value={form.location_name} onChange={(e) => setForm({ ...form, location_name: e.target.value })} placeholder="Gedung Serbaguna / Masjid / Gereja" />
          </div>
          <div className="space-y-2">
            <Label>Alamat Lengkap</Label>
            <Textarea value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Jl. Contoh No. 123, Kota" />
          </div>
          <div className="space-y-2">
            <Label>Link Google Maps (opsional)</Label>
            <Input value={form.maps_url} onChange={(e) => setForm({ ...form, maps_url: e.target.value })} placeholder="https://maps.google.com/..." />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleAdd}>Tambah Acara</Button>
            <Button variant="outline" onClick={() => setShowForm(false)}>Batal</Button>
          </div>
        </div>
      ) : (
        <Button variant="outline" onClick={() => setShowForm(true)}>+ Tambah Acara</Button>
      )}
    </div>
  );
}

// ─── Love Story Step ───
function LoveStoryStep({ items, onUpdate }: { items: any[]; onUpdate: (items: any[]) => void }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ date: '', title: '', description: '' });

  const handleAdd = () => {
    if (!form.title || !form.description) {
      toast.error('Judul dan deskripsi wajib diisi');
      return;
    }
    onUpdate([...items, { ...form, id: crypto.randomUUID() }]);
    setForm({ date: '', title: '', description: '' });
    setShowForm(false);
    toast.success('Cerita berhasil ditambahkan');
  };

  return (
    <div className="space-y-4">
      <div className="relative border-l-2 border-amber-200 ml-4 space-y-6">
        {items.map((item, idx) => (
          <div key={item.id || idx} className="relative pl-8">
            <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-amber-400 border-2 border-white" />
            <div className="bg-white p-4 rounded-xl border shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  {item.date && <p className="text-xs text-amber-600 mb-1">{item.date}</p>}
                  <h4 className="font-semibold">{item.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => {
                  const newItems = items.filter((_, i) => i !== idx);
                  onUpdate(newItems);
                }}>🗑️</Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showForm ? (
        <div className="p-4 border rounded-xl space-y-4">
          <div className="space-y-2">
            <Label>Tanggal (opsional)</Label>
            <Input value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} placeholder="Januari 2024" />
          </div>
          <div className="space-y-2">
            <Label>Judul</Label>
            <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Pertemuan Pertama" />
          </div>
          <div className="space-y-2">
            <Label>Deskripsi</Label>
            <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Ceritakan momen indah..." />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleAdd}>Tambah</Button>
            <Button variant="outline" onClick={() => setShowForm(false)}>Batal</Button>
          </div>
        </div>
      ) : (
        <Button variant="outline" onClick={() => setShowForm(true)}>+ Tambah Cerita</Button>
      )}
    </div>
  );
}

// ─── Galeri Step ───
function GaleriStep({ items, coverPhoto, musicUrl, onAdd, onRemove, onUpdate, onCoverChange, onMusicChange }: {
  items: any[]; coverPhoto?: string; musicUrl?: string;
  onAdd: (item: any) => void; onRemove: (id: string) => void; onUpdate: (items: any[]) => void;
  onCoverChange: (url: string) => void; onMusicChange: (url: string) => void;
}) {
  const [urlInput, setUrlInput] = useState('');

  const handleAddUrl = () => {
    if (!urlInput.trim()) return;
    onAdd({ url: urlInput, caption: '', id: crypto.randomUUID() });
    setUrlInput('');
  };

  return (
    <div className="space-y-6">
      {/* Cover Photo */}
      <div className="space-y-2">
        <Label>URL Foto Sampul</Label>
        <Input value={coverPhoto || ''} onChange={(e) => onCoverChange(e.target.value)} placeholder="https://example.com/cover.jpg" />
        {coverPhoto && (
          <div className="w-full h-32 bg-gray-100 rounded-lg border flex items-center justify-center text-sm text-muted-foreground">
            Preview: {coverPhoto}
          </div>
        )}
      </div>

      {/* Music URL */}
      <div className="space-y-2">
        <Label>URL Musik Latar (opsional)</Label>
        <Input value={musicUrl || ''} onChange={(e) => onMusicChange(e.target.value)} placeholder="https://example.com/music.mp3" />
      </div>

      {/* Gallery */}
      <div className="space-y-2">
        <Label>Galeri Foto</Label>
        <div className="flex gap-2">
          <Input value={urlInput} onChange={(e) => setUrlInput(e.target.value)} placeholder="https://example.com/photo.jpg" />
          <Button onClick={handleAddUrl} variant="outline">Tambah</Button>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-4">
          {items.map((item, idx) => (
            <div key={item.id || idx} className="relative group rounded-lg overflow-hidden border bg-gray-50 aspect-square flex items-center justify-center">
              <span className="text-xs text-muted-foreground text-center p-2 break-all">{item.url.substring(0, 40)}...</span>
              <button
                onClick={() => item.id && onRemove(item.id)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs opacity-0 group-hover:opacity-100 transition"
              >×</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Hadiah Step ───
function HadiahStep({ banks, ewallets, onAddBank, onRemoveBank, onAddEWallet, onRemoveEWallet }: {
  banks: any[]; ewallets: any[];
  onAddBank: (b: any) => void; onRemoveBank: (id: string) => void;
  onAddEWallet: (w: any) => void; onRemoveEWallet: (id: string) => void;
}) {
  const [bankForm, setBankForm] = useState({ bank_name: '', account_number: '', account_name: '' });
  const [walletForm, setWalletForm] = useState({ type: 'GoPay', phone: '', account_name: '' });
  const [showBankForm, setShowBankForm] = useState(false);
  const [showWalletForm, setShowWalletForm] = useState(false);

  return (
    <div className="space-y-6">
      {/* Bank Accounts */}
      <div className="space-y-3">
        <h3 className="font-semibold">🏦 Transfer Bank</h3>
        {banks.map((b, idx) => (
          <div key={b.id || idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">{b.bank_name}</p>
              <p className="text-sm text-muted-foreground">{b.account_number} a.n. {b.account_name}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => b.id && onRemoveBank(b.id)}>Hapus</Button>
          </div>
        ))}
        {showBankForm ? (
          <div className="p-4 border rounded-xl space-y-3">
            <Input placeholder="Nama Bank (BCA, BRI, dll)" value={bankForm.bank_name} onChange={(e) => setBankForm({ ...bankForm, bank_name: e.target.value })} />
            <Input placeholder="Nomor Rekening" value={bankForm.account_number} onChange={(e) => setBankForm({ ...bankForm, account_number: e.target.value })} />
            <Input placeholder="Nama Pemilik Rekening" value={bankForm.account_name} onChange={(e) => setBankForm({ ...bankForm, account_name: e.target.value })} />
            <div className="flex gap-2">
              <Button onClick={() => {
                if (!bankForm.bank_name || !bankForm.account_number) { toast.error('Bank dan nomor rekening wajib'); return; }
                onAddBank({ ...bankForm, id: crypto.randomUUID() });
                setBankForm({ bank_name: '', account_number: '', account_name: '' });
                setShowBankForm(false);
              }}>Tambah</Button>
              <Button variant="outline" onClick={() => setShowBankForm(false)}>Batal</Button>
            </div>
          </div>
        ) : (
          <Button variant="outline" onClick={() => setShowBankForm(true)}>+ Tambah Rekening</Button>
        )}
      </div>

      {/* E-Wallet */}
      <div className="space-y-3">
        <h3 className="font-semibold">📱 E-Wallet</h3>
        {ewallets.map((w, idx) => (
          <div key={w.id || idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">{w.type}</p>
              <p className="text-sm text-muted-foreground">{w.phone} a.n. {w.account_name}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => w.id && onRemoveEWallet(w.id)}>Hapus</Button>
          </div>
        ))}
        {showWalletForm ? (
          <div className="p-4 border rounded-xl space-y-3">
            <select className="w-full border rounded-lg p-2 text-sm" value={walletForm.type} onChange={(e) => setWalletForm({ ...walletForm, type: e.target.value })}>
              <option>GoPay</option><option>OVO</option><option>Dana</option><option>ShopeePay</option><option>LinkAja</option>
            </select>
            <Input placeholder="Nomor HP" value={walletForm.phone} onChange={(e) => setWalletForm({ ...walletForm, phone: e.target.value })} />
            <Input placeholder="Nama Akun" value={walletForm.account_name} onChange={(e) => setWalletForm({ ...walletForm, account_name: e.target.value })} />
            <div className="flex gap-2">
              <Button onClick={() => {
                if (!walletForm.phone || !walletForm.account_name) { toast.error('Nomor dan nama wajib'); return; }
                onAddEWallet({ ...walletForm, id: crypto.randomUUID() });
                setWalletForm({ type: 'GoPay', phone: '', account_name: '' });
                setShowWalletForm(false);
              }}>Tambah</Button>
              <Button variant="outline" onClick={() => setShowWalletForm(false)}>Batal</Button>
            </div>
          </div>
        ) : (
          <Button variant="outline" onClick={() => setShowWalletForm(true)}>+ Tambah E-Wallet</Button>
        )}
      </div>
    </div>
  );
}

// ─── RSVP Step ───
function RSVPStep({ settings, isPublished, onUpdate, onPublish }: {
  settings: any; isPublished: boolean;
  onUpdate: (s: any) => void; onPublish: () => void;
}) {
  const s = settings || { deadline: '', max_guests: 2, custom_message: '' };
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Pesan RSVP</Label>
        <Input value={s.custom_message || ''} onChange={(e) => onUpdate({ custom_message: e.target.value })} placeholder="Mohon konfirmasi kehadiran Anda" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Batas Konfirmasi</Label>
          <Input type="date" value={s.deadline || ''} onChange={(e) => onUpdate({ deadline: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label>Maks Tamu per undangan</Label>
          <Input type="number" min={1} max={10} value={s.max_guests || 2} onChange={(e) => onUpdate({ max_guests: parseInt(e.target.value) || 2 })} />
        </div>
      </div>

      {isPublished ? (
        <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 flex items-center gap-2">
          <Check className="h-5 w-5" />
          Undangan sudah dipublikasikan
        </div>
      ) : (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-3">
          <p className="text-amber-800 font-medium">Pastikan semua informasi sudah benar sebelum mempublikasikan.</p>
          <Button onClick={onPublish}><PartyPopper className="h-4 w-4 mr-2" /> Publikasikan Sekarang</Button>
        </div>
      )}
    </div>
  );
}
