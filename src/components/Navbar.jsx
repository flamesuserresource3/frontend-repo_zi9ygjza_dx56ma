import React from 'react';
import { Home, User, LogIn, LogOut, ShoppingBag, Crown, Info, Download as DownloadIcon, Store } from 'lucide-react';

const NavButton = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      active ? 'bg-indigo-600 text-white' : 'text-gray-200 hover:bg-gray-800 hover:text-white'
    }`}
  >
    <Icon size={18} /> {label}
  </button>
);

export default function Navbar({ activeView, onNavigate, loggedIn, onShowLogin, onShowRegister, onLogout }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-[#0b0d12]/80 backdrop-blur supports-[backdrop-filter]:bg-[#0b0d12]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded bg-gradient-to-br from-indigo-500 to-fuchsia-500" />
            <div className="flex flex-col leading-tight">
              <span className="text-white font-semibold">Aetheria Online</span>
              <span className="text-xs text-gray-400">Private Server</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-2">
            <NavButton icon={Home} label="Beranda" active={activeView === 'home'} onClick={() => onNavigate('home')} />
            <NavButton icon={Store} label="Toko" active={activeView === 'shop'} onClick={() => onNavigate('shop')} />
            <NavButton icon={Crown} label="Peringkat" active={activeView === 'ranking'} onClick={() => onNavigate('ranking')} />
            <NavButton icon={Info} label="Info Server" active={activeView === 'info'} onClick={() => onNavigate('info')} />
            <NavButton icon={DownloadIcon} label="Download" active={activeView === 'download'} onClick={() => onNavigate('download')} />
          </nav>

          <div className="flex items-center gap-2">
            {!loggedIn ? (
              <div className="flex items-center gap-2">
                <NavButton icon={LogIn} label="Login" active={activeView === 'login'} onClick={onShowLogin} />
                <button
                  onClick={onShowRegister}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white hover:from-indigo-500 hover:to-fuchsia-500"
                >
                  <User size={18} /> Daftar
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <NavButton icon={User} label="UCP" active={activeView === 'ucp'} onClick={() => onNavigate('ucp')} />
                <button
                  onClick={onLogout}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium bg-gray-800 text-gray-200 hover:bg-gray-700"
                >
                  <LogOut size={18} /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="md:hidden border-t border-gray-800">
        <div className="px-4 py-2 flex gap-2 overflow-x-auto no-scrollbar">
          <NavButton icon={Home} label="Beranda" active={activeView === 'home'} onClick={() => onNavigate('home')} />
          <NavButton icon={Store} label="Toko" active={activeView === 'shop'} onClick={() => onNavigate('shop')} />
          <NavButton icon={Crown} label="Peringkat" active={activeView === 'ranking'} onClick={() => onNavigate('ranking')} />
          <NavButton icon={Info} label="Info" active={activeView === 'info'} onClick={() => onNavigate('info')} />
          <NavButton icon={DownloadIcon} label="Download" active={activeView === 'download'} onClick={() => onNavigate('download')} />
        </div>
      </div>
    </header>
  );
}
