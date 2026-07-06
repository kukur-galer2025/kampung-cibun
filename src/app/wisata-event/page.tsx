'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';

type Event = { id: number; title: string; date: string; focus: string[]; image_url?: string; };

export default function WisataEvent() {
  const [events, setEvents] = useState<Event[]>([]);
  useEffect(() => { fetch('http://localhost:8000/api/events').then(r => r.json()).then(d => setEvents(d)).catch(console.error); }, []);

  const fadeIn: Variants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

  return (
    <div style={{ backgroundColor: '#FAF8F5' }}>
      {/* Hero */}
      <section className="relative h-[50vh] md:h-[60vh] flex items-end pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/nature.png" alt="Wisata Cibun" fill className="object-cover" priority />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.2) 100%)' }} />
        </div>
        <div className="container relative z-10">
          <p className="label-sm mb-4" style={{ color: '#C5A55A' }}>Wisata & Event</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl max-w-3xl" style={{ color: '#FFFFFF', textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}>
            Agenda & <em>Destinasi</em> Wisata
          </h1>
        </div>
      </section>

      {/* Events List */}
      <section className="section">
        <div className="container max-w-4xl mx-auto">
          {events.length === 0 ? (
            <p className="text-center py-20" style={{ color: '#999' }}>Memuat event...</p>
          ) : (
            <div className="space-y-0" style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
              {events.map((ev, i) => (
                <motion.div key={ev.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ delay: i * 0.1 }}
                  className="p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start group transition-colors hover:bg-white"
                  style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                  
                  {ev.image_url ? (
                    <div className="shrink-0 w-32 md:w-48 aspect-square relative" style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={`http://localhost:8000${ev.image_url}`} alt={ev.title} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="shrink-0 w-28 text-center p-4" style={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(0,0,0,0.06)' }}>
                      <Calendar size={20} className="mx-auto mb-2" style={{ color: '#C5A55A' }} />
                      <p className="font-label text-xs font-semibold" style={{ color: '#2D2D2D' }}>{ev.date}</p>
                    </div>
                  )}

                  <div className="flex-1">
                    {ev.image_url && <p className="font-label text-[11px] font-semibold tracking-wider uppercase mb-2" style={{ color: '#C5A55A' }}>{ev.date}</p>}
                    <h3 className="text-2xl mb-3" style={{ color: '#2D2D2D' }}>{ev.title}</h3>
                    <div className="flex items-center gap-2 mb-4">
                      <MapPin size={14} style={{ color: '#C5A55A' }} />
                      <span className="text-sm" style={{ color: '#999' }}>Grumbul Cibun, Sunyalangu</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(ev.focus) && ev.focus.map((f, idx) => (
                        <span key={idx} className="px-3 py-1 text-xs font-label tracking-wider" style={{ backgroundColor: 'rgba(197,165,90,0.1)', color: '#C5A55A' }}>{f}</span>
                      ))}
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
