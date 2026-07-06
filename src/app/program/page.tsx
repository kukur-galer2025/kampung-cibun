'use client';

import { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';

type Program = { id: number; title: string; description: string; icon: string; };

export default function ProgramPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://apikampungcibun.amania.id'}/api/programs`).then(r => r.json()).then(d => setPrograms(d)).catch(console.error).finally(() => setLoading(false));
  }, []);

  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div style={{ backgroundColor: '#FAF8F5' }}>
      {/* Header */}
      <section className="pt-40 pb-20">
        <div className="container text-center max-w-3xl mx-auto">
          <p className="label-sm mb-6">Program Inti</p>
          <h1 className="text-4xl md:text-6xl mb-8 leading-tight" style={{ color: '#2D2D2D' }}>
            Tujuh Pilar <em>Pembangunan</em> Desa Wisata
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: '#888' }}>
            Langkah nyata dalam membangun desa wisata berkelanjutan berbasis komunitas.
          </p>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="pb-36">
        <div className="container">
          {loading ? (
            <div className="text-center py-20" style={{ color: '#999' }}>Memuat program...</div>
          ) : programs.length === 0 ? (
            <div className="text-center py-20" style={{ color: '#999' }}>Data belum tersedia. Pastikan backend berjalan.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0" style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
              {programs.map((prog, i) => (
                <motion.div key={prog.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ delay: (i % 3) * 0.1 }}
                  className="p-10 group transition-colors duration-300 hover:bg-white"
                  style={{ borderRight: (i + 1) % 3 !== 0 ? '1px solid rgba(0,0,0,0.06)' : 'none', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                  <span className="text-4xl block mb-6">{prog.icon}</span>
                  <h3 className="text-2xl mb-4" style={{ color: '#2D2D2D' }}>{prog.title}</h3>
                  <p className="leading-relaxed" style={{ color: '#888' }}>{prog.description}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
