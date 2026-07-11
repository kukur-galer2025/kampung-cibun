'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar } from 'lucide-react';

type News = { id: number; title: string; category: string; date: string; excerpt: string; content: string; image_url?: string; };

export default function NewsDetail() {
  const params = useParams();
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://apikampungcibun.amania.id'}/api/news/${params.id}`).then(r => r.json()).then(d => setNews(d)).catch(console.error).finally(() => setLoading(false));
  }, [params.id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FAF8F5' }}><div className="w-8 h-8 rounded-full animate-spin" style={{ border: '3px solid rgba(0,0,0,0.06)', borderTopColor: '#C5A55A' }}></div></div>;
  if (!news) return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FAF8F5' }}><p style={{ color: '#999' }}>Berita tidak ditemukan.</p></div>;

  return (
    <div style={{ backgroundColor: '#FAF8F5' }}>
      {/* Hero */}
      {news.image_url && (
        <section className="relative h-[40vh] md:h-[50vh] overflow-hidden">
          <img src={`${process.env.NEXT_PUBLIC_API_URL || 'https://apikampungcibun.amania.id'}${news.image_url}`} alt={news.title} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)' }} />
        </section>
      )}

      {/* Content */}
      <article className={`${news.image_url ? '-mt-20 relative z-10' : 'pt-40'}`}>
        <div className="container max-w-3xl mx-auto">
          <div className="p-8 md:p-12 mb-12" style={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(0,0,0,0.06)' }}>
            {/* Meta */}
            <div className="flex items-center gap-4 mb-6 flex-wrap">
              <span className="text-[11px] px-3 py-1 font-label font-semibold tracking-wider uppercase" style={{ backgroundColor: 'rgba(197,165,90,0.1)', color: '#C5A55A' }}>{news.category}</span>
              <div className="flex items-center gap-2">
                <Calendar size={14} style={{ color: '#999' }} />
                <span className="text-sm font-label" style={{ color: '#999' }}>{news.date}</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl mb-8 leading-tight" style={{ color: '#2D2D2D' }}>{news.title}</h1>

            {/* Excerpt */}
            <p className="text-lg leading-relaxed mb-10 pb-10" style={{ color: '#888', borderBottom: '1px solid rgba(0,0,0,0.06)' }} dangerouslySetInnerHTML={{ __html: news.excerpt }}></p>

            {/* Rich Content */}
            <div className="prose prose-lg max-w-none" style={{ color: '#444' }}
              dangerouslySetInnerHTML={{ __html: news.content }} />
          </div>

          {/* Back */}
          <div className="pb-20">
            <Link href="/berita" className="inline-flex items-center gap-2 font-label text-sm font-semibold tracking-wider uppercase transition-colors" style={{ color: '#2D2D2D' }}>
              <ArrowLeft size={16} /> Kembali ke Kabar Desa
            </Link>
          </div>
        </div>
      </article>

      {/* Style for rich content */}
      <style jsx global>{`
        .prose h1, .prose h2, .prose h3 { font-family: var(--font-heading); color: #2D2D2D; margin-top: 2em; margin-bottom: 0.8em; }
        .prose h2 { font-size: 1.75rem; }
        .prose h3 { font-size: 1.35rem; }
        .prose p { margin-bottom: 1.2em; line-height: 1.8; }
        .prose ul, .prose ol { margin-bottom: 1.2em; padding-left: 1.5em; }
        .prose li { margin-bottom: 0.4em; }
        .prose blockquote { border-left: 3px solid #C5A55A; padding-left: 1.5em; margin: 1.5em 0; font-style: italic; color: #666; }
        .prose a { color: #C5A55A; text-decoration: underline; }
        .prose img { max-width: 100%; border-radius: 2px; margin: 1.5em 0; }
        .prose strong { color: #2D2D2D; }
      `}</style>
    </div>
  );
}
