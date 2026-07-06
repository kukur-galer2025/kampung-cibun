'use client';

import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { Handshake, GraduationCap, Building2, Landmark, HeartHandshake, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Kemitraan() {
  const fadeIn: Variants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
  const stagger: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } };

  const schemes = [
    { title: "Pentahelix", sub: "Multi-Stakeholder", icon: Handshake, desc: "Sinergi antara akademisi, bisnis, komunitas, pemerintah, dan media untuk dampak kolektif." },
    { title: "Akademisi", sub: "Research & Education", icon: GraduationCap, desc: "Riset desa wisata, KKN Tematik, pengabdian masyarakat, dan magang mahasiswa." },
    { title: "CSR & Bisnis", sub: "Corporate Partners", icon: Building2, desc: "Program CSR bina lingkungan, sponsorship event, dan pengembangan produk lokal." },
    { title: "Pemerintah", sub: "Government Support", icon: Landmark, desc: "Sinergi program pembangunan desa dari tingkat desa hingga kementerian." },
    { title: "Relawan", sub: "Volunteer Network", icon: HeartHandshake, desc: "Bagi yang ingin turun langsung membantu mewujudkan desa wisata berkelanjutan." },
  ];

  return (
    <div style={{ backgroundColor: '#FAF8F5' }}>
      {/* Hero */}
      <section className="relative h-[50vh] md:h-[60vh] flex items-end pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/hero.png" alt="Kemitraan" fill className="object-cover" priority />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.2) 100%)' }} />
        </div>
        <div className="container relative z-10">
          <p className="label-sm mb-4" style={{ color: '#C5A55A' }}>Kolaborasi</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl max-w-3xl" style={{ color: '#FFFFFF', textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}>
            Peluang <em>Kemitraan</em>
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="section">
        <div className="container max-w-3xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeIn} className="text-3xl md:text-5xl mb-8 leading-tight" style={{ color: '#2D2D2D' }}>
              Mari Berkolaborasi Membangun <em>Dampak Positif</em>
            </motion.h2>
            <motion.p variants={fadeIn} className="text-lg leading-relaxed" style={{ color: '#888' }}>
              Kami membuka pintu seluas-luasnya untuk berbagai bentuk kerja sama dalam mengembangkan Grumbul Cibun sebagai desa wisata model berkelanjutan.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Schemes */}
      <section className="pb-36">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {schemes.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-10 transition-all duration-300 hover:shadow-lg" style={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(0,0,0,0.06)' }}>
                <s.icon size={28} style={{ color: '#C5A55A' }} className="mb-6" />
                <p className="font-label text-[10px] font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: '#999' }}>{s.sub}</p>
                <h3 className="text-2xl mb-4" style={{ color: '#2D2D2D' }}>{s.title}</h3>
                <p className="text-sm leading-relaxed mb-8" style={{ color: '#888' }}>{s.desc}</p>
                <Link href="/kontak" className="inline-flex items-center gap-2 font-label text-sm font-semibold tracking-wider uppercase" style={{ color: '#2D2D2D' }}>
                  Hubungi <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
