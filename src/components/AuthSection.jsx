import React, { useEffect, useMemo, useState } from 'react';
import { Check, X } from 'lucide-react';

function Input({ label, type = 'text', value, onChange, placeholder }) {
  return (
    <label className="block">
      <span className="text-sm text-gray-300">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 w-full rounded-md bg-gray-900 border border-gray-800 focus:border-indigo-500 focus:ring-0 text-gray-100 px-3 py-2"
      />
    </label>
  );
}

export default function AuthSection({ mode = 'login', onRegister, onLogin, onRecovery, existingUsers }) {
  const [activeTab, setActiveTab] = useState(mode);

  useEffect(() => setActiveTab(mode), [mode]);

  // Shared state
  const [email, setEmail] = useState('');

  // Register state
  const [rUsername, setRUsername] = useState('');
  const [rEmail, setREmail] = useState('');
  const [rPassword, setRPassword] = useState('');
  const [rPassword2, setRPassword2] = useState('');
  const [refCode, setRefCode] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref');
    if (ref) setRefCode(ref);
  }, []);

  const usernameTaken = useMemo(
    () => existingUsers.some((u) => u.username.toLowerCase() === rUsername.trim().toLowerCase()),
    [existingUsers, rUsername]
  );
  const emailValid = useMemo(() => /[^@\s]+@[^@\s]+\.[^@\s]+/.test(rEmail), [rEmail]);
  const passwordMatch = rPassword.length > 0 && rPassword === rPassword2;

  // Login state
  const [lUser, setLUser] = useState('');
  const [lPassword, setLPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [loginError, setLoginError] = useState('');

  // Recovery
  const [recEmail, setRecEmail] = useState('');
  const [recoveryMessage, setRecoveryMessage] = useState('');

  const tryRegister = (e) => {
    e.preventDefault();
    if (!rUsername || !emailValid || !passwordMatch || usernameTaken) return;
    onRegister({ username: rUsername.trim(), email: rEmail.trim(), password: rPassword, refCode: refCode.trim() });
  };

  const tryLogin = (e) => {
    e.preventDefault();
    const ok = onLogin({ login: lUser.trim(), password: lPassword, remember });
    if (!ok) setLoginError('Kredensial tidak valid.');
  };

  const tryRecovery = (e) => {
    e.preventDefault();
    setRecoveryMessage('Jika email Anda terdaftar, tautan pemulihan telah dikirim.');
    onRecovery(recEmail.trim());
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        <div className="flex">
          {['login', 'register', 'recovery'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-5 py-3 text-sm font-medium ${activeTab === tab ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:bg-gray-800'}`}
            >
              {tab === 'login' ? 'Login' : tab === 'register' ? 'Daftar' : 'Pemulihan Akun'}
            </button>
          ))}
        </div>
        <div className="p-6">
          {activeTab === 'register' && (
            <form onSubmit={tryRegister} className="space-y-4">
              <h3 className="text-white text-lg font-semibold">Buat Akun Baru</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Input label="Username" value={rUsername} onChange={setRUsername} placeholder="yourname" />
                <Input label="Email" type="email" value={rEmail} onChange={setREmail} placeholder="you@example.com" />
                <Input label="Password" type="password" value={rPassword} onChange={setRPassword} placeholder="********" />
                <Input label="Konfirmasi Password" type="password" value={rPassword2} onChange={setRPassword2} placeholder="********" />
                <Input label="Kode Referral (opsional)" value={refCode} onChange={setRefCode} placeholder="REF123" />
              </div>

              <div className="flex items-center gap-2 text-sm">
                <span className={`inline-flex items-center gap-1 ${usernameTaken ? 'text-red-400' : 'text-green-400'}`}>
                  {usernameTaken ? <X size={16} /> : <Check size={16} />}
                  {usernameTaken ? 'Username sudah terpakai' : 'Username tersedia'}
                </span>
                <span className={`inline-flex items-center gap-1 ${emailValid ? 'text-green-400' : 'text-red-400'}`}>
                  {emailValid ? <Check size={16} /> : <X size={16} />}
                  {emailValid ? 'Email valid' : 'Email tidak valid'}
                </span>
                <span className={`inline-flex items-center gap-1 ${passwordMatch ? 'text-green-400' : 'text-red-400'}`}>
                  {passwordMatch ? <Check size={16} /> : <X size={16} />}
                  {passwordMatch ? 'Password cocok' : 'Password tidak cocok'}
                </span>
              </div>

              <div className="bg-gray-800/60 border border-gray-700 rounded-md p-4 text-center text-gray-400">
                reCAPTCHA di sini
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2 rounded-md bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white hover:from-indigo-500 hover:to-fuchsia-500"
                  disabled={!rUsername || !emailValid || !passwordMatch || usernameTaken}
                >
                  Daftar
                </button>
              </div>
            </form>
          )}

          {activeTab === 'login' && (
            <form onSubmit={tryLogin} className="space-y-4">
              <h3 className="text-white text-lg font-semibold">Login</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Input label="Username / Email" value={lUser} onChange={setLUser} placeholder="yourname atau you@example.com" />
                <Input label="Password" type="password" value={lPassword} onChange={setLPassword} placeholder="********" />
              </div>
              <label className="inline-flex items-center gap-2 text-sm text-gray-300">
                <input type="checkbox" className="accent-indigo-600" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                Ingat Saya
              </label>
              {loginError && <p className="text-red-400 text-sm">{loginError}</p>}
              <div className="flex justify-end">
                <button type="submit" className="px-5 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-500">Login</button>
              </div>
            </form>
          )}

          {activeTab === 'recovery' && (
            <form onSubmit={tryRecovery} className="space-y-4">
              <h3 className="text-white text-lg font-semibold">Pemulihan Akun</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Input label="Lupa Password - Email" type="email" value={recEmail} onChange={setRecEmail} placeholder="you@example.com" />
                <Input label="Lupa Username - Email" type="email" value={email} onChange={setEmail} placeholder="you@example.com" />
              </div>
              <div className="flex justify-end">
                <button type="submit" className="px-5 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-500">Kirim</button>
              </div>
              {recoveryMessage && <p className="text-green-400 text-sm">{recoveryMessage}</p>}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
