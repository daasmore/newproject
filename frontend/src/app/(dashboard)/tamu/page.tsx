'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Input, Button, Badge, Skeleton, Modal } from '@/components/ui';
import GuestTable from '@/components/dashboard/GuestTable';

import { guestsApi } from '@/lib/api';
import type { Guest } from '@/types';

export default function TamuPage() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [filteredGuests, setFilteredGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showCsvModal, setShowCsvModal] = useState(false);

  const fetchGuests = useCallback(async () => {
    setLoading(true);
    try {
      const res = await guestsApi.getByInvitation('default', { search: undefined, status: undefined });
      setGuests(res.data.data ?? []);
      setFilteredGuests(res.data.data ?? []);
    } catch {
      setGuests([]);
      setFilteredGuests([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGuests();
  }, [fetchGuests]);

  useEffect(() => {
    let result = guests;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (g) => g.name.toLowerCase().includes(q) || (g.phone?.includes(q) ?? false) || (g.email?.toLowerCase().includes(q) ?? false)
      );
    }
    if (filterStatus !== 'all') {
      result = result.filter((g) => g.rsvp_status === filterStatus);
    }
    setFilteredGuests(result);
  }, [search, filterStatus, guests]);

  const stats = {
    total: guests.length,
    attending: guests.filter((g) => g.rsvp_status === 'attending').length,
    notAttending: guests.filter((g) => g.rsvp_status === 'not_attending').length,
    pending: guests.filter((g) => g.rsvp_status === 'pending').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold font-[Playfair_Display] text-white/90">Daftar Tamu</h2>
          <p className="text-sm text-white/25 font-[Inter] mt-1">Kelola daftar tamu undangan Anda</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm" onClick={() => setShowCsvModal(true)}>
            Import CSV
          </Button>
          <Button variant="primary" size="sm" onClick={() => {
            const headers = ['Nama', 'Grup', 'No HP', 'Email', 'Status', 'Jumlah Tamu'];
            const rows = guests.map((g) => [g.name, g.group ?? '', g.phone ?? '', g.email ?? '', g.rsvp_status, String(g.guest_count)]);
            const { downloadCSV } = require('@/lib/utils');
            downloadCSV(headers, rows, 'daftar-tamu.csv');
          }}>
            Export CSV
          </Button>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Total', value: stats.total, color: 'text-white/60' },
          { label: 'Hadir', value: stats.attending, color: 'text-emerald-400' },
          { label: 'Tidak', value: stats.notAttending, color: 'text-red-400' },
          { label: 'Menunggu', value: stats.pending, color: 'text-amber-400' },
        ].map((s) => (
          <div key={s.label} className="glass-card rounded-xl p-4 text-center">
            <p className={`text-xl font-bold font-[Playfair_Display] ${s.color}`}>{s.value}</p>
            <p className="text-[10px] text-white/20 font-[Inter] mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1">
          <input
            placeholder="Cari nama tamu..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl input-dark font-[Inter] text-sm"
          />
        </div>
        <div className="flex gap-2">
          {[
            { value: 'all', label: 'Semua' },
            { value: 'attending', label: 'Hadir' },
            { value: 'not_attending', label: 'Tidak Hadir' },
            { value: 'pending', label: 'Menunggu' },
          ].map((f) => (
            <button
              key={f.value}
              onClick={() => setFilterStatus(f.value)}
              className={`px-4 py-2.5 rounded-xl text-xs font-medium font-[Inter] transition-all ${
                filterStatus === f.value
                  ? 'btn-primary text-black'
                  : 'btn-secondary text-white/40'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-14 w-full" />)}
          </div>
        ) : (
          <GuestTable guests={filteredGuests} />
        )}
      </motion.div>

      {/* CSV Import Modal */}
      <Modal open={showCsvModal} onClose={() => setShowCsvModal(false)} title="Import CSV">
        <p className="text-white/30 text-sm font-[Inter]">Drag & drop file CSV atau klik untuk memilih</p>
        <button onClick={() => setShowCsvModal(false)} className="btn-secondary px-4 py-2 rounded-lg text-sm mt-4">Tutup</button>
      </Modal>
    </div>
  );
}
