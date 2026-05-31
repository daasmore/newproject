'use client';

import Badge from '@/components/ui/Badge';
import type { Guest } from '@/types';

interface GuestTableProps {
  guests: Guest[];
  loading?: boolean;
}

export default function GuestTable({ guests, loading }: GuestTableProps) {
  if (loading) {
    return (
      <div className="glass-card rounded-2xl overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="p-4 border-b border-white/[0.03] flex gap-4">
            <div className="skeleton h-4 flex-1 rounded" />
            <div className="skeleton h-4 w-20 rounded" />
            <div className="skeleton h-4 w-16 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (!guests.length) {
    return (
      <div className="glass-card rounded-2xl p-12 text-center">
        <div className="text-3xl mb-3">👥</div>
        <p className="text-white/30 font-[Inter] text-sm">Belum ada tamu</p>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl overflow-hidden overflow-x-auto">
      <table className="w-full text-sm font-[Inter]">
        <thead>
          <tr className="border-b border-white/5">
            <th className="text-left px-4 py-3 text-white/30 font-medium text-xs">Nama</th>
            <th className="text-left px-4 py-3 text-white/30 font-medium text-xs">Grup</th>
            <th className="text-left px-4 py-3 text-white/30 font-medium text-xs">Status</th>
            <th className="text-left px-4 py-3 text-white/30 font-medium text-xs">Jumlah</th>
            <th className="text-left px-4 py-3 text-white/30 font-medium text-xs">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {guests.map((g) => (
            <tr key={g.id} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
              <td className="px-4 py-3 text-white/70">{g.name}</td>
              <td className="px-4 py-3 text-white/40">{g.group || '—'}</td>
              <td className="px-4 py-3"><Badge status={g.rsvp_status} /></td>
              <td className="px-4 py-3 text-white/40">{g.guest_count || 1}</td>
              <td className="px-4 py-3">
                <button className="text-xs text-amber-400/60 hover:text-amber-400 font-[Inter]">Kirim WA</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
