'use client';

import { useEffect, useState, useRef } from 'react';
import { Plus, Edit2, Trash2, X, Save, Smile } from 'lucide-react';
import { adminSave, adminDelete } from '@/lib/admin';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import ConfirmModal from '@/components/ConfirmModal';

type Program = { id: number; title: string; description: string; icon: string; };

export default function ProgramsAdmin() {
  const [items, setItems] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [current, setCurrent] = useState<Partial<Program>>({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const pickerRef = useRef<HTMLDivElement>(null);

  const fetchData = async () => { try { setItems(await (await fetch('http://localhost:8000/api/programs')).json()); } catch {} finally { setLoading(false); } };
  useEffect(() => { fetchData(); }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setShowPicker(false);
      }
    }
    if (showPicker) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showPicker]);

  const openAdd = () => { setIsEditing(true); setCurrent({}); setError(''); setShowPicker(false); };
  const openEdit = (p: Program) => { setIsEditing(true); setCurrent(p); setError(''); setShowPicker(false); };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true); setError('');
    const res = await adminSave('programs', current, null, current.id);
    if (!res.ok) { setError(res.error || ''); setSaving(false); return; }
    setIsEditing(false); fetchData(); setSaving(false);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    await adminDelete('programs', deleteId);
    setDeleteId(null);
    fetchData();
  };

  const onEmojiClick = (emojiData: EmojiClickData) => {
    setCurrent({ ...current, icon: emojiData.emoji });
    setShowPicker(false);
  };

  if (loading) return <div className="flex justify-center p-12"><div className="w-8 h-8 rounded-full animate-spin" style={{ border: '3px solid rgba(0,0,0,0.06)', borderTopColor: '#C5A55A' }}></div></div>;

  return (
    <div>
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl mb-2" style={{ fontFamily: 'var(--font-heading)', color: '#2D2D2D' }}>Programs</h1>
          <p className="text-sm" style={{ color: '#999' }}>Kelola pilar program desa.</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 font-label text-sm font-semibold tracking-wider px-5 py-3 transition-colors" style={{ backgroundColor: '#2D2D2D', color: '#FFFFFF' }}><Plus size={16} /> Tambah</button>
      </div>

      {isEditing ? (
        <div className="p-8 mb-8" style={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(0,0,0,0.06)' }}>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-label font-semibold" style={{ color: '#2D2D2D' }}>{current.id ? 'Edit' : 'Tambah'} Program</h2>
            <button onClick={() => setIsEditing(false)} className="p-2 transition-colors hover:text-black" style={{ color: '#999' }}><X size={18} /></button>
          </div>
          
          {error && <div className="p-4 mb-6 text-sm" style={{ backgroundColor: 'rgba(204,68,68,0.05)', color: '#cc4444', border: '1px solid rgba(204,68,68,0.1)' }}>{error}</div>}
          
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-label text-xs font-semibold tracking-wider uppercase mb-3" style={{ color: '#999' }}>Judul</label>
                <input type="text" value={current.title || ''} onChange={e => setCurrent({...current, title: e.target.value})} required className="w-full px-5 py-4 text-sm focus:outline-none" style={{ backgroundColor: '#FAF8F5', border: '1px solid rgba(0,0,0,0.08)', color: '#2D2D2D' }} />
              </div>
              <div className="relative">
                <label className="block font-label text-xs font-semibold tracking-wider uppercase mb-3" style={{ color: '#999' }}>Ikon (Emoji)</label>
                <div className="flex gap-2">
                  <input type="text" value={current.icon || ''} onChange={e => setCurrent({...current, icon: e.target.value})} required placeholder="📚" className="flex-1 px-5 py-4 text-sm focus:outline-none" style={{ backgroundColor: '#FAF8F5', border: '1px solid rgba(0,0,0,0.08)', color: '#2D2D2D' }} />
                  <button type="button" onClick={() => setShowPicker(!showPicker)} className="px-5 transition-colors" style={{ backgroundColor: '#FAF8F5', border: '1px solid rgba(0,0,0,0.08)', color: '#666' }} title="Pilih Ikon">
                    <Smile size={18} />
                  </button>
                </div>
                {showPicker && (
                  <div ref={pickerRef} className="absolute top-full right-0 mt-2 z-20 shadow-xl">
                    <EmojiPicker onEmojiClick={onEmojiClick} autoFocusSearch={false} />
                  </div>
                )}
              </div>
            </div>
            <div>
              <label className="block font-label text-xs font-semibold tracking-wider uppercase mb-3" style={{ color: '#999' }}>Deskripsi</label>
              <textarea value={current.description || ''} onChange={e => setCurrent({...current, description: e.target.value})} required rows={4} className="w-full px-5 py-4 text-sm focus:outline-none resize-none" style={{ backgroundColor: '#FAF8F5', border: '1px solid rgba(0,0,0,0.08)', color: '#2D2D2D' }} />
            </div>
            <div className="flex gap-4 pt-4" style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
              <button type="submit" disabled={saving} className="flex items-center gap-2 font-label text-sm font-semibold tracking-wider px-6 py-3 disabled:opacity-50 transition-colors" style={{ backgroundColor: '#2D2D2D', color: '#FFFFFF' }}><Save size={16} /> {saving ? 'Menyimpan...' : 'Simpan'}</button>
              <button type="button" onClick={() => setIsEditing(false)} className="font-label text-sm font-semibold tracking-wider px-6 py-3 transition-colors" style={{ backgroundColor: '#FAF8F5', color: '#666' }}>Batal</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="overflow-hidden" style={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(0,0,0,0.06)' }}>
          <table className="w-full text-left border-collapse"><thead><tr style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
            <th className="px-6 py-4 font-label text-[11px] font-semibold tracking-[0.15em] uppercase w-20 text-center" style={{ color: '#999' }}>Ikon</th>
            <th className="px-6 py-4 font-label text-[11px] font-semibold tracking-[0.15em] uppercase" style={{ color: '#999' }}>Detail</th>
            <th className="px-6 py-4 font-label text-[11px] font-semibold tracking-[0.15em] uppercase text-right w-28" style={{ color: '#999' }}>Aksi</th>
          </tr></thead><tbody>
            {items.map(p => (
              <tr key={p.id} className="transition-colors hover:bg-[#FAF8F5]" style={{ borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
                <td className="px-6 py-4 text-center"><span className="text-3xl">{p.icon}</span></td>
                <td className="px-6 py-4"><p className="font-semibold text-sm font-label mb-1" style={{ color: '#2D2D2D' }}>{p.title}</p><p className="text-sm line-clamp-1" style={{ color: '#999' }}>{p.description}</p></td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button onClick={() => openEdit(p)} className="inline-flex items-center justify-center w-8 h-8 transition-colors" style={{ backgroundColor: 'rgba(59,130,246,0.08)', color: '#3B82F6' }}><Edit2 size={14} /></button>
                  <button onClick={() => setDeleteId(p.id)} className="inline-flex items-center justify-center w-8 h-8 transition-colors" style={{ backgroundColor: 'rgba(239,68,68,0.08)', color: '#EF4444' }}><Trash2 size={14} /></button>
                </td>
              </tr>
            ))}
            {items.length === 0 && <tr><td colSpan={3} className="text-center py-12 text-sm text-gray-400">Belum ada data program.</td></tr>}
          </tbody></table>
        </div>
      )}

      <ConfirmModal 
        isOpen={deleteId !== null} 
        title="Hapus Program" 
        message="Apakah Anda yakin ingin menghapus program ini? Tindakan ini tidak dapat dibatalkan."
        confirmText="Ya, Hapus"
        onConfirm={confirmDelete} 
        onCancel={() => setDeleteId(null)} 
      />
    </div>
  );
}
