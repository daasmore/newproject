'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Users, CheckCircle, XCircle, Clock, Plus, Download } from 'lucide-react';
import api from '@/lib/api';
import { toast } from 'sonner';

interface Stats {
  tamu: { total: number; hadir: number; tidakHadir: number; pending: number };
  wedding: { id: string; slug: string; isPublished: boolean };
}

async function fetchStats(): Promise<Stats> {
  const [statsRes, weddingRes] = await Promise.all([
    api.get('/invitations/dashboard/stats'),
    api.get('/invitations'),
  ]);
  const weddingList = weddingRes.data.data;
  const wedding = Array.isArray(weddingList) ? weddingList[0] : weddingList;
  return {
    tamu: statsRes.data.data,
    wedding: wedding || { slug: '', isPublished: false },
  };
}

const statCards = [
  { label: 'Total Tamu', icon: Users, color: 'text-blue-600 bg-blue-50' },
  { label: 'Hadir', icon: CheckCircle, color: 'text-green-600 bg-green-50' },
  { label: 'Tidak Hadir', icon: XCircle, color: 'text-red-600 bg-red-50' },
  { label: 'Pending', icon: Clock, color: 'text-amber-600 bg-amber-50' },
];

export default function DashboardPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: fetchStats,
    staleTime: 60000,
  });

  const handleExportCSV = async () => {
    try {
      const weddingId = data?.wedding?.id;
      if (!weddingId) { toast.error('ID undangan tidak ditemukan'); return; }
      const { data: csvData } = await api.get(`/invitations/${weddingId}/guests/export`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([csvData]));
      const a = document.createElement('a');
      a.href = url;
      a.download = 'daftar-tamu.csv';
      a.click();
      window.URL.revokeObjectURL(url);
      toast.success('CSV berhasil diunduh');
    } catch {
      toast.error('Gagal mengunduh CSV');
    }
  };

  const stats = data?.tamu;
  const values = [stats?.total ?? 0, stats?.hadir ?? 0, stats?.tidakHadir ?? 0, stats?.pending ?? 0];

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Selamat datang kembali! Berikut ringkasan undangan Anda.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/builder">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Edit Undangan
            </Button>
          </Link>
          <Button variant="outline" onClick={handleExportCSV}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, i) => (
          <Card key={card.label}>
            <CardContent className="p-5 flex items-center gap-4">
              <div className={`p-3 rounded-xl ${card.color}`}>
                <card.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{card.label}</p>
                {isLoading ? <Skeleton className="h-6 w-12 mt-1" /> : <p className="text-2xl font-bold">{values[i]}</p>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader><CardTitle className="text-lg">Tambah Tamu</CardTitle></CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Link href="/tamu"><Button className="w-full"><Plus className="h-4 w-4 mr-2" />Kelola Tamu</Button></Link>
            <p className="text-sm text-muted-foreground">Import CSV, tambah manual, atau kirim undangan via WhatsApp</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-lg">Status Undangan</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {data?.wedding?.isPublished ? (
              <div className="flex items-center gap-2 text-green-600"><CheckCircle className="h-5 w-5" /><span>Undangan sudah dipublikasikan</span></div>
            ) : (
              <div className="flex items-center gap-2 text-amber-600"><Clock className="h-5 w-5" /><span>Undangan belum dipublikasikan</span></div>
            )}
            <Link href="/builder"><Button variant="outline" className="w-full">Edit Undangan</Button></Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
