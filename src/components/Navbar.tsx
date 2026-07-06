'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);

  // Pages with dark hero images where white text is needed initially
  const darkHeroPages = ['/', '/tentang', '/wisata-event', '/kemitraan'];
  const hasDarkHero = darkHeroPages.includes(pathname);
  const useDarkText = isScrolled || !hasDarkHero;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navMenus = [
    { name: 'Beranda', path: '/' },
    { 
      name: 'Tentang', 
      items: [
        { name: 'Cerita Cibun', path: '/tentang' },
        { name: 'Pilar Program', path: '/program' },
        { name: 'SDGs Desa', path: '/sdgs' },
      ]
    },
    { 
      name: 'Jelajahi', 
      items: [
        { name: 'Wisata & Event', path: '/wisata-event' },
        { name: 'Produk Lokal', path: '/produk-lokal' },
        { name: 'Galeri', path: '/galeri' },
        { name: 'Kabar Desa', path: '/berita' },
      ]
    },
    { name: 'Kontak', path: '/kontak' },
  ];

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-700"
      style={useDarkText ? { backgroundColor: '#FFFFFF', boxShadow: '0 1px 0 rgba(0,0,0,0.06)', padding: '16px 0' } : { padding: '24px 0' }}
    >
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image 
            src="/logo-cibun.png" 
            alt="Logo Kampung Cibun" 
            width={200} 
            height={60} 
            className="w-auto h-8 md:h-10 transition-all duration-700" 
            style={{ filter: useDarkText ? 'none' : 'brightness(0) invert(1)' }}
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10">
          {navMenus.map((menu) => {
            if (menu.path) {
              const isActive = pathname === menu.path;
              return (
                <Link key={menu.name} href={menu.path}
                  className="font-label text-[13px] font-medium tracking-wider uppercase transition-all duration-300"
                  style={{ color: useDarkText ? '#2D2D2D' : '#FFFFFF', opacity: isActive ? 1 : 0.7 }}>
                  {menu.name}
                </Link>
              );
            }

            const isActive = menu.items?.some(i => i.path === pathname);
            return (
              <div key={menu.name} className="relative group">
                <button className="font-label text-[13px] font-medium tracking-wider uppercase transition-all duration-300 flex items-center gap-1"
                  style={{ color: useDarkText ? '#2D2D2D' : '#FFFFFF', opacity: isActive ? 1 : 0.7 }}>
                  {menu.name}
                  <ChevronDown size={12} className="group-hover:rotate-180 transition-transform duration-300" />
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-6 w-56 rounded-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 flex flex-col overflow-hidden"
                  style={{ backgroundColor: '#FFFFFF', boxShadow: '0 20px 60px rgba(0,0,0,0.15)', border: '1px solid rgba(0,0,0,0.05)' }}>
                  {menu.items?.map(sub => (
                    <Link key={sub.name} href={sub.path}
                      className="px-6 py-3.5 text-[13px] font-label tracking-wider transition-all duration-200"
                      style={{ color: pathname === sub.path ? '#2D2D2D' : 'rgba(45,45,45,0.6)', backgroundColor: pathname === sub.path ? '#FAF8F5' : 'transparent', fontWeight: pathname === sub.path ? 600 : 400 }}>
                      {sub.name}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
          <Link href="/kemitraan" className="font-label text-[13px] font-semibold tracking-wider uppercase px-6 py-2.5 transition-all duration-300"
            style={{ border: useDarkText ? '1px solid #2D2D2D' : '1px solid rgba(255,255,255,0.6)', color: useDarkText ? '#2D2D2D' : '#FFFFFF' }}>
            Kemitraan
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button className="lg:hidden p-2 transition-colors" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{ color: useDarkText ? '#2D2D2D' : '#FFFFFF' }}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}
            className="lg:hidden absolute top-full left-0 right-0 max-h-[80vh] overflow-y-auto"
            style={{ backgroundColor: '#FFFFFF', boxShadow: '0 20px 60px rgba(0,0,0,0.1)' }}>
            <div className="flex flex-col py-4">
              {navMenus.map((menu) => {
                if (menu.path) {
                  return (
                    <Link key={menu.name} href={menu.path} onClick={() => setMobileMenuOpen(false)}
                      className="py-4 px-8 font-label text-sm tracking-wider uppercase"
                      style={{ color: pathname === menu.path ? '#2D2D2D' : 'rgba(45,45,45,0.5)', fontWeight: pathname === menu.path ? 600 : 400 }}>
                      {menu.name}
                    </Link>
                  );
                }
                const isOpen = mobileDropdown === menu.name;
                return (
                  <div key={menu.name}>
                    <button onClick={() => setMobileDropdown(isOpen ? null : menu.name)}
                      className="w-full py-4 px-8 flex justify-between items-center font-label text-sm tracking-wider uppercase"
                      style={{ color: 'rgba(45,45,45,0.5)' }}>
                      {menu.name}
                      <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden" style={{ backgroundColor: '#FAF8F5' }}>
                          {menu.items?.map(sub => (
                            <Link key={sub.name} href={sub.path} onClick={() => setMobileMenuOpen(false)}
                              className="block py-3 px-12 font-label text-sm tracking-wider"
                              style={{ color: pathname === sub.path ? '#2D2D2D' : 'rgba(45,45,45,0.4)', fontWeight: pathname === sub.path ? 600 : 400 }}>
                              {sub.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
              <div className="px-8 py-6">
                <Link href="/kemitraan" onClick={() => setMobileMenuOpen(false)}
                  className="block text-center font-label text-sm font-semibold tracking-wider uppercase py-4"
                  style={{ border: '1px solid #2D2D2D', color: '#2D2D2D' }}>
                  Kemitraan
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
