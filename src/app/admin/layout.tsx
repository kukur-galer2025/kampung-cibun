'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LayoutDashboard, Target, CalendarDays, ShoppingBag, Image as ImageIcon, Newspaper, LogOut, ExternalLink } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const token = localStorage.getItem('admin_token');
    if (!token && pathname !== '/admin/login') router.push('/admin/login');
  }, [pathname, router]);

  if (!isClient) return null;
  if (pathname === '/admin/login') return <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#FAF8F5' }}>{children}</div>;

  const handleLogout = () => { localStorage.removeItem('admin_token'); router.push('/admin/login'); };

  const navs = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Programs', path: '/admin/programs', icon: Target },
    { name: 'Events', path: '/admin/events', icon: CalendarDays },
    { name: 'Products', path: '/admin/products', icon: ShoppingBag },
    { name: 'Galleries', path: '/admin/galleries', icon: ImageIcon },
    { name: 'News', path: '/admin/news', icon: Newspaper },
  ];

  return (
    <div className="flex h-screen overflow-hidden font-label" style={{ backgroundColor: '#FAF8F5' }}>
      <aside className="w-64 flex flex-col" style={{ backgroundColor: '#1A1A1A' }}>
        <div className="p-6 flex items-center gap-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <span className="font-black text-xl tracking-tight" style={{ color: '#FFFFFF' }}>CIBUN</span>
          <span className="text-[9px] font-medium tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>Admin</span>
        </div>
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navs.map((nav) => {
            const isActive = pathname === nav.path || (nav.path !== '/admin' && pathname.startsWith(nav.path));
            return (
              <Link key={nav.path} href={nav.path}
                className="flex items-center gap-3 px-4 py-3 rounded-sm transition-all duration-200 text-sm tracking-wider"
                style={isActive ? { backgroundColor: 'rgba(255,255,255,0.08)', color: '#FFFFFF', fontWeight: 600 } : { color: 'rgba(255,255,255,0.4)' }}>
                <nav.icon size={18} style={isActive ? { color: '#C5A55A' } : {}} />
                {nav.name}
              </Link>
            );
          })}
          <div className="pt-6 mt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <Link href="/" target="_blank" className="flex items-center justify-between px-4 py-3 rounded-sm text-sm tracking-wider transition-colors"
              style={{ color: 'rgba(255,255,255,0.35)', border: '1px solid rgba(255,255,255,0.06)' }}>
              Lihat Website <ExternalLink size={14} />
            </Link>
          </div>
        </nav>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="px-8 py-4 flex justify-between items-center" style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
          <h2 className="font-semibold text-sm tracking-wider uppercase" style={{ color: '#999' }}>Admin Panel</h2>
          <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold tracking-wider transition-colors"
            style={{ color: '#cc4444', border: '1px solid rgba(204,68,68,0.2)' }}>
            <LogOut size={14} /> Logout
          </button>
        </header>
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto">{children}</div>
        </div>
      </main>
      
      {/* Luxury Styled Toaster */}
      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: {
            borderRadius: '2px',
            background: '#2D2D2D',
            color: '#FFFFFF',
            fontFamily: 'var(--font-label)',
            fontSize: '13px',
            letterSpacing: '0.05em',
            border: '1px solid #C5A55A',
            padding: '16px 24px',
          },
          success: {
            iconTheme: { primary: '#C5A55A', secondary: '#2D2D2D' },
          },
          error: {
            style: { border: '1px solid #cc4444' },
            iconTheme: { primary: '#cc4444', secondary: '#FFFFFF' },
          },
        }} 
      />
    </div>
  );
}
