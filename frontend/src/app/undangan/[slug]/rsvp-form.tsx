'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import publicApi from '@/lib/api';

interface RSVPFormProps {
  maxGuests: number;
}

export default function RSVPForm({ maxGuests }: RSVPFormProps) {
  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState<'hadir' | 'tidak_hadir'>('hadir');
  const [guestCount, setGuestCount] = useState('1');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error('Nama wajib diisi');
      return;
    }
    setSubmitting(true);
    try {
      await publicApi.post('/rsvp', {
        name,
        attendance,
        total_guests: parseInt(guestCount),
        message,
      });
      setSubmitted(true);
      toast.success('Terima kasih! Konfirmasi Anda telah diterima.');
    } catch {
      toast.error('Gagal mengirim konfirmasi');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-6">
        <div className="text-4xl mb-3">🎉</div>
        <h4 className="text-lg font-semibold text-green-700">Terima Kasih!</h4>
        <p className="text-sm text-muted-foreground mt-1">Konfirmasi Anda telah berhasil dikirim.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      <div className="space-y-2">
        <Label htmlFor="rsvp-name">Nama Lengkap</Label>
        <Input
          id="rsvp-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Masukkan nama Anda"
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Konfirmasi Kehadiran</Label>
        <RadioGroup value={attendance} onValueChange={(v) => setAttendance(v as 'hadir' | 'tidak_hadir')}>
          <div className="flex items-center space-x-3 p-3 rounded-lg border border-green-200 bg-green-50">
            <RadioGroupItem value="hadir" id="hadir" />
            <Label htmlFor="hadir" className="cursor-pointer">Hadir ✅</Label>
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-lg border border-red-200 bg-red-50">
            <RadioGroupItem value="tidak_hadir" id="tidak_hadir" />
            <Label htmlFor="tidak_hadir" className="cursor-pointer">Tidak Hadir 😔</Label>
          </div>
        </RadioGroup>
      </div>

      {attendance === 'hadir' && (
        <div className="space-y-2">
          <Label htmlFor="guest-count">Jumlah Tamu (max {maxGuests})</Label>
          <Input
            id="guest-count"
            type="number"
            min="1"
            max={maxGuests}
            value={guestCount}
            onChange={(e) => setGuestCount(e.target.value)}
          />
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="rsvp-message">Ucapan / Pesan</Label>
        <Textarea
          id="rsvp-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tulis ucapan atau pesan..."
          rows={3}
        />
      </div>

      <Button type="submit" className="w-full" disabled={submitting}>
        {submitting ? 'Mengirim...' : 'Kirim Konfirmasi'}
      </Button>
    </form>
  );
}
