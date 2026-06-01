import { useState } from "react";
import { Plus, Upload, Download, Search, MoreHorizontal, CheckCircle2, XCircle, Clock } from "lucide-react";

const INITIAL_GUESTS = [
  { id: 1, name: "Budi Santoso", phone: "081234567890", category: "Keluarga", status: "Hadir", pax: 2, sent: true },
  { id: 2, name: "Sarah Amanda", phone: "089876543210", category: "Teman SMA", status: "Menunggu", pax: 0, sent: true },
  { id: 3, name: "Keluarga Pak RT", phone: "081112223334", category: "VIP", status: "Tidak Hadir", pax: 0, sent: true },
  { id: 4, name: "Dimas Anggara", phone: "085556667778", category: "Rekan Kerja", status: "Hadir", pax: 1, sent: true },
  { id: 5, name: "Rina Nose", phone: "087778889990", category: "Teman Kuliah", status: "Menunggu", pax: 0, sent: false },
];

export default function Guests() {
  const [guests] = useState(INITIAL_GUESTS);

  const StatusIcon = ({ status }: { status: string }) => {
    switch(status) {
      case "Hadir": return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case "Tidak Hadir": return <XCircle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-amber-500" />;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Daftar Tamu</h1>
          <p className="text-gray-500 text-sm mt-1">Kelola dan pantau konfirmasi kehadiran tamu undangan Anda.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
            <Upload className="w-4 h-4" /> Import Excel
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors">
            <Plus className="w-4 h-4" /> Tambah Tamu
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Cari nama tamu..." 
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 w-full sm:w-64"
            />
          </div>
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white">
            <option>Semua Kategori</option>
            <option>Keluarga</option>
            <option>VIP</option>
            <option>Teman</option>
          </select>
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
          <Download className="w-4 h-4" /> Export Data
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 w-10">
                  <input type="checkbox" className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                </th>
                <th className="px-6 py-4">Nama Tamu</th>
                <th className="px-6 py-4">No. WhatsApp</th>
                <th className="px-6 py-4">Kategori</th>
                <th className="px-6 py-4">Status RSVP</th>
                <th className="px-6 py-4">Pax</th>
                <th className="px-6 py-4">Status Undangan</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {guests.map((guest) => (
                <tr key={guest.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input type="checkbox" className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">{guest.name}</td>
                  <td className="px-6 py-4 text-gray-500">{guest.phone}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium">
                      {guest.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <StatusIcon status={guest.status} />
                      <span className={`font-medium ${
                        guest.status === 'Hadir' ? 'text-emerald-700' : 
                        guest.status === 'Tidak Hadir' ? 'text-red-700' : 'text-amber-700'
                      }`}>
                        {guest.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{guest.pax > 0 ? guest.pax : '-'}</td>
                  <td className="px-6 py-4">
                    {guest.sent ? (
                      <span className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded-md text-xs font-medium flex items-center gap-1 w-max">
                        <CheckCircle2 className="w-3 h-3" /> Terkirim
                      </span>
                    ) : (
                      <button className="px-3 py-1 bg-emerald-600 text-white rounded-md text-xs font-medium hover:bg-emerald-700 transition-colors">
                        Kirim WA
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1 text-gray-400 hover:text-gray-700 rounded">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-gray-200 flex items-center justify-between text-sm text-gray-500">
          <p>Menampilkan 1-5 dari 350 tamu</p>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50">Prev</button>
            <button className="px-3 py-1 bg-emerald-50 text-emerald-600 font-medium rounded">1</button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">2</button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">3</button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}