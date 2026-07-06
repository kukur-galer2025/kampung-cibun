'use client';

import { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';
import Link from 'next/link';

type News = { id: number; title: string; category: string; date: string; excerpt: string; image_url?: string; };

export default function Berita() {
  const [news, setNews] = useState<News[]>([]);
  useEffect(() => { fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://apikampungcibun.amania.id'}/api/news`).then(r => r.json()).then(d => setNews(d)).catch(console.error); }, []);

  const fadeIn: Variants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

  return (
    <div style={{ backgroundColor: '#FAF8F5' }}>
      <section className="pt-40 pb-20">
        <div className="container text-center max-w-3xl mx-auto">
          <p className="label-sm mb-6">Publikasi</p>
          <h1 className="text-4xl md:text-6xl mb-8 leading-tight" style={{ color: '#2D2D2D' }}>Kabar <em>Terbaru</em> dari Cibun</h1>
          <p className="text-lg leading-relaxed" style={{ color: '#888' }}>Catatan perjalanan, berita desa, dan inspirasi.</p>
        </div>
      </section>

      <section className="pb-36">
        <div className="container">
          {news.length === 0 ? (
            <p className="text-center py-20" style={{ color: '#999' }}>Memuat berita...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((n, i) => (
                <motion.div key={n.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ delay: (i % 3) * 0.1 }}
                  className="group flex flex-col" style={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(0,0,0,0.06)' }}>
                  <div className="h-56 relative overflow-hidden" style={{ backgroundColor: '#E8E4DE' }}>
                    {n.image_url ? (
                      <img src={`${process.env.NEXT_PUBLIC_API_URL || 'https://apikampungcibun.amania.id'}${n.image_url}`} alt={n.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center"><span className="text-5xl opacity-30">📰</span></div>
                    )}
                    <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5" style={{ backgroundColor: '#FFFFFF' }}>
                      <Calendar size={12} style={{ color: '#C5A55A' }} />
                      <span className="font-label text-[11px] font-semibold" style={{ color: '#2D2D2D' }}>{n.date}</span>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col p-8">
                    <p className="font-label text-[11px] font-semibold tracking-[0.15em] uppercase mb-3" style={{ color: '#C5A55A' }}>{n.category}</p>
                    <h3 className="text-xl mb-4 leading-snug line-clamp-2 group-hover:underline" style={{ color: '#2D2D2D' }}>
                      <Link href={`/berita/${n.id}`}>{n.title}</Link>
                    </h3>
                    <p className="text-sm leading-relaxed mb-6 flex-1 line-clamp-3" style={{ color: '#888' }}>{n.excerpt}</p>
                    <Link href={`/berita/${n.id}`} className="inline-flex items-center gap-2 text-sm font-label font-semibold tracking-wider uppercase" style={{ color: '#2D2D2D' }}>
                      Baca <ArrowRight size={14} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
