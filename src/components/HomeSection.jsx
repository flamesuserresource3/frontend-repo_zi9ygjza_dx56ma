import React, { useMemo } from 'react';
import { Rocket, Activity, Newspaper, Download as DownloadIcon } from 'lucide-react';

export default function HomeSection({ onGoRegister }) {
  const onlinePlayers = useMemo(() => Math.floor(Math.random() * 150) + 5, []);
  const news = [
    { id: 1, title: 'Grand Opening Aetheria Online', date: '1 Nov 2025', excerpt: 'Mulai petualanganmu dengan banyak event menarik dan hadiah premium!'},
    { id: 2, title: 'Patch v1.1 – Balancing & Konten Baru', date: '3 Nov 2025', excerpt: 'Penyesuaian class dan dungeon baru menantimu di Abyssal Rift.'},
    { id: 3, title: 'Event Weekend x2 EXP & Drop', date: '5 Nov 2025', excerpt: 'Nikmati EXP dan drop rate ganda sepanjang akhir pekan.'},
    { id: 4, title: 'Maintenance Selesai', date: '6 Nov 2025', excerpt: 'Server kembali online. Terima kasih atas kesabarannya!'},
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid lg:grid-cols-3 gap-6 items-stretch">
        <div className="lg:col-span-2 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_10%_10%,rgba(99,102,241,0.15),transparent_40%),radial-gradient(circle_at_90%_20%,rgba(217,70,239,0.12),transparent_40%)]" />
          <div className="relative">
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Selamat Datang di Aetheria Online
            </h1>
            <p className="mt-3 text-gray-300 max-w-2xl">
              Dunia fantasi penuh pertarungan epik, komunitas hangat, dan progres yang memuaskan. Bergabunglah sekarang!
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button onClick={onGoRegister} className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500">
                <Rocket size={18} /> Daftar Sekarang
              </button>
              <a href="#download" className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-gray-800 text-gray-100 hover:bg-gray-700">
                <DownloadIcon size={18} /> Download Client
              </a>
            </div>
          </div>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Status Server</p>
              <p className="text-xl font-semibold text-green-400">ONLINE</p>
            </div>
            <Activity className="text-green-400" />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-4">
              <p className="text-xs text-gray-400">Pemain Online</p>
              <p className="text-2xl font-bold text-white">{onlinePlayers}</p>
            </div>
            <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-4">
              <p className="text-xs text-gray-400">Versi</p>
              <p className="text-2xl font-bold text-white">v1.1</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <div className="flex items-center gap-2 text-white">
          <Newspaper size={18} />
          <h2 className="text-xl font-semibold">Berita & Pengumuman</h2>
        </div>
        <div className="mt-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {news.map((n) => (
            <article key={n.id} className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition">
              <p className="text-xs text-gray-400">{n.date}</p>
              <h3 className="mt-1 text-white font-medium">{n.title}</h3>
              <p className="mt-1 text-gray-300 text-sm">{n.excerpt}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
