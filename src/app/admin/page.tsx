'use client';

import { useEffect, useState } from 'react';
import { Target, CalendarDays, ShoppingBag, Image as ImageIcon, Newspaper, Users } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ programs: 0, events: 0, products: 0, galleries: 0, news: 0 });

  useEffect(() => {
    const fetchLen = (url: string) => fetch(url).then(r => r.json()).then(d => Array.isArray(d) ? d.length : 0).catch(() => 0);
    Promise.all([
      fetchLen(`${process.env.NEXT_PUBLIC_API_URL || 'https://apikampungcibun.amania.id'}/api/programs`),
      fetchLen(`${process.env.NEXT_PUBLIC_API_URL || 'https://apikampungcibun.amania.id'}/api/events`),
      fetchLen(`${process.env.NEXT_PUBLIC_API_URL || 'https://apikampungcibun.amania.id'}/api/products`),
      fetchLen(`${process.env.NEXT_PUBLIC_API_URL || 'https://apikampungcibun.amania.id'}/api/galleries`),
      fetchLen(`${process.env.NEXT_PUBLIC_API_URL || 'https://apikampungcibun.amania.id'}/api/news`),
    ]).then(([p, e, pr, g, n]) => setStats({ programs: p, events: e, products: pr, galleries: g, news: n }));
  }, []);

  const cards = [
    { title: "Programs", count: stats.programs, icon: Target, accent: '#3B82F6' },
    { title: "Events", count: stats.events, icon: CalendarDays, accent: '#C5A55A' },
    { title: "Products", count: stats.products, icon: ShoppingBag, accent: '#22C55E' },
    { title: "Galleries", count: stats.galleries, icon: ImageIcon, accent: '#A855F7' },
    { title: "News", count: stats.news, icon: Newspaper, accent: '#EF4444' },
    { title: "Users", count: 1, icon: Users, accent: '#6B7280' },
  ];

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl mb-2" style={{ fontFamily: 'var(--font-heading)', color: '#2D2D2D' }}>Dashboard</h1>
        <p className="text-sm" style={{ color: '#999' }}>Ringkasan data website CIBUN Tourism</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((c, i) => (
          <div key={i} className="p-6 flex items-center gap-6 transition-shadow duration-300 hover:shadow-md"
            style={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(0,0,0,0.06)' }}>
            <div className="w-14 h-14 flex items-center justify-center shrink-0" style={{ backgroundColor: `${c.accent}10`, color: c.accent }}>
              <c.icon size={28} />
            </div>
            <div>
              <p className="font-label text-[11px] font-semibold tracking-[0.15em] uppercase" style={{ color: '#999' }}>{c.title}</p>
              <p className="text-3xl font-black font-label mt-1" style={{ color: '#2D2D2D' }}>{c.count}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 p-8" style={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(0,0,0,0.06)' }}>
        <h3 className="text-lg font-semibold mb-3 font-label" style={{ color: '#2D2D2D' }}>Selamat Datang!</h3>
        <p className="text-sm leading-relaxed" style={{ color: '#888' }}>Gunakan menu di sebelah kiri untuk mengelola konten website — program, berita, galeri, dan lainnya.</p>
      </div>
    </div>
  );
}
