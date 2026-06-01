import { Users, MailOpen, Clock, Heart, ArrowUpRight, Copy } from "lucide-react";
import { Link } from "react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export default function Dashboard() {
  const stats = [
    { label: "Total Undangan", value: "350", icon: Users, color: "text-blue-600", bg: "bg-blue-100" },
    { label: "Hadir (RSVP)", value: "215", icon: Heart, color: "text-emerald-600", bg: "bg-emerald-100" },
    { label: "Dibuka", value: "280", icon: MailOpen, color: "text-amber-600", bg: "bg-amber-100" },
    { label: "Menunggu", value: "135", icon: Clock, color: "text-purple-600", bg: "bg-purple-100" },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Halo, Rizky & Andin! 👋</h1>
          <p className="text-gray-500 text-sm mt-1">Pernikahan Anda tinggal 45 hari lagi.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-white border border-gray-200 rounded-lg p-1.5 shadow-sm text-sm">
            <span className="px-3 text-gray-500 truncate max-w-[150px] sm:max-w-xs">weddingku.com/rizky-andin</span>
            <button className="p-1.5 hover:bg-gray-100 rounded text-gray-600">
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Template */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-200 flex justify-between items-center">
              <h2 className="font-semibold text-gray-900">Tema Saat Ini</h2>
              <Link to="/dashboard/templates" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1">
                Ganti Tema <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="p-5 flex flex-col sm:flex-row gap-6 items-start">
              <div className="w-full sm:w-48 h-32 rounded-lg overflow-hidden border border-gray-200 shrink-0">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1732649124686-3bab54f79aa3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwaW52aXRhdGlvbiUyMG1vZGVybnxlbnwxfHx8fDE3ODAzMDA2NjF8MA&ixlib=rb-4.1.0&q=80&w=1080" 
                  alt="Modern Minimalist" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Modern Minimalist - Emerald</h3>
                <p className="text-sm text-gray-500 mt-1 mb-4">Template dengan desain bersih, elegan, dengan sentuhan warna hijau zamrud.</p>
                <div className="flex gap-3">
                  <Link to="/dashboard/settings" className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors">
                    Edit Konten
                  </Link>
                  <Link to="/preview/javanese-heritage" className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors">
                    Preview
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Tasks */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-5 border-b border-gray-200">
              <h2 className="font-semibold text-gray-900">Tugas Checklist</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {[
                { task: "Lengkapi data mempelai", done: true },
                { task: "Tambahkan foto prewedding (Galeri)", done: true },
                { task: "Atur lokasi & jadwal acara", done: true },
                { task: "Import daftar tamu", done: false },
                { task: "Kirim undangan batch 1", done: false },
              ].map((item, idx) => (
                <div key={idx} className="p-4 flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    defaultChecked={item.done}
                    className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className={`text-sm ${item.done ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                    {item.task}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-6">
          {/* Recent RSVP */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-5 border-b border-gray-200 flex justify-between items-center">
              <h2 className="font-semibold text-gray-900">RSVP Terbaru</h2>
              <Link to="/dashboard/guests" className="text-sm text-emerald-600 hover:text-emerald-700">Lihat Semua</Link>
            </div>
            <div className="p-5 space-y-4">
              {[
                { name: "Budi Santoso", status: "Hadir", time: "2 jam lalu", pax: 2 },
                { name: "Sarah & Partner", status: "Hadir", time: "5 jam lalu", pax: 2 },
                { name: "Keluarga Pak RT", status: "Maaf Tidak Hadir", time: "1 hari lalu", pax: 0 },
                { name: "Dimas Anggara", status: "Hadir", time: "1 hari lalu", pax: 1 },
              ].map((rsvp, idx) => (
                <div key={idx} className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{rsvp.name}</p>
                    <p className={`text-xs mt-0.5 ${rsvp.status === 'Hadir' ? 'text-emerald-600' : 'text-red-500'}`}>
                      {rsvp.status} {rsvp.pax > 0 && `(${rsvp.pax} Pax)`}
                    </p>
                  </div>
                  <span className="text-xs text-gray-400">{rsvp.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-xl shadow-sm p-6 text-white">
            <h3 className="font-semibold text-lg mb-2">Sebar Undangan?</h3>
            <p className="text-sm text-emerald-100 mb-4">Gunakan fitur blast WhatsApp untuk mengirim ke semua tamu sekaligus.</p>
            <button className="w-full bg-white text-emerald-700 font-medium py-2 rounded-lg text-sm hover:bg-emerald-50 transition-colors">
              Mulai Blast WA
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}