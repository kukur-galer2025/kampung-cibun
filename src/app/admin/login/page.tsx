'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogIn } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/api/login', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify({ email, password }) });
      const data = await res.json();
      if (res.ok && data.token) { localStorage.setItem('admin_token', data.token); router.push('/admin'); }
      else setError(data.message || 'Login gagal.');
    } catch { setError('Tidak dapat terhubung ke server.'); }
    finally { setLoading(false); }
  };

  return (
    <div className="w-full max-w-md p-10 md:p-12 relative" style={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 20px 60px rgba(0,0,0,0.08)' }}>
      <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: '#C5A55A' }}></div>
      <div className="text-center mb-10">
        <p className="font-label font-black text-3xl tracking-tight mb-2" style={{ color: '#2D2D2D' }}>CIBUN</p>
        <p className="font-label text-xs tracking-wider uppercase" style={{ color: '#999' }}>Admin Portal</p>
      </div>
      {error && <div className="p-4 mb-6 text-sm" style={{ backgroundColor: 'rgba(204,68,68,0.05)', color: '#cc4444', border: '1px solid rgba(204,68,68,0.1)' }}>{error}</div>}
      <form onSubmit={handleLogin} className="space-y-5">
        <div>
          <label className="block font-label text-xs font-semibold tracking-wider uppercase mb-3" style={{ color: '#999' }}>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-5 py-4 text-sm focus:outline-none" placeholder="admin@cibuntourism.id"
            style={{ backgroundColor: '#FAF8F5', border: '1px solid rgba(0,0,0,0.08)', color: '#2D2D2D' }} />
        </div>
        <div>
          <label className="block font-label text-xs font-semibold tracking-wider uppercase mb-3" style={{ color: '#999' }}>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full px-5 py-4 text-sm focus:outline-none" placeholder="••••••••"
            style={{ backgroundColor: '#FAF8F5', border: '1px solid rgba(0,0,0,0.08)', color: '#2D2D2D' }} />
        </div>
        <button type="submit" disabled={loading} className="w-full font-label font-semibold tracking-wider text-sm uppercase py-4 flex items-center justify-center gap-2 transition-all duration-300 mt-4 disabled:opacity-60"
          style={{ backgroundColor: '#2D2D2D', color: '#FFFFFF' }}>
          {loading ? 'Memproses...' : <><LogIn size={16} /> Masuk</>}
        </button>
      </form>
    </div>
  );
}
