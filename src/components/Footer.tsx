import Link from 'next/link';
import { MapPin, Mail, Phone, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#1A1A1A', color: '#FFFFFF' }}>
      {/* Newsletter strip */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="container py-16 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
          <div>
            <p className="font-label text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: '#C5A55A' }}>Tetap Terhubung</p>
            <h3 className="text-3xl md:text-4xl" style={{ fontFamily: 'var(--font-heading)', color: '#FFFFFF' }}>Dapatkan kabar terbaru dari Cibun.</h3>
          </div>
          <div className="flex w-full lg:w-auto gap-0">
            <input 
              type="email" 
              placeholder="Alamat email Anda" 
              className="px-6 py-4 text-sm font-label tracking-wider w-full lg:w-80 focus:outline-none transition-colors"
              style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF' }}
            />
            <button className="px-8 py-4 font-label text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity shrink-0" style={{ backgroundColor: '#C5A55A', color: '#1A1A1A' }}>
              Kirim
            </button>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2 lg:col-span-4">
            <Link href="/" className="inline-block mb-6">
              <span className="font-label font-black text-3xl tracking-tight text-white block mb-1">CIBUN</span>
              <p className="font-label text-[10px] font-medium tracking-[0.3em] uppercase" style={{ color: 'rgba(255,255,255,0.35)' }}>Kampung Cibun</p>
            </Link>
            <p className="leading-relaxed mb-10 max-w-sm text-[15px]" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Menikmati Alam, Merawat Budaya, Menghidupkan Desa. Sebuah inisiatif desa wisata berkelanjutan di jantung Banyumas.
            </p>
            <div className="flex items-start gap-4 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
              <MapPin size={18} className="shrink-0 mt-0.5" style={{ color: '#C5A55A' }} />
              <p>Grumbul Cibun, Desa Sunyalangu,<br />Kec. Karanglewas, Kab. Banyumas,<br />Jawa Tengah 53161</p>
            </div>
          </div>

          {/* Links Column 1 */}
          <div className="lg:col-span-2">
            <p className="font-label text-[11px] font-semibold tracking-[0.2em] uppercase mb-8" style={{ color: 'rgba(255,255,255,0.25)' }}>Eksplorasi</p>
            <ul className="flex flex-col gap-4">
              {[
                { name: 'Cerita Cibun', path: '/tentang' },
                { name: 'Program', path: '/program' },
                { name: 'SDGs Desa', path: '/sdgs' },
                { name: 'Wisata', path: '/wisata-event' },
                { name: 'Produk Lokal', path: '/produk-lokal' },
              ].map(link => (
                <li key={link.name}>
                  <Link href={link.path} className="hover:opacity-100 transition-opacity text-[15px] inline-flex items-center gap-1 group" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    {link.name}
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="lg:col-span-2">
            <p className="font-label text-[11px] font-semibold tracking-[0.2em] uppercase mb-8" style={{ color: 'rgba(255,255,255,0.25)' }}>Media</p>
            <ul className="flex flex-col gap-4">
              {[
                { name: 'Galeri', path: '/galeri' },
                { name: 'Kabar Desa', path: '/berita' },
                { name: 'Kemitraan', path: '/kemitraan' },
                { name: 'Kontak', path: '/kontak' },
              ].map(link => (
                <li key={link.name}>
                  <Link href={link.path} className="hover:opacity-100 transition-opacity text-[15px] inline-flex items-center gap-1 group" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    {link.name}
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <p className="font-label text-[11px] font-semibold tracking-[0.2em] uppercase mb-8" style={{ color: 'rgba(255,255,255,0.25)' }}>Hubungi</p>
            <div className="space-y-6">
              <a href="tel:+6281234567890" className="flex items-center gap-4 hover:opacity-100 transition-opacity group" style={{ color: 'rgba(255,255,255,0.55)' }}>
                <div className="w-10 h-10 flex items-center justify-center transition-colors" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                  <Phone size={16} />
                </div>
                <span className="text-[15px]">+62 812-3456-7890</span>
              </a>
              <a href="mailto:halo@cibuntourism.id" className="flex items-center gap-4 hover:opacity-100 transition-opacity group" style={{ color: 'rgba(255,255,255,0.55)' }}>
                <div className="w-10 h-10 flex items-center justify-center transition-colors" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                  <Mail size={16} />
                </div>
                <span className="text-[15px]">halo@cibuntourism.id</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-label tracking-wider" style={{ color: 'rgba(255,255,255,0.2)' }}>
            &copy; {new Date().getFullYear()} Kampung Cibun. Hak Cipta Dilindungi.
          </p>
          <div className="flex gap-8 text-xs font-label tracking-wider" style={{ color: 'rgba(255,255,255,0.2)' }}>
            <Link href="/admin" className="hover:opacity-100 transition-opacity">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
