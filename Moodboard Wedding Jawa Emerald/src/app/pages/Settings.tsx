import { Save, Music, Image as ImageIcon } from "lucide-react";

export default function Settings() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 pb-24">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Pengaturan Undangan</h1>
        <p className="text-gray-500 text-sm mt-1">Lengkapi informasi detail pernikahan Anda.</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto scrollbar-hide">
          {['Detail Mempelai', 'Waktu & Lokasi', 'Musik & Galeri', 'Pengaturan Lainnya'].map((tab, idx) => (
            <button
              key={idx}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors
                ${idx === 0 
                  ? 'border-emerald-500 text-emerald-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Form Area (Detail Mempelai) */}
      <div className="space-y-8">
        {/* Groom Section */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <h2 className="text-lg font-medium text-gray-900 border-b border-gray-100 pb-2">Mempelai Pria</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
              <input type="text" defaultValue="Rizky Febian" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500" />
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700">Nama Panggilan</label>
              <input type="text" defaultValue="Rizky" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500" />
            </div>
            <div className="md:col-span-2 space-y-1.5">
              <label className="block text-sm font-medium text-gray-700">Nama Orang Tua</label>
              <input type="text" defaultValue="Putra dari Bpk. Santoso & Ibu Ratna" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500" />
            </div>
            <div className="md:col-span-2 space-y-1.5">
              <label className="block text-sm font-medium text-gray-700">Link Instagram (Opsional)</label>
              <input type="text" placeholder="https://instagram.com/rizky" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500" />
            </div>
          </div>
        </div>

        {/* Bride Section */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <h2 className="text-lg font-medium text-gray-900 border-b border-gray-100 pb-2">Mempelai Wanita</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
              <input type="text" defaultValue="Andin Kharisma" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500" />
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700">Nama Panggilan</label>
              <input type="text" defaultValue="Andin" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500" />
            </div>
            <div className="md:col-span-2 space-y-1.5">
              <label className="block text-sm font-medium text-gray-700">Nama Orang Tua</label>
              <input type="text" defaultValue="Putri dari Bpk. Surya & Ibu Sarah" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500" />
            </div>
            <div className="md:col-span-2 space-y-1.5">
              <label className="block text-sm font-medium text-gray-700">Link Instagram (Opsional)</label>
              <input type="text" placeholder="https://instagram.com/andin" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500" />
            </div>
          </div>
        </div>

        {/* Link / URL */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <h2 className="text-lg font-medium text-gray-900 border-b border-gray-100 pb-2">URL Undangan</h2>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">Link Custom</label>
            <div className="flex rounded-lg shadow-sm">
              <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                weddingku.com/
              </span>
              <input type="text" defaultValue="rizky-andin" className="flex-1 block w-full px-3 py-2 rounded-none rounded-r-lg border border-gray-300 focus:ring-emerald-500 focus:border-emerald-500" />
            </div>
            <p className="text-xs text-gray-500 mt-1">Ini adalah link yang akan Anda bagikan ke tamu undangan.</p>
          </div>
        </div>

      </div>

      {/* Floating Save Bar */}
      <div className="fixed bottom-0 left-0 lg:left-64 right-0 p-4 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-20 flex justify-end gap-3">
        <button className="px-6 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors">
          Batal
        </button>
        <button className="px-6 py-2.5 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2">
          <Save className="w-4 h-4" /> Simpan Perubahan
        </button>
      </div>
    </div>
  );
}