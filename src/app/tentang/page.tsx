'use client';

import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { Target, Lightbulb, Users, MapPin } from 'lucide-react';

export default function Tentang() {
  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } }
  };
  const stagger: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <div style={{ backgroundColor: '#FAF8F5' }}>
      {/* Hero Banner */}
      <section className="relative h-[50vh] md:h-[60vh] flex items-end pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/culture.png" alt="Tentang Cibun" fill className="object-cover" priority />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.2) 100%)' }} />
        </div>
        <div className="container relative z-10">
          <p className="label-sm mb-4" style={{ color: '#C5A55A' }}>Tentang Kami</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl max-w-3xl" style={{ color: '#FFFFFF', textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}>
            Cerita di Balik <em>Grumbul Cibun</em>
          </h1>
        </div>
      </section>

      {/* Story Section */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <motion.p variants={fadeIn} className="label-sm mb-6">Asal Usul</motion.p>
              <motion.h2 variants={fadeIn} className="text-3xl md:text-5xl mb-8 leading-tight" style={{ color: '#2D2D2D' }}>
                Dari Desa Terpencil Menuju Destinasi <em>Berkelanjutan</em>
              </motion.h2>
              <motion.p variants={fadeIn} className="text-lg leading-relaxed mb-6" style={{ color: '#666' }}>
                Terletak di lereng perbukitan yang hijau, Grumbul Cibun, Desa Sunyalangu, menyimpan pesona yang lama tersembunyi. Lebih dari sekadar bentang alam, kekuatan sejati Cibun terletak pada semangat komunal masyarakatnya yang tak pernah padam.
              </motion.p>
              <motion.p variants={fadeIn} className="text-lg leading-relaxed" style={{ color: '#666' }}>
                Melalui Kampung Cibun & Socio-Preneurship Program, kami merangkai kembali potensi-potensi tersembunyi ini menjadi sebuah ekosistem wisata yang memberdayakan, melestarikan, dan menginspirasi.
              </motion.p>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                { icon: Lightbulb, title: 'Visi', desc: 'Menjadi desa wisata unggulan yang mandiri, berbudaya, dan berwawasan lingkungan di tingkat nasional.' },
                { icon: Target, title: 'Misi', desc: 'Memberdayakan warga melalui edukasi, kewirausahaan sosial, dan pariwisata berkelanjutan.' },
                { icon: Users, title: 'Nilai', desc: 'Gotong royong, kemandirian, kearifan lokal, dan harmoni dengan alam.' },
                { icon: MapPin, title: 'Lokasi', desc: 'Grumbul Cibun, Desa Sunyalangu, Kec. Karanglewas, Kab. Banyumas, Jawa Tengah.' },
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="p-8" style={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(0,0,0,0.06)' }}>
                  <item.icon size={24} style={{ color: '#C5A55A' }} className="mb-5" />
                  <h3 className="text-xl mb-3" style={{ color: '#2D2D2D' }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#888' }}>{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
