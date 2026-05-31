'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Trash2, Save, Send } from 'lucide-react';
import api from '@/lib/api';
import { toast } from 'sonner';

interface WeddingData {
  id?: string;
  title: string;
  bride_name: string;
  groom_name: string;
  akad_date: string;
  akad_time: string;
  akad_location: string;
  resepsi_date: string;
  resepsi_time: string;
  resepsi_location: string;
  template: string;
}

const STEPS = [
  { id: 'template', label: 'Template' },
  { id: 'mempelai', label: 'Mempelai' },
  { id: 'acara', label: 'Acara' },
  { id: 'story', label: 'Story' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'gifts', label: 'Hadiah' },
  { id: 'rsvp', label: 'RSVP' },
  { id: 'publish', label: 'Publish' },
];

export default function BuilderPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [weddingData, setWeddingData] = useState<WeddingData>({
    title: '',
    bride_name: '',
    groom_name: '',
    akad_date: '',
    akad_time: '',
    akad_location: '',
    resepsi_date: '',
    resepsi_time: '',
    resepsi_location: '',
    template: 'classic',
  });
  const [loading, setLoading] = useState(false);

  const update = (field: string, value: string) => setWeddingData(prev => ({ ...prev, [field]: value }));

  const handleSave = async (publish = false) => {
    setLoading(true);
    try {
      if (weddingData.id) {
        await api.put(`/invitations/${weddingData.id}`, weddingData);
        if (publish) await api.put(`/invitations/${weddingData.id}/publish`, {});
      } else {
        const { data } = await api.post('/invitations', weddingData);
        setWeddingData(prev => ({ ...prev, id: data.data.id }));
        if (publish) await api.put(`/invitations/${data.data.id}/publish`, {});
      }
      toast.success(publish ? 'Undangan berhasil dipublikasikan!' : 'Draft berhasil disimpan');
    } catch (err: unknown) {
      const msg = err && typeof err === 'object' && 'response' in err
        ? (err as { response?: { data?: { message?: string } } })?.response?.data?.message
        : 'Gagal menyimpan';
      toast.error(msg || 'Gagal menyimpan');
    } finally {
      setLoading(false);
    }
  };

  const step = STEPS[currentStep];

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Builder Undangan</h1>
          <p className="text-muted-foreground">Buat dan edit undangan pernikahan digital Anda</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleSave(false)} disabled={loading}>
            <Save className="h-4 w-4 mr-2" />Simpan Draft
          </Button>
          <Button onClick={() => handleSave(true)} disabled={loading}>
            <Send className="h-4 w-4 mr-2" />Publish
          </Button>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex gap-1 overflow-x-auto pb-2">
        {STEPS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setCurrentStep(i)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              i === currentStep ? 'bg-primary text-primary-foreground' :
              i < currentStep ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'
            }`}
          >
            {i < currentStep ? '✓ ' : ''}{s.label}
          </button>
        ))}
      </div>

      <Card>
        <CardHeader><CardTitle>{step.label}</CardTitle></CardHeader>
        <CardContent>
          {step.id === 'template' && (
            <div className="grid grid-cols-3 gap-4">
              {[
                { id: 'classic', name: 'Classic Elegance', desc: 'Navy & Gold, serif fonts', icon: '👑' },
                { id: 'modern', name: 'Modern Minimal', desc: 'White & Black, clean layout', icon: '▪️' },
                { id: 'nusantara', name: 'Nusantara', desc: 'Warm batik, cultural ornaments', icon: '✦' },
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => update('template', t.id)}
                  className={`text-left p-4 rounded-xl border-2 transition-all ${
                    weddingData.template === t.id ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-2">{t.icon}</div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{t.desc}</p>
                  {weddingData.template === t.id && <Badge className="mt-2">Dipilih</Badge>}
                </button>
              ))}
            </div>
          )}

          {step.id === 'mempelai' && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-sm text-muted-foreground">👩 Mempelai Wanita</h3>
                <div><Label>Nama Lengkap</Label><Input value={weddingData.bride_name} onChange={e => update('bride_name', e.target.value)} /></div>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold text-sm text-muted-foreground">👨 Mempelai Pria</h3>
                <div><Label>Nama Lengkap</Label><Input value={weddingData.groom_name} onChange={e => update('groom_name', e.target.value)} /></div>
              </div>
              <div className="md:col-span-2"><Label>Judul Undangan</Label><Input value={weddingData.title} onChange={e => update('title', e.target.value)} placeholder="Pernikahan Ahmad & Siti" /></div>
            </div>
          )}

          {step.id === 'acara' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">💍 Akad Nikah</h3>
                <div className="grid md:grid-cols-3 gap-3">
                  <div><Label>Tanggal</Label><Input type="date" value={weddingData.akad_date} onChange={e => update('akad_date', e.target.value)} /></div>
                  <div><Label>Waktu</Label><Input type="time" value={weddingData.akad_time} onChange={e => update('akad_time', e.target.value)} /></div>
                  <div><Label>Lokasi</Label><Input value={weddingData.akad_location} onChange={e => update('akad_location', e.target.value)} /></div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-3">🎊 Resepsi</h3>
                <div className="grid md:grid-cols-3 gap-3">
                  <div><Label>Tanggal</Label><Input type="date" value={weddingData.resepsi_date} onChange={e => update('resepsi_date', e.target.value)} /></div>
                  <div><Label>Waktu</Label><Input type="time" value={weddingData.resepsi_time} onChange={e => update('resepsi_time', e.target.value)} /></div>
                  <div><Label>Lokasi</Label><Input value={weddingData.resepsi_location} onChange={e => update('resepsi_location', e.target.value)} /></div>
                </div>
              </div>
            </div>
          )}

          {step.id === 'story' && (
            <div className="text-center py-8 text-muted-foreground">
              <p>Fitur Love Story akan aktif di Fase 2</p>
            </div>
          )}
          {step.id === 'gallery' && (
            <div className="text-center py-8 text-muted-foreground">
              <p>Upload Gallery akan aktif di Fase 2 ( perlu MinIO/S3 )</p>
            </div>
          )}
          {step.id === 'gifts' && (
            <div className="text-center py-8 text-muted-foreground">
              <p>Fitur Hadiah Digital akan aktif di Fase 2</p>
            </div>
          )}
          {step.id === 'rsvp' && (
            <div className="text-center py-8 text-muted-foreground">
              <p>Pengaturan RSVP — deadline, welcome message</p>
              <p className="text-sm mt-2">Akan aktif di Fase 2</p>
            </div>
          )}
          {step.id === 'publish' && (
            <div className="space-y-4 text-center py-4">
              <div className="text-4xl mb-4">🎉</div>
              <h3 className="text-lg font-semibold">Siap Publish!</h3>
              <p className="text-muted-foreground">Klik tombol "Publish" di atas untuk mempublikasikan undangan Anda.</p>
              {weddingData.id && (
                <div className="p-3 bg-gray-50 rounded-lg text-sm">
                  <p className="font-medium">Preview URL:</p>
                  <code className="text-xs text-blue-600">/undangan/{weddingData.id}</code>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} disabled={currentStep === 0}>
          ← Sebelumnya
        </Button>
        <Button onClick={() => setCurrentStep(Math.min(STEPS.length - 1, currentStep + 1))} disabled={currentStep === STEPS.length - 1}>
          Selanjutnya →
        </Button>
      </div>
    </div>
  );
}
