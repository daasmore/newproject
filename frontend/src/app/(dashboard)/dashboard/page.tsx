'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { Skeleton } from '@/components/ui';
import { dashboardApi } from '@/lib/api';
import type { DashboardStats } from '@/types';

const defaultStats: DashboardStats = {
  total_guests: 0,
  attending: 0,
  not_attending: 0,
  pending: 0,
  recent_rsvps: [],
};

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>(defaultStats);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const invRes = await dashboardApi.getStats('default');
        setStats(invRes.data);
      } catch {
        setStats(defaultStats);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { label: 'Total Tamu', value: stats.total_guests, icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="8" cy="6" r="3.5" stroke="#d4a574" strokeWidth="1.2"/><path d="M1 18c0-3.866 3.582-7 8-7s8 3.134 8 7" stroke="#d4a574" strokeWidth="1.2"/><path d="M15.5 5a3 3 0 100-6M19 18v-1.2C19 14.1 17.2 12 15 12" stroke="#d4a574" strokeWidth="1.2"/></svg>
    ), color: 'amber' as const },
    { label: 'Hadir', value: stats.attending, icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 11l4 4L16 7" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
    ), color: 'green' as const },
    { label: 'Tidak Hadir', value: stats.not_attending, icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M6 6l8 8M14 6l-8 8" stroke="#f87171" strokeWidth="1.5" strokeLinecap="round"/></svg>
    ), color: 'red' as const },
    { label: 'Menunggu', value: stats.pending, icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7" stroke="#fbbf24" strokeWidth="1.2"/><path d="M10 5.5V10l3.5 2" stroke="#fbbf24" strokeWidth="1.2" strokeLinecap="round"/></svg>
    ), color: 'yellow' as const },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold font-[Playfair_Display] text-white/90">Dashboard</h2>
        <p className="text-sm text-white/25 font-[Inter] mt-1">Ringkasan undangan dan kehadiran tamu Anda</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, i) => (
          <motion.div key={card.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            {loading ? <Skeleton className="h-28 w-full" /> : <StatsCard icon={card.icon} label={card.label} value={card.value} color={card.color} />}
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <div>
        <h3 className="text-lg font-semibold font-[Playfair_Display] text-white/80 mb-4">Aktivitas Terbaru</h3>
        <div className="glass-card rounded-2xl overflow-hidden">
          {loading ? (
            <div className="p-6 space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : stats.recent_rsvps.length > 0 ? (
            <div className="divide-y divide-white/4">
              {stats.recent_rsvps.map((rsvp, i) => (
                <div key={i} className="flex items-center justify-between px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-amber-500/10 border border-amber-500/10 flex items-center justify-center">
                      <span className="text-xs font-bold text-amber-400">{rsvp.name.charAt(0).toUpperCase()}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white/70 font-[Inter]">{rsvp.name}</p>
                      <p className="text-[11px] text-white/25 font-[Inter]">RSVP baru</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full font-[Inter] ${
                      rsvp.status === 'attending' ? 'bg-emerald-500/10 text-emerald-400' :
                      rsvp.status === 'not_attending' ? 'bg-red-500/10 text-red-400' :
                      'bg-amber-500/10 text-amber-400'
                    }`}>
                      {rsvp.status === 'attending' ? 'Hadir' : rsvp.status === 'not_attending' ? 'Tidak Hadir' : 'Menunggu'}
                    </span>
                    <p className="text-[10px] text-white/15 font-[Inter] mt-1">{new Date(rsvp.created_at).toLocaleDateString('id-ID')}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <div className="w-16 h-16 rounded-2xl bg-white/3 border border-white/5 flex items-center justify-center mx-auto mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 4h16v16H4zM4 9h16M9 4v16" stroke="white" strokeWidth="1" opacity="0.15"/></svg>
              </div>
              <p className="text-sm text-white/25 font-[Inter]">Belum ada aktivitas RSVP</p>
              <p className="text-xs text-white/15 font-[Inter] mt-1">Bagikan undangan Anda untuk mulai menerima konfirmasi tamu</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
