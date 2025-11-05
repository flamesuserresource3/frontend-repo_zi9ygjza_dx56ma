import React, { useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import HomeSection from './components/HomeSection';
import AuthSection from './components/AuthSection';
import PortalSections from './components/PortalSections';

export default function App() {
  const [activeView, setActiveView] = useState('home');

  // Simulated users & auth state
  const [users, setUsers] = useState([
    { username: 'ADMIN', email: 'admin@aetheria.gg', password: 'admin123', coins: 500 }
  ]);
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Referral tracked registrations (dummy + from signups)
  const [referrals, setReferrals] = useState([
    { username: 'userB', date: '5 Nov 2025', status: 'Level 12 (Sukses)' },
    { username: 'userC', date: '6 Nov 2025', status: 'Level 1 (Pending)' },
  ]);

  // Characters
  const [characters, setCharacters] = useState([
    { name: 'Aria', level: 65, job: 'Mage' },
    { name: 'Leon', level: 58, job: 'Warrior' },
    { name: 'Mika', level: 45, job: 'Archer' },
  ]);

  // History
  const [history, setHistory] = useState({
    logins: [ { ip: '192.168.0.2', time: '5 Nov 2025 10:15' }, { ip: '192.168.0.3', time: '6 Nov 2025 09:02' } ],
    donations: [ { package: 'Paket A', date: '3 Nov 2025' }, { package: 'Paket C', date: '4 Nov 2025' } ],
    mall: [ { item: 'Costume Dragon', price: 350, date: '2 Nov 2025' } ],
  });

  // Shop
  const donationPackages = [
    { id: 'A', name: 'Paket A', coins: 500, price: 50000 },
    { id: 'B', name: 'Paket B', coins: 1100, price: 100000 },
    { id: 'C', name: 'Paket C', coins: 3000, price: 250000 },
  ];

  const [items, setItems] = useState([
    { id: 1, name: 'Crimson Blade', category: 'Weapon', price: 500 },
    { id: 2, name: 'Aegis Armor', category: 'Armor', price: 400 },
    { id: 3, name: 'Shadow Cloak', category: 'Costume', price: 250 },
    { id: 4, name: 'Storm Bow', category: 'Weapon', price: 450 },
    { id: 5, name: 'Guardian Plate', category: 'Armor', price: 420 },
  ]);

  // Handlers
  const handleNavigate = (view) => setActiveView(view);

  const handleRegister = ({ username, email, password, refCode }) => {
    const newUser = { username, email, password, coins: 200 };
    setUsers((prev) => [...prev, newUser]);
    if (refCode) {
      setReferrals((prev) => [
        ...prev,
        { username, date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }), status: 'Level 1 (Pending)' }
      ]);
    }
    alert('Registrasi berhasil! Silakan login.');
    setActiveView('login');
  };

  const handleLogin = ({ login, password, remember }) => {
    const user = users.find(
      (u) => (u.username.toLowerCase() === login.toLowerCase() || u.email.toLowerCase() === login.toLowerCase()) && u.password === password
    );
    if (!user) return false;
    setLoggedInUser(user);
    setActiveView('ucp');
    return true;
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    setActiveView('home');
  };

  const handleRecovery = (email) => {
    // Simulated only
    console.log('Recovery requested for', email);
  };

  const handleCopy = async (text) => {
    try { await navigator.clipboard.writeText(text); alert('Link tersalin!'); } catch { alert('Gagal menyalin'); }
  };

  const handleChangePassword = (oldp, newp) => {
    alert('Password berhasil diubah (simulasi).');
  };

  const handleChangePin = (oldp, newp) => {
    alert('PIN keamanan berhasil diubah (simulasi).');
  };

  const handleUnstuck = (name) => {
    alert(`Karakter ${name} berhasil di-reset posisinya.`);
  };

  const handleManualConfirm = (packageId) => {
    alert(`Konfirmasi manual untuk paket ${packageId} terkirim (simulasi).`);
  };

  const handlePurchase = (item) => {
    if (!loggedInUser) { alert('Silakan login terlebih dahulu.'); return; }
    if (loggedInUser.coins < item.price) { alert('Koin tidak mencukupi.'); return; }
    setLoggedInUser({ ...loggedInUser, coins: loggedInUser.coins - item.price });
    setHistory((h) => ({ ...h, mall: [...h.mall, { item: item.name, price: item.price, date: new Date().toLocaleDateString('id-ID') }] }));
    alert('Pembelian berhasil! Item dikirim ke mailbox (simulasi).');
  };

  const referralData = useMemo(() => ({
    link: `${window.location.origin}/?ref=${loggedInUser ? loggedInUser.username : 'YOURNAME'}`,
    total: 10,
    success: 3,
    rewards: 150,
    details: referrals,
  }), [referrals, loggedInUser]);

  return (
    <div className="min-h-screen bg-[#0b0d12] text-gray-100">
      <Navbar
        activeView={activeView}
        onNavigate={handleNavigate}
        loggedIn={!!loggedInUser}
        onShowLogin={() => setActiveView('login')}
        onShowRegister={() => setActiveView('register')}
        onLogout={handleLogout}
      />

      {activeView === 'home' && <HomeSection onGoRegister={() => setActiveView('register')} />}

      {(activeView === 'login' || activeView === 'register' || activeView === 'recovery') && (
        <AuthSection
          mode={activeView === 'login' ? 'login' : activeView === 'register' ? 'register' : 'recovery'}
          onRegister={handleRegister}
          onLogin={handleLogin}
          onRecovery={handleRecovery}
          existingUsers={users}
        />
      )}

      {loggedInUser && ['ucp', 'shop', 'ranking', 'info', 'download'].includes(activeView) && (
        <PortalSections
          activeView={activeView}
          user={loggedInUser}
          onCopy={handleCopy}
          referralData={referralData}
          onChangePassword={handleChangePassword}
          onChangePin={handleChangePin}
          characters={characters}
          onUnstuck={handleUnstuck}
          history={history}
          donationPackages={donationPackages}
          onManualConfirm={handleManualConfirm}
          items={items}
          onPurchase={handlePurchase}
        />
      )}

      {!loggedInUser && ['shop', 'ranking', 'info', 'download'].includes(activeView) && (
        <PortalSections
          activeView={activeView}
          user={{ username: 'Guest', coins: 0 }}
          onCopy={() => {}}
          referralData={referralData}
          onChangePassword={() => {}}
          onChangePin={() => {}}
          characters={[]}
          onUnstuck={() => {}}
          history={{ logins: [], donations: [], mall: [] }}
          donationPackages={donationPackages}
          onManualConfirm={handleManualConfirm}
          items={items}
          onPurchase={handlePurchase}
        />
      )}

      <footer className="mt-10 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-sm text-gray-400 flex flex-col sm:flex-row items-center justify-between">
          <p>© {new Date().getFullYear()} Aetheria Online. All rights reserved.</p>
          <div className="flex gap-4 mt-2 sm:mt-0">
            <a className="hover:text-gray-200" onClick={() => setActiveView('info')}>Ketentuan</a>
            <a className="hover:text-gray-200" onClick={() => setActiveView('info')}>Kebijakan Privasi</a>
            <a className="hover:text-gray-200" onClick={() => setActiveView('download')}>Download</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
