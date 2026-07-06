'use client';

import { motion, Variants } from 'framer-motion';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Kontak() {
  const fadeIn: Variants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
  const stagger: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } };

  return (
    <div style={{ backgroundColor: '#FAF8F5' }}>
      <section className="pt-40 pb-20">
        <div className="container text-center max-w-3xl mx-auto">
          <p className="label-sm mb-6">Kontak</p>
          <h1 className="text-4xl md:text-6xl mb-8 leading-tight" style={{ color: '#2D2D2D' }}>
            Hubungi <em>Kami</em>
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: '#888' }}>
            Punya pertanyaan, ide, atau ingin berkolaborasi? Kami siap mendengar.
          </p>
        </div>
      </section>

      <section className="pb-36">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div variants={fadeIn} className="p-10 md:p-14 text-center border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl" style={{ borderColor: 'rgba(0,0,0,0.06)', backgroundColor: '#FFFFFF' }}>
              <MapPin size={36} className="mx-auto mb-8" style={{ color: '#C5A55A', strokeWidth: 1.5 }} />
              <h3 className="font-label text-sm font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: '#2D2D2D' }}>Alamat</h3>
              <p className="leading-relaxed text-[15px]" style={{ color: '#666' }}>
                Grumbul Cibun, Desa Sunyalangu,<br/>
                Kec. Karanglewas, Kab. Banyumas,<br/>
                Jawa Tengah
              </p>
            </motion.div>
            
            <motion.div variants={fadeIn} className="p-10 md:p-14 text-center border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl" style={{ borderColor: 'rgba(0,0,0,0.06)', backgroundColor: '#FFFFFF' }}>
              <Phone size={36} className="mx-auto mb-8" style={{ color: '#C5A55A', strokeWidth: 1.5 }} />
              <h3 className="font-label text-sm font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: '#2D2D2D' }}>Telepon</h3>
              <p className="leading-relaxed text-[15px]" style={{ color: '#666' }}>
                +62 812-3456-7890<br/>
                <span className="text-sm italic mt-2 inline-block" style={{ color: '#999' }}>*Tersedia via WhatsApp</span>
              </p>
            </motion.div>
            
            <motion.div variants={fadeIn} className="p-10 md:p-14 text-center border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl" style={{ borderColor: 'rgba(0,0,0,0.06)', backgroundColor: '#FFFFFF' }}>
              <Mail size={36} className="mx-auto mb-8" style={{ color: '#C5A55A', strokeWidth: 1.5 }} />
              <h3 className="font-label text-sm font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: '#2D2D2D' }}>Email</h3>
              <p className="leading-relaxed text-[15px]" style={{ color: '#666' }}>
                halo@cibuntourism.id<br/>
                <span className="text-sm italic mt-2 inline-block" style={{ color: '#999' }}>*Akan dibalas dalam 1x24 jam</span>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
