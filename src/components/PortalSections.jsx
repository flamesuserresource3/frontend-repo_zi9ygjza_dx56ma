import React, { useMemo, useState } from 'react';
import { Copy, Check, Shield, History, Coins, ShoppingCart, Filter, X } from 'lucide-react';

function SectionCard({ title, children, right }) {
  return (
    <section className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold">{title}</h3>
        {right}
      </div>
      {children}
    </section>
  );
}

export default function PortalSections({
  activeView,
  user,
  onCopy,
  referralData,
  onChangePassword,
  onChangePin,
  characters,
  onUnstuck,
  history,
  donationPackages,
  onManualConfirm,
  items,
  onPurchase,
}) {
  const [historyTab, setHistoryTab] = useState('login');
  const [category, setCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredItems = useMemo(
    () => items.filter((i) => category === 'All' || i.category === category),
    [items, category]
  );

  if (activeView === 'ucp') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        <SectionCard
          title={`Selamat Datang, ${user.username}`}
          right={<span className="text-sm text-gray-300">Status Akun: <span className="text-green-400 font-medium">Aktif</span></span>}
        >
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-4">
              <p className="text-xs text-gray-400">Koin Donasi</p>
              <p className="text-3xl font-bold text-yellow-400">{user.coins}</p>
            </div>
            <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-4">
              <p className="text-xs text-gray-400">Level Akun</p>
              <p className="text-3xl font-bold text-white">Premium</p>
            </div>
            <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-4">
              <p className="text-xs text-gray-400">Referral Link</p>
              <div className="mt-1 flex items-center gap-2">
                <input readOnly value={referralData.link} className="flex-1 bg-gray-900 border border-gray-800 rounded-md px-3 py-2 text-gray-100" />
                <button onClick={() => onCopy(referralData.link)} className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-gray-800 text-gray-100 hover:bg-gray-700">
                  <Copy size={16} /> Salin
                </button>
              </div>
            </div>
          </div>
        </SectionCard>

        <div className="grid lg:grid-cols-2 gap-6">
          <SectionCard title="Ganti Password" right={<Shield size={18} className="text-gray-400" />}>
            <PasswordForm onSubmit={onChangePassword} />
          </SectionCard>
          <SectionCard title="Ganti PIN Keamanan" right={<Shield size={18} className="text-gray-400" />}>
            <PinForm onSubmit={onChangePin} />
          </SectionCard>
        </div>

        <SectionCard title="Manajemen Karakter">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-300">
                  <th className="py-2">Nama</th>
                  <th className="py-2">Level</th>
                  <th className="py-2">Job</th>
                  <th className="py-2">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {characters.map((c) => (
                  <tr key={c.name} className="border-t border-gray-800">
                    <td className="py-2 text-gray-100">{c.name}</td>
                    <td className="py-2 text-gray-100">{c.level}</td>
                    <td className="py-2 text-gray-100">{c.job}</td>
                    <td className="py-2">
                      <button onClick={() => onUnstuck(c.name)} className="px-3 py-1 rounded-md bg-gray-800 text-gray-100 hover:bg-gray-700">Reset Posisi</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        <SectionCard title="Riwayat">
          <div className="flex items-center gap-2 mb-4">
            {['login', 'donation', 'mall'].map((t) => (
              <button key={t} onClick={() => setHistoryTab(t)} className={`px-3 py-1 rounded-md text-sm ${historyTab === t ? 'bg-indigo-600 text-white' : 'bg-gray-800 text-gray-200'}`}>
                {t === 'login' ? 'Login' : t === 'donation' ? 'Donasi' : 'Item Mall'}
              </button>
            ))}
          </div>
          {historyTab === 'login' && (
            <SimpleTable headers={["IP", "Waktu"]} rows={history.logins.map((l) => [l.ip, l.time])} />
          )}
          {historyTab === 'donation' && (
            <SimpleTable headers={["Paket", "Tanggal"]} rows={history.donations.map((d) => [d.package, d.date])} />
          )}
          {historyTab === 'mall' && (
            <SimpleTable headers={["Item", "Harga", "Tanggal"]} rows={history.mall.map((m) => [m.item, `${m.price} Koin`, m.date])} />
          )}
        </SectionCard>

        <SectionCard title="Statistik Referral">
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <Stat label="Total Undangan" value={referralData.total} />
            <Stat label="Undangan Sukses (Lvl 10+)" value={referralData.success} />
            <Stat label="Total Hadiah Didapat" value={`${referralData.rewards} Koin`} />
          </div>
          <SimpleTable
            headers={["Username Undangan", "Tanggal Daftar", "Status"]}
            rows={referralData.details.map((d) => [d.username, d.date, d.status])}
          />
          <p className="mt-4 text-sm text-gray-300">
            Dapat 50 Koin saat temanmu mencapai Lvl 50. Temanmu juga mendapatkan Starter Pack!
          </p>
        </SectionCard>
      </div>
    );
  }

  if (activeView === 'shop') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        <SectionCard title="Top-Up / Donasi" right={<Coins className="text-yellow-400" />}> 
          <div className="grid md:grid-cols-3 gap-4">
            {donationPackages.map((p) => (
              <div key={p.id} className="bg-gray-800/60 border border-gray-700 rounded-lg p-5">
                <p className="text-white font-semibold">{p.name}</p>
                <p className="text-gray-300 text-sm">{p.coins} Koin</p>
                <p className="mt-2 text-indigo-400 font-bold">Rp {p.price.toLocaleString('id-ID')}</p>
                <div className="mt-4 flex items-center gap-2 text-gray-400 text-xs">
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-gray-900 border border-gray-700">Midtrans</span>
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-gray-900 border border-gray-700">QRIS</span>
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-gray-900 border border-gray-700">Bank</span>
                </div>
                <button className="mt-4 w-full px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-500" onClick={() => onManualConfirm(p.id)}>
                  Beli Sekarang
                </button>
              </div>
            ))}
          </div>
          <div className="mt-6 bg-gray-800/60 border border-gray-700 rounded-lg p-4 text-gray-300">
            <p className="font-medium">Konfirmasi Manual</p>
            <p className="text-sm">Lengkapi form berikut setelah transfer. (Simulasi)</p>
            <div className="mt-3 grid md:grid-cols-3 gap-3">
              <input className="bg-gray-900 border border-gray-800 rounded-md px-3 py-2 text-sm" placeholder="Nama / Username" />
              <input className="bg-gray-900 border border-gray-800 rounded-md px-3 py-2 text-sm" placeholder="Jumlah Transfer" />
              <button className="px-4 py-2 rounded-md bg-gray-800 text-gray-100 hover:bg-gray-700">Kirim</button>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Toko Item (Item Mall)" right={<ShoppingCart className="text-gray-300" />}> 
          <div className="flex items-center gap-2 mb-4">
            <Filter size={16} className="text-gray-400" />
            {['All', 'Weapon', 'Armor', 'Costume'].map((cat) => (
              <button key={cat} onClick={() => setCategory(cat)} className={`px-3 py-1 rounded-md text-sm ${category === cat ? 'bg-indigo-600 text-white' : 'bg-gray-800 text-gray-200'}`}>{cat}</button>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredItems.map((it) => (
              <div key={it.id} className="bg-gray-800/60 border border-gray-700 rounded-lg overflow-hidden">
                <div className="h-28 bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center text-gray-300 text-sm">Gambar</div>
                <div className="p-4">
                  <p className="text-white font-medium">{it.name}</p>
                  <p className="text-sm text-gray-300">{it.category}</p>
                  <p className="mt-2 text-yellow-400 font-semibold">{it.price} Koin</p>
                  <button onClick={() => setSelectedItem(it)} className="mt-3 w-full px-3 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-500">Beli</button>
                </div>
              </div>
            ))}
          </div>

          {selectedItem && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
              <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-xl p-6">
                <h4 className="text-white font-semibold">Konfirmasi Pembelian</h4>
                <p className="mt-2 text-gray-300">
                  Anda yakin ingin membeli <span className="text-white font-medium">{selectedItem.name}</span> seharga{' '}
                  <span className="text-yellow-400 font-semibold">{selectedItem.price} Koin</span>?
                </p>
                <div className="mt-5 flex justify-end gap-2">
                  <button onClick={() => setSelectedItem(null)} className="px-4 py-2 rounded-md bg-gray-800 text-gray-200 hover:bg-gray-700 inline-flex items-center gap-2"><X size={16}/> Batal</button>
                  <button
                    onClick={() => { onPurchase(selectedItem); setSelectedItem(null); }}
                    className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-500"
                  >
                    Konfirmasi
                  </button>
                </div>
              </div>
            </div>
          )}
        </SectionCard>
      </div>
    );
  }

  if (activeView === 'ranking') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        <SectionCard title="Top 100 Player">
          <SimpleTable headers={["Nama", "Level", "Job"]} rows={Array.from({ length: 100 }).map((_, i) => [
            `Player${i + 1}`, 100 - (i % 50), ['Warrior','Mage','Archer','Assassin'][i % 4]
          ])} />
        </SectionCard>
        <SectionCard title="Top 20 Guild">
          <SimpleTable headers={["Nama Guild", "Level", "Poin"]} rows={Array.from({ length: 20 }).map((_, i) => [
            `Guild${i + 1}`, 10 + (i % 10), 10000 - i * 123
          ])} />
        </SectionCard>
      </div>
    );
  }

  if (activeView === 'info' || activeView === 'download') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6" id="download">
        <SectionCard title="Informasi Server">
          <div className="grid md:grid-cols-3 gap-4 text-gray-300 text-sm">
            <div>
              <p className="text-white font-medium">Server Rates</p>
              <ul className="list-disc list-inside mt-2">
                <li>EXP: x50</li>
                <li>Drop: x20</li>
                <li>Gold: x10</li>
              </ul>
            </div>
            <div>
              <p className="text-white font-medium">Peraturan Server</p>
              <ul className="list-disc list-inside mt-2">
                <li>Jaga sportivitas dan sikap.</li>
                <li>Lapor bug melalui tiket.</li>
                <li>Hindari penggunaan program ilegal.</li>
              </ul>
            </div>
            <div>
              <p className="text-white font-medium">Daftar Tim GM</p>
              <ul className="list-disc list-inside mt-2">
                <li>GM Aria</li>
                <li>GM Leon</li>
                <li>GM Mika</li>
              </ul>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Download Client">
          <div className="grid md:grid-cols-2 gap-4">
            <a href="#" className="block text-center px-5 py-4 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500">Download Full Client (Google Drive)</a>
            <a href="#" className="block text-center px-5 py-4 rounded-lg bg-gray-800 text-gray-100 hover:bg-gray-700">Download Partial Patch (MediaFire)</a>
          </div>
          <p className="mt-4 text-sm text-gray-300">
            Panduan Instalasi: Ekstrak file, jalankan launcher sebagai Administrator, dan pastikan antivirus mengizinkan aplikasi.
          </p>
        </SectionCard>
      </div>
    );
  }

  return null;
}

function PasswordForm({ onSubmit }) {
  const [oldp, setOldp] = useState('');
  const [newp, setNewp] = useState('');
  const [newp2, setNewp2] = useState('');

  return (
    <form className="grid md:grid-cols-3 gap-3" onSubmit={(e) => { e.preventDefault(); if (newp && newp === newp2) onSubmit(oldp, newp); }}>
      <input className="bg-gray-900 border border-gray-800 rounded-md px-3 py-2" placeholder="Password Lama" type="password" value={oldp} onChange={(e) => setOldp(e.target.value)} />
      <input className="bg-gray-900 border border-gray-800 rounded-md px-3 py-2" placeholder="Password Baru" type="password" value={newp} onChange={(e) => setNewp(e.target.value)} />
      <div className="flex gap-2">
        <input className="flex-1 bg-gray-900 border border-gray-800 rounded-md px-3 py-2" placeholder="Konfirmasi Baru" type="password" value={newp2} onChange={(e) => setNewp2(e.target.value)} />
        <button className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-500" disabled={!newp || newp !== newp2}>Simpan</button>
      </div>
    </form>
  );
}

function PinForm({ onSubmit }) {
  const [oldp, setOldp] = useState('');
  const [newp, setNewp] = useState('');
  const [newp2, setNewp2] = useState('');

  return (
    <form className="grid md:grid-cols-3 gap-3" onSubmit={(e) => { e.preventDefault(); if (newp && newp === newp2) onSubmit(oldp, newp); }}>
      <input className="bg-gray-900 border border-gray-800 rounded-md px-3 py-2" placeholder="PIN Lama" type="password" value={oldp} onChange={(e) => setOldp(e.target.value)} />
      <input className="bg-gray-900 border border-gray-800 rounded-md px-3 py-2" placeholder="PIN Baru" type="password" value={newp} onChange={(e) => setNewp(e.target.value)} />
      <div className="flex gap-2">
        <input className="flex-1 bg-gray-900 border border-gray-800 rounded-md px-3 py-2" placeholder="Konfirmasi Baru" type="password" value={newp2} onChange={(e) => setNewp2(e.target.value)} />
        <button className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-500" disabled={!newp || newp !== newp2}>Simpan</button>
      </div>
    </form>
  );
}

function SimpleTable({ headers, rows }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left text-gray-300">
            {headers.map((h) => (
              <th key={h} className="py-2 pr-4">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={idx} className="border-t border-gray-800 text-gray-100">
              {r.map((c, i) => (
                <td key={i} className="py-2 pr-4">{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-4">
      <p className="text-xs text-gray-400">{label}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  );
}
