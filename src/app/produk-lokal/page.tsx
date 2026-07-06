'use client';

import { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';

type Product = { id: number; name: string; description: string; features: string[]; image_url?: string; };

export default function ProdukLokal() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => { fetch('http://localhost:8000/api/products').then(r => r.json()).then(d => setProducts(d)).catch(console.error); }, []);

  const fadeIn: Variants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

  return (
    <div style={{ backgroundColor: '#FAF8F5' }}>
      <section className="pt-40 pb-20">
        <div className="container text-center max-w-3xl mx-auto">
          <p className="label-sm mb-6">UMKM Desa</p>
          <h1 className="text-4xl md:text-6xl mb-8 leading-tight" style={{ color: '#2D2D2D' }}>
            Produk Lokal <em>Unggulan</em> Cibun
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: '#888' }}>
            Karya tangan warga desa, dari alam untuk kesejahteraan bersama.
          </p>
        </div>
      </section>

      <section className="pb-36">
        <div className="container">
          {products.length === 0 ? (
            <p className="text-center py-20" style={{ color: '#999' }}>Memuat produk...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((prod, i) => (
                <motion.div key={prod.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ delay: (i % 3) * 0.1 }}
                  className="flex flex-col h-full transition-all duration-300 hover:shadow-lg overflow-hidden"
                  style={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(0,0,0,0.06)' }}>
                  
                  {prod.image_url ? (
                    <div className="w-full h-48 relative" style={{ backgroundColor: '#F0F0F0' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={`http://localhost:8000${prod.image_url}`} alt={prod.name} className="w-full h-full object-cover" />
                      <div className="absolute top-4 right-4">
                        <span className="font-label text-[10px] font-semibold tracking-[0.2em] uppercase px-3 py-1 bg-white/90 shadow-sm" style={{ color: '#C5A55A' }}>UMKM</span>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-48 relative flex items-center justify-center" style={{ backgroundColor: '#F9F9F9' }}>
                      <span className="font-label text-[10px] font-semibold tracking-[0.2em] uppercase px-3 py-1" style={{ backgroundColor: 'rgba(197,165,90,0.1)', color: '#C5A55A' }}>UMKM</span>
                    </div>
                  )}

                  <div className={`flex flex-col flex-1 px-10 pb-10 ${prod.image_url ? 'pt-8' : 'pt-8'}`}>
                    <h3 className="text-2xl mb-4" style={{ color: '#2D2D2D' }}>{prod.name}</h3>
                    <p className="text-sm leading-relaxed mb-8 flex-1" style={{ color: '#888' }}>{prod.description}</p>
                    
                    {Array.isArray(prod.features) && prod.features.length > 0 && (
                      <ul className="space-y-3 mb-8">
                        {prod.features.map((f, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-sm" style={{ color: '#666' }}>
                            <Check size={14} className="shrink-0 mt-0.5" style={{ color: '#C5A55A' }} />
                            {f}
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    <button className="w-full inline-flex items-center justify-center font-label font-semibold tracking-wider text-sm uppercase px-6 py-4 transition-all duration-300"
                      style={{ border: '1px solid #2D2D2D', color: '#2D2D2D' }}>
                      Pesan Sekarang <ArrowRight size={14} className="ml-2" />
                    </button>
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
