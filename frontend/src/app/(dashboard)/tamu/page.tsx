'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Users, Search, Download, Upload, Trash2, Plus, CheckCircle, XCircle, Clock, Send } from 'lucide-react';
import api from '@/lib/api';
import { toast } from 'sonner';
import type { Tamu } from '@/types';

const statusColors: Record<string, string> = {
  hadir: 'bg-green-100 text-green-800',
  tidak_hadir: 'bg-red-100 text-red-800',
  pending: 'bg-amber-100 text-amber-800',
};

const statusLabels: Record<string, string> = {
  hadir: 'Hadir',
  tidak_hadir: 'Tidak Hadir',
  pending: 'Pending',
};

// Get invitation ID from API
async function getInvitationId(): Promise<string> {
  const { data } = await api.get('/invitations');
  const list = data.data;
  const invitation = Array.isArray(list) ? list[0] : list;
  return invitation?.id || '';
}

async function fetchTamu(params: { search: string; status: string; invitationId: string }): Promise<{ data: Tamu[]; total: number }> {
  const { data } = await api.get(`/invitations/${params.invitationId}/guests`, {
    params: { search: params.search, status: params.status === 'all' ? '' : params.status },
  });
  return data.data;
}

export default function TamuPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTamu, setNewTamu] = useState({ name: '', phone: '', group: '' });
  const [invitationId, setInvitationId] = useState('');

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['tamu', search, statusFilter],
    queryFn: async () => {
      const id = invitationId || await getInvitationId();
      if (!id) return { data: [], total: 0 };
      if (!invitationId) setInvitationId(id);
      return fetchTamu({ search, status: statusFilter, invitationId: id });
    },
    staleTime: 30000,
  });

  const handleAddTamu = async () => {
    if (!newTamu.name.trim()) { toast.error('Nama tamu wajib diisi'); return; }
    if (!invitationId) { toast.error('ID undangan tidak ditemukan'); return; }
    try {
      await api.post(`/invitations/${invitationId}/guests`, {
        name: newTamu.name,
        phone: newTamu.phone || undefined,
        group: newTamu.group || undefined,
      });
      toast.success('Tamu berhasil ditambahkan');
      setNewTamu({ name: '', phone: '', group: '' });
      setShowAddForm(false);
      refetch();
    } catch (err: unknown) {
      const msg = err && typeof err === 'object' && 'response' in err
        ? (err as { response?: { data?: { message?: string } } })?.response?.data?.message
        : 'Gagal menambahkan tamu';
      toast.error(msg || 'Gagal menambahkan tamu');
    }
  };

  const handleDeleteTamu = async (id: string) => {
    if (!confirm('Yakin ingin menghapus tamu ini?')) return;
    try {
      await api.delete(`/invitations/${invitationId}/guests/${id}`);
      toast.success('Tamu berhasil dihapus');
      refetch();
    } catch { toast.error('Gagal menambahkan tamu'); }
  };

  const handleImportCSV = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !invitationId) return;
    const formData = new FormData();
    formData.append('file', file);
    try {
      await api.post(`/invitations/${invitationId}/guests/import`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Import CSV berhasil');
      refetch();
    } catch { toast.error('Gagal import CSV'); }
  };

  const handleSendWA = async (tamu: Tamu) => {
    toast.info('Fitur WhatsApp Blast akan aktif di Fase 2');
  };

  const copyLink = (token: string) => {
    const url = `${window.location.origin}/undangan/rsvp/${token}`;
    navigator.clipboard.writeText(url);
    toast.success('Link undangan disalin');
  };

  const filtered = data?.data ?? [];
  const totalTamu = data?.total ?? 0;
  const countHadir = filtered.filter((t) => t.status === 'hadir').length;
  const countTidak = filtered.filter((t) => t.status === 'tidak_hadir').length;
  const countPending = filtered.filter((t) => t.status === 'pending').length;

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2"><Users className="h-6 w-6" />Manajemen Tamu</h1>
          <p className="text-muted-foreground">Kelola daftar tamu undangan pernikahan Anda</p>
        </div>
        <div className="flex gap-2">
          <label className="inline-flex">
            <Button variant="outline" asChild>
              <span className="cursor-pointer gap-2">
                <Upload className="h-4 w-4" />Import CSV
                <input type="file" accept=".csv" className="hidden" onChange={handleImportCSV} />
              </span>
            </Button>
          </label>
          <Button onClick={() => setShowAddForm(!showAddForm)}>
            <Plus className="h-4 w-4 mr-2" />Tambah Tamu
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Tamu', value: totalTamu, icon: Users, color: 'text-blue-600 bg-blue-50' },
          { label: 'Hadir', value: countHadir, icon: CheckCircle, color: 'text-green-600 bg-green-50' },
          { label: 'Tidak Hadir', value: countTidak, icon: XCircle, color: 'text-red-600 bg-red-50' },
          { label: 'Pending', value: countPending, icon: Clock, color: 'text-amber-600 bg-amber-50' },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`p-2 rounded-lg ${stat.color}`}><stat.icon className="h-5 w-5" /></div>
              <div><p className="text-xs text-muted-foreground">{stat.label}</p><p className="text-xl font-bold">{stat.value}</p></div>
            </CardContent>
          </Card>
        ))}
      </div>

      {showAddForm && (
        <Card>
          <CardHeader><CardTitle className="text-lg">Tambah Tamu Baru</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input placeholder="Nama Tamu *" value={newTamu.name} onChange={(e) => setNewTamu({ ...newTamu, name: e.target.value })} />
              <Input placeholder="No. WhatsApp" value={newTamu.phone} onChange={(e) => setNewTamu({ ...newTamu, phone: e.target.value })} />
              <Input placeholder="Kelompok/Grup" value={newTamu.group} onChange={(e) => setNewTamu({ ...newTamu, group: e.target.value })} />
            </div>
            <div className="flex gap-2 mt-4">
              <Button onClick={handleAddTamu}>Simpan</Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>Batal</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder="Cari nama tamu..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-2">
          {['all', 'pending', 'hadir', 'tidak_hadir'].map((s) => (
            <Button key={s} variant={statusFilter === s ? 'default' : 'outline'} size="sm" onClick={() => setStatusFilter(s)}>
              {s === 'all' ? 'Semua' : statusLabels[s]}
            </Button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <Card><CardContent className="p-6 space-y-3">{[...Array(5)].map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}</CardContent></Card>
      ) : filtered.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-muted-foreground">Belum ada data tamu</p>
            <Button className="mt-4" onClick={() => setShowAddForm(true)}><Plus className="h-4 w-4 mr-2" />Tambah Tamu Pertama</Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-muted-foreground border-b">
                  <th className="p-4 font-medium">Nama</th>
                  <th className="p-4 font-medium hidden sm:table-cell">No. WA</th>
                  <th className="p-4 font-medium hidden md:table-cell">Grup</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((tamu) => (
                  <tr key={tamu.id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="p-4 font-medium">{tamu.name}</td>
                    <td className="p-4 text-sm hidden sm:table-cell">{tamu.phone || '-'}</td>
                    <td className="p-4 text-sm hidden md:table-cell">{tamu.group || '-'}</td>
                    <td className="p-4">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${statusColors[tamu.status] || statusColors.pending}`}>
                        {statusLabels[tamu.status] || tamu.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" onClick={() => copyLink(tamu.link_token)} title="Salin Link"><Download className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="sm" onClick={() => handleSendWA(tamu)} title="Kirim WA"><Send className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteTamu(tamu.id)} title="Hapus"><Trash2 className="h-4 w-4 text-red-500" /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
