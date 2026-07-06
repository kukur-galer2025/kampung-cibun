'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, ArrowDown, Users, TreePine, Heart } from 'lucide-react';

export default function Home() {
  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } }
  };

  const stagger: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } }
  };

  return (
    <div style={{ backgroundColor: '#FAF8F5' }}>
      {/* ═══════════ HERO ═══════════ */}
      <section className="relative h-screen flex items-end pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/hero.png" alt="Cibun Village" fill className="object-cover" priority />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.35) 100%)' }} />
        </div>

        <div className="container relative z-10">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-3xl">
            <motion.p variants={fadeIn} className="label-sm mb-6" style={{ color: '#C5A55A' }}>
              Grumbul Cibun · Banyumas · Jawa Tengah
            </motion.p>
            <motion.h1 variants={fadeIn} className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal leading-[1.05] mb-8" style={{ color: '#FFFFFF', textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}>
              Menikmati Alam,{' '}
              <em style={{ color: '#C5A55A' }}>Merawat</em>{' '}
              Budaya.
            </motion.h1>
            <motion.p variants={fadeIn} className="text-lg md:text-xl max-w-xl mb-12 leading-relaxed" style={{ color: 'rgba(255,255,255,0.85)' }}>
              Sebuah perjalanan menuju desa wisata berkelanjutan yang memadukan kelestarian alam, tradisi, dan kewirausahaan sosial.
            </motion.p>
            <motion.div variants={fadeIn} className="flex flex-wrap gap-4">
              <Link href="/program" className="inline-flex items-center justify-center font-label font-semibold tracking-wider text-sm uppercase px-8 py-4 transition-all duration-300" style={{ backgroundColor: '#FFFFFF', color: '#2D2D2D' }}>
                Jelajahi <ArrowRight size={16} className="ml-2" />
              </Link>
              <Link href="/tentang" className="inline-flex items-center justify-center font-label font-semibold tracking-wider text-sm uppercase px-8 py-4 transition-all duration-300 border" style={{ borderColor: 'rgba(255,255,255,0.5)', color: '#FFFFFF' }}>
                Cerita Kami
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 8, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
          style={{ color: 'rgba(255,255,255,0.5)' }}
        >
          <ArrowDown size={20} />
        </motion.div>
      </section>

      {/* ═══════════ INTRO SECTION ═══════════ */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
              <motion.p variants={fadeIn} className="label-sm mb-6">Tentang Cibun</motion.p>
              <motion.h2 variants={fadeIn} className="text-4xl md:text-5xl lg:text-6xl mb-8 leading-tight" style={{ color: '#2D2D2D' }}>
                Di Balik Hijau Perbukitan, Ada Cerita yang Hidup.
              </motion.h2>
              <motion.p variants={fadeIn} className="text-lg leading-relaxed mb-10" style={{ color: '#666666' }}>
                Terletak di lereng bukit Sunyalangu, Grumbul Cibun menyimpan kekayaan yang tak ternilai — dari semangat gotong royong warga hingga rimbunnya hutan pinus yang masih perawan. Kami percaya, desa bisa menjadi pusat peradaban berkelanjutan.
              </motion.p>
              <motion.div variants={fadeIn}>
                <Link href="/tentang" className="inline-flex items-center justify-center font-label font-semibold tracking-wider text-sm uppercase px-8 py-4 border transition-all duration-300" style={{ borderColor: '#2D2D2D', color: '#2D2D2D' }}>
                  Selengkapnya <ArrowRight size={16} className="ml-2" />
                </Link>
              </motion.div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }} 
              whileInView={{ opacity: 1, scale: 1 }} 
              viewport={{ once: true }} 
              transition={{ duration: 1 }}
              className="relative"
            >
              <div className="aspect-[3/4] relative rounded-sm overflow-hidden shadow-2xl">
                <Image src="/images/culture.png" alt="Gotong royong warga Cibun" fill className="object-cover" />
              </div>
              <div className="absolute -bottom-8 -left-8 p-8 max-w-xs hidden lg:block" style={{ backgroundColor: '#2D2D2D', color: '#FFFFFF' }}>
                <p className="label-sm mb-3" style={{ color: '#C5A55A' }}>Sejak 2024</p>
                <p className="text-2xl font-normal leading-snug" style={{ fontFamily: 'var(--font-heading)', color: '#FFFFFF' }}>Membangun impian desa bersama warga.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════ PILLARS ═══════════ */}
      <section className="section" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <div className="text-center mb-20">
            <p className="label-sm mb-6">Program Inti</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl max-w-3xl mx-auto leading-tight" style={{ color: '#2D2D2D' }}>
              Tiga Pilar Menuju Desa <em>Berdaulat</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0" style={{ border: '1px solid rgba(0,0,0,0.08)' }}>
            {[
              { 
                title: "Edukasi Warga", 
                sub: "Community Empowerment",
                icon: Users,
                img: "/images/culture.png", 
                desc: "Peningkatan kapasitas SDM desa melalui pelatihan tata kelola pariwisata, literasi digital, dan kesadaran lingkungan." 
              },
              { 
                title: "Socio-Preneurship", 
                sub: "Social Enterprise",
                icon: Heart,
                img: "/images/hero.png", 
                desc: "Membangun kemandirian ekonomi warga melalui pengolahan produk lokal — durian, madu, teh kapulaga — menjadi brand unggulan." 
              },
              { 
                title: "Ekowisata", 
                sub: "Nature-Based Tourism",
                icon: TreePine,
                img: "/images/nature.png", 
                desc: "Menjadikan keindahan alam sebagai daya tarik wisata edukatif yang bertanggung jawab terhadap kelestarian ekosistem." 
              },
            ].map((p, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="group"
                style={{ borderRight: i < 2 ? '1px solid rgba(0,0,0,0.08)' : 'none' }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={p.img} alt={p.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-8 lg:p-10">
                  <div className="flex items-center gap-3 mb-4">
                    <p.icon size={18} style={{ color: '#C5A55A' }} />
                    <span className="font-label text-[11px] font-semibold tracking-[0.15em] uppercase" style={{ color: '#999999' }}>{p.sub}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl mb-4" style={{ color: '#2D2D2D' }}>{p.title}</h3>
                  <p className="leading-relaxed" style={{ color: '#888888' }}>{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-14">
            <Link href="/program" className="inline-flex items-center justify-center font-label font-semibold tracking-wider text-sm uppercase px-8 py-4 border transition-all duration-300" style={{ borderColor: '#2D2D2D', color: '#2D2D2D' }}>
              Semua Program <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════ FULLWIDTH IMAGE BREAK ═══════════ */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <Image src="/images/nature.png" alt="Pemandangan Cibun" fill className="object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%)' }} />
        <div className="absolute inset-0 flex items-center">
          <div className="container">
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.8 }}
              className="max-w-xl"
            >
              <p className="label-sm mb-6" style={{ color: '#C5A55A' }}>Potensi Alam</p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl leading-tight mb-8" style={{ color: '#FFFFFF', textShadow: '0 2px 30px rgba(0,0,0,0.5)' }}>
                Hutan Pinus, Terasering, & Sungai yang Masih Murni.
              </h2>
              <Link href="/wisata-event" className="inline-flex items-center justify-center font-label font-semibold tracking-wider text-sm uppercase px-8 py-4 transition-all duration-300" style={{ backgroundColor: '#FFFFFF', color: '#2D2D2D' }}>
                Lihat Destinasi <ArrowRight size={16} className="ml-2" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════ STATISTICS ═══════════ */}
      <section className="py-20" style={{ backgroundColor: '#2D2D2D' }}>
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { number: "9", label: "SDGs yang Didukung" },
              { number: "7", label: "Pilar Program" },
              { number: "100+", label: "Warga Terlibat" },
              { number: "5", label: "Produk Lokal" },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <p className="text-5xl md:text-6xl mb-3" style={{ fontFamily: 'var(--font-heading)', color: '#C5A55A' }}>{stat.number}</p>
                <p className="font-label text-xs font-semibold tracking-[0.15em] uppercase" style={{ color: 'rgba(255,255,255,0.5)' }}>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CTA SECTION ═══════════ */}
      <section className="section">
        <div className="container text-center max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeIn} className="label-sm mb-6">Kolaborasi</motion.p>
            <motion.h2 variants={fadeIn} className="text-4xl md:text-5xl lg:text-6xl mb-8 leading-tight" style={{ color: '#2D2D2D' }}>
              Mari Menjadi Bagian dari <em>Perjalanan</em> Kami.
            </motion.h2>
            <motion.p variants={fadeIn} className="text-lg mb-12 max-w-2xl mx-auto leading-relaxed" style={{ color: '#888888' }}>
              Kami membuka pintu seluas-luasnya bagi akademisi, dunia usaha, pemerintah, media, dan komunitas untuk bersama membangun Cibun.
            </motion.p>
            <motion.div variants={fadeIn}>
              <Link href="/kemitraan" className="inline-flex items-center justify-center font-label font-semibold tracking-wider text-sm uppercase px-8 py-4 transition-all duration-300" style={{ backgroundColor: '#2D2D2D', color: '#FFFFFF' }}>
                Jalin Kemitraan <ArrowRight size={16} className="ml-2" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
