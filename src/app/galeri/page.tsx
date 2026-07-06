'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ImageIcon } from 'lucide-react';

type Gallery = { id: number; title: string; category: string; image_url: string | null; color: string; height: string; };

export default function Galeri() {
  const [items, setItems] = useState<Gallery[]>([]);
  const [filter, setFilter] = useState('Semua');
  useEffect(() => { fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://apikampungcibun.amania.id'}/api/galleries`).then(r => r.json()).then(d => setItems(d)).catch(console.error); }, []);

  const categories = ['Semua', ...Array.from(new Set(items.map(i => i.category)))];
  const filtered = filter === 'Semua' ? items : items.filter(i => i.category === filter);

  return (
    <div style={{ backgroundColor: '#FAF8F5' }}>
      <section className="pt-40 pb-12">
        <div className="container text-center max-w-3xl mx-auto">
          <p className="label-sm mb-6">Dokumentasi</p>
          <h1 className="text-4xl md:text-6xl mb-8 leading-tight" style={{ color: '#2D2D2D' }}>
            Galeri <em>Visual</em> Cibun
          </h1>
          <p className="text-lg leading-relaxed mb-10" style={{ color: '#888' }}>
            Rekam jejak keindahan alam, budaya, dan kebersamaan warga desa.
          </p>
          {/* Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(cat => (
              <button key={cat} onClick={() => setFilter(cat)}
                className="px-5 py-2 text-xs font-label font-semibold tracking-wider uppercase transition-all duration-200"
                style={filter === cat
                  ? { backgroundColor: '#2D2D2D', color: '#FFFFFF' }
                  : { backgroundColor: '#FFFFFF', color: '#999', border: '1px solid rgba(0,0,0,0.08)' }
                }>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-36">
        <div className="container">
          {filtered.length === 0 ? (
            <p className="text-center py-20" style={{ color: '#999' }}>Belum ada foto di galeri.</p>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {filtered.map((item, i) => (
                <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 3) * 0.1 }}
                  className="break-inside-avoid relative overflow-hidden group cursor-pointer"
                  style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
                  
                  {item.image_url ? (
                    <img src={`${process.env.NEXT_PUBLIC_API_URL || 'https://apikampungcibun.amania.id'}${item.image_url}`} alt={item.title} className="w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  ) : (
                    <div className="aspect-[4/3] flex items-center justify-center transition-transform duration-700 group-hover:scale-105"
                      style={{ background: item.color || 'linear-gradient(135deg, #1E3A2F, #97BC62)' }}>
                      <ImageIcon size={48} style={{ color: 'rgba(255,255,255,0.3)' }} />
                    </div>
                  )}

                  <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)' }}>
                    <div>
                      <p className="font-label text-[10px] font-semibold tracking-[0.2em] uppercase mb-2" style={{ color: '#C5A55A' }}>{item.category}</p>
                      <h3 className="text-lg font-semibold" style={{ color: '#FFFFFF', fontFamily: 'var(--font-heading)' }}>{item.title}</h3>
                    </div>
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
