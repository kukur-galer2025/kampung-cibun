'use client';

import { motion } from 'framer-motion';
import { Users, TrendingUp, Leaf, Shield } from 'lucide-react';
import Image from 'next/image';

const getPillarIcon = (pillar: string) => {
  switch (pillar) {
    case 'Sosial': return <Users size={16} />;
    case 'Ekonomi': return <TrendingUp size={16} />;
    case 'Lingkungan': return <Leaf size={16} />;
    default: return <Shield size={16} />;
  }
};

export default function SDGs() {
  const sdgs = [
    { no: 1, title: "Tanpa Kemiskinan", desc: "Meningkatkan pendapatan warga melalui pariwisata dan UMKM desa.", pillar: "Sosial" },
    { no: 4, title: "Pendidikan Berkualitas", desc: "Edukasi sadar wisata, lingkungan, dan literasi digital.", pillar: "Sosial" },
    { no: 5, title: "Kesetaraan Gender", desc: "Peran aktif perempuan dalam UMKM dan pengambilan keputusan.", pillar: "Sosial" },
    { no: 8, title: "Pekerjaan Layak", desc: "Peluang kerja baru dari ekowisata dan ekonomi kreatif.", pillar: "Ekonomi" },
    { no: 10, title: "Berkurangnya Kesenjangan", desc: "Distribusi manfaat ekonomi yang adil bagi seluruh warga.", pillar: "Ekonomi" },
    { no: 11, title: "Pemukiman Berkelanjutan", desc: "Menjaga warisan budaya dan identitas desa.", pillar: "Lingkungan" },
    { no: 12, title: "Konsumsi Bertanggung Jawab", desc: "Pemanfaatan produk lokal dan program nol sampah.", pillar: "Lingkungan" },
    { no: 15, title: "Ekosistem Daratan", desc: "Konservasi hutan pinus, sumber air, dan keanekaragaman hayati.", pillar: "Lingkungan" },
    { no: 17, title: "Kemitraan Global", desc: "Kolaborasi Pentahelix untuk dampak berkelanjutan.", pillar: "Tata Kelola & Ekonomi" },
  ];

  return (
    <div style={{ backgroundColor: '#FAF8F5' }}>
      {/* Hero Section */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[40%] aspect-square rounded-full blur-[120px]" style={{ background: 'radial-gradient(circle, rgba(197,165,90,0.15) 0%, rgba(255,255,255,0) 70%)' }}></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-[50%] aspect-square rounded-full blur-[140px]" style={{ background: 'radial-gradient(circle, rgba(197,165,90,0.1) 0%, rgba(255,255,255,0) 70%)' }}></div>
        </div>
        <div className="container relative z-10 text-center max-w-3xl mx-auto">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="label-sm mb-6" style={{ color: '#C5A55A' }}>
            Dampak Global
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="text-4xl md:text-6xl lg:text-7xl mb-8 leading-[1.1]" style={{ color: '#2D2D2D', textShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
            Kontribusi Lokal untuk <em>Tujuan</em> Dunia
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="text-lg leading-relaxed" style={{ color: '#666' }}>
            Sembilan Tujuan Pembangunan Berkelanjutan (SDGs) yang kami dukung melalui aksi nyata dan berkelanjutan di tingkat desa.
          </motion.p>
        </div>
      </section>

      {/* SDGs Grid */}
      <section className="pb-36 relative z-10">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sdgs.map((sdg, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
                className="relative overflow-hidden p-10 group bg-white flex flex-col h-full transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(197,165,90,0.15)]"
                style={{ border: '1px solid rgba(197,165,90,0.1)', borderRadius: '2px' }}>
                
                {/* Large Background Watermark Number */}
                <div className="absolute -right-6 -bottom-10 text-[180px] font-black opacity-[0.03] pointer-events-none transition-transform duration-700 group-hover:scale-110 group-hover:opacity-[0.05]" 
                  style={{ color: '#C5A55A', fontFamily: 'var(--font-heading)', lineHeight: 1 }}>
                  {sdg.no}
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full" style={{ backgroundColor: 'rgba(197,165,90,0.05)' }}>
                      <span className="text-2xl font-heading font-bold" style={{ color: '#C5A55A' }}>{sdg.no}</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ backgroundColor: 'rgba(197,165,90,0.08)' }}>
                      <span style={{ color: '#C5A55A' }}>{getPillarIcon(sdg.pillar)}</span>
                      <span className="font-label text-[10px] font-bold tracking-[0.15em] uppercase" style={{ color: '#C5A55A' }}>
                        Pilar {sdg.pillar}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl mb-4 transition-colors duration-300 group-hover:text-[#C5A55A]" style={{ color: '#2D2D2D' }}>{sdg.title}</h3>
                  <div className="w-10 h-px mb-5 transition-all duration-300 group-hover:w-20" style={{ backgroundColor: 'rgba(197,165,90,0.3)' }}></div>
                  <p className="text-sm leading-relaxed flex-1" style={{ color: '#666' }}>{sdg.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
