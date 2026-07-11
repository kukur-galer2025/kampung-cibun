'use client';

import { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';

type Product = { id: number; name: string; description: string; features: string[]; image_url?: string; };

export default function ProdukLokal() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => { fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://apikampungcibun.amania.id'}/api/products`).then(r => r.json()).then(d => setProducts(d)).catch(console.error); }, []);

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
                      <img src={`${process.env.NEXT_PUBLIC_API_URL || 'https://apikampungcibun.amania.id'}${prod.image_url}`} alt={prod.name} className="w-full h-full object-cover" />
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
                    
                    <a href={`https://wa.me/6282328700576?text=Halo,%20saya%20tertarik%20dengan%20produk%20lokal%20Cibun:%20${encodeURIComponent(prod.name)}`} 
                       target="_blank" 
                       rel="noopener noreferrer" 
                       className="w-full inline-flex items-center justify-center font-label font-semibold tracking-wider text-sm uppercase px-6 py-4 transition-all duration-300 hover:bg-[#2D2D2D] hover:text-[#FAF8F5] border border-[#2D2D2D] text-[#2D2D2D]">
                      Pesan via WA 
                      <svg className="ml-2 w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                    </a>
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
