'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, X, Save } from 'lucide-react';
import ImageUploader from '@/components/ImageUploader';
import { adminSave, adminDelete, imgUrl } from '@/lib/admin';
import ConfirmModal from '@/components/ConfirmModal';

type Event = { id: number; title: string; date: string; focus: string[]; image_url?: string; };

export default function EventsAdmin() {
  const [items, setItems] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [current, setCurrent] = useState<Partial<Event>>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [focusInput, setFocusInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const fetchData = async () => { try { setItems(await (await fetch('http://localhost:8000/api/events')).json()); } catch {} finally { setLoading(false); } };
  useEffect(() => { fetchData(); }, []);

  const onFileChange = (f: File | null) => { setImageFile(f); if (f) { const r = new FileReader(); r.onloadend = () => setPreview(r.result as string); r.readAsDataURL(f); } };
  const openAdd = () => { setIsEditing(true); setCurrent({}); setImageFile(null); setPreview(null); setFocusInput(''); setError(''); };
  const openEdit = (e: Event) => { setIsEditing(true); setCurrent(e); setImageFile(null); setPreview(imgUrl(e.image_url)); setFocusInput(''); setError(''); };
  const addFocus = () => { if (!focusInput.trim()) return; setCurrent({ ...current, focus: [...(current.focus || []), focusInput.trim()] }); setFocusInput(''); };
  const removeFocus = (i: number) => setCurrent({ ...current, focus: (current.focus || []).filter((_, idx) => idx !== i) });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true); setError('');
    const { image_url, id, ...data } = current as Event;
    const res = await adminSave('events', data, imageFile, current.id);
    if (!res.ok) { setError(res.error || ''); setSaving(false); return; }
    setIsEditing(false); fetchData(); setSaving(false);
  };
  
  const confirmDelete = async () => {
    if (!deleteId) return;
    await adminDelete('events', deleteId);
    setDeleteId(null);
    fetchData();
  };

  if (loading) return <div className="flex justify-center p-12"><div className="w-8 h-8 rounded-full animate-spin" style={{ border: '3px solid rgba(0,0,0,0.06)', borderTopColor: '#C5A55A' }}></div></div>;

  return (
    <div>
      <div className="flex justify-between items-end mb-10">
        <div><h1 className="text-3xl mb-2" style={{ fontFamily: 'var(--font-heading)', color: '#2D2D2D' }}>Events</h1><p className="text-sm" style={{ color: '#999' }}>Kelola agenda wisata desa.</p></div>
        <button onClick={openAdd} className="flex items-center gap-2 font-label text-sm font-semibold tracking-wider px-5 py-3 transition-colors" style={{ backgroundColor: '#2D2D2D', color: '#FFFFFF' }}><Plus size={16} /> Tambah</button>
      </div>
      {isEditing ? (
        <div className="p-8 mb-8" style={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(0,0,0,0.06)' }}>
          <div className="flex justify-between items-center mb-8"><h2 className="text-xl font-label font-semibold" style={{ color: '#2D2D2D' }}>{current.id ? 'Edit' : 'Tambah'} Event</h2><button onClick={() => setIsEditing(false)} className="p-2 transition-colors hover:text-black" style={{ color: '#999' }}><X size={18} /></button></div>
          {error && <div className="p-4 mb-6 text-sm" style={{ backgroundColor: 'rgba(204,68,68,0.05)', color: '#cc4444' }}>{error}</div>}
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div><label className="block font-label text-xs font-semibold tracking-wider uppercase mb-3" style={{ color: '#999' }}>Judul</label><input type="text" value={current.title || ''} onChange={e => setCurrent({...current, title: e.target.value})} required className="w-full px-5 py-4 text-sm focus:outline-none" style={{ backgroundColor: '#FAF8F5', border: '1px solid rgba(0,0,0,0.08)', color: '#2D2D2D' }} /></div>
              <div><label className="block font-label text-xs font-semibold tracking-wider uppercase mb-3" style={{ color: '#999' }}>Tanggal</label><input type="text" value={current.date || ''} onChange={e => setCurrent({...current, date: e.target.value})} required placeholder="Agustus 2026" className="w-full px-5 py-4 text-sm focus:outline-none" style={{ backgroundColor: '#FAF8F5', border: '1px solid rgba(0,0,0,0.08)', color: '#2D2D2D' }} /></div>
            </div>
            <div>
              <label className="block font-label text-xs font-semibold tracking-wider uppercase mb-3" style={{ color: '#999' }}>Fokus Kegiatan</label>
              <div className="flex gap-2 mb-3"><input type="text" value={focusInput} onChange={e => setFocusInput(e.target.value)} placeholder="Tambah lalu klik +" onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addFocus(); } }} className="flex-1 px-5 py-4 text-sm focus:outline-none" style={{ backgroundColor: '#FAF8F5', border: '1px solid rgba(0,0,0,0.08)', color: '#2D2D2D' }} /><button type="button" onClick={addFocus} className="px-4 py-4 font-label font-semibold transition-colors" style={{ backgroundColor: '#2D2D2D', color: '#FFFFFF' }}>+</button></div>
              <div className="flex flex-wrap gap-2">{(current.focus || []).map((f, i) => (<span key={i} className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-label" style={{ backgroundColor: 'rgba(197,165,90,0.1)', color: '#C5A55A' }}>{f} <button type="button" onClick={() => removeFocus(i)} className="hover:text-black"><X size={12} /></button></span>))}</div>
            </div>
            <ImageUploader preview={preview} onFileChange={onFileChange} onClear={() => { setImageFile(null); setPreview(null); }} />
            <div className="flex gap-4 pt-4" style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
              <button type="submit" disabled={saving} className="flex items-center gap-2 font-label text-sm font-semibold tracking-wider px-6 py-3 disabled:opacity-50 transition-colors" style={{ backgroundColor: '#2D2D2D', color: '#FFFFFF' }}><Save size={16} /> {saving ? 'Menyimpan...' : 'Simpan'}</button>
              <button type="button" onClick={() => setIsEditing(false)} className="font-label text-sm font-semibold tracking-wider px-6 py-3 transition-colors" style={{ backgroundColor: '#FAF8F5', color: '#666' }}>Batal</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="overflow-hidden" style={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(0,0,0,0.06)' }}>
          <table className="w-full text-left border-collapse"><thead><tr style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
            <th className="px-6 py-4 font-label text-[11px] font-semibold tracking-[0.15em] uppercase w-20" style={{ color: '#999' }}>Foto</th>
            <th className="px-6 py-4 font-label text-[11px] font-semibold tracking-[0.15em] uppercase" style={{ color: '#999' }}>Detail</th>
            <th className="px-6 py-4 font-label text-[11px] font-semibold tracking-[0.15em] uppercase w-28" style={{ color: '#999' }}>Tanggal</th>
            <th className="px-6 py-4 font-label text-[11px] font-semibold tracking-[0.15em] uppercase text-right w-28" style={{ color: '#999' }}>Aksi</th>
          </tr></thead><tbody>
            {items.map(ev => (
              <tr key={ev.id} className="hover:bg-[#FAF8F5] transition-colors" style={{ borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
                <td className="px-6 py-4">{ev.image_url ? <img src={imgUrl(ev.image_url)!} alt="" className="w-14 h-14 object-cover rounded-sm" /> : <div className="w-14 h-14 flex items-center justify-center" style={{ backgroundColor: '#F0F0F0' }}>📅</div>}</td>
                <td className="px-6 py-4"><p className="font-semibold text-sm font-label mb-1" style={{ color: '#2D2D2D' }}>{ev.title}</p><div className="flex flex-wrap gap-1">{Array.isArray(ev.focus) && ev.focus.slice(0,3).map((f,i) => <span key={i} className="text-[11px] px-2 py-0.5 font-label" style={{ backgroundColor: 'rgba(197,165,90,0.08)', color: '#C5A55A' }}>{f}</span>)}</div></td>
                <td className="px-6 py-4 text-sm font-label" style={{ color: '#666' }}>{ev.date}</td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button onClick={() => openEdit(ev)} className="inline-flex items-center justify-center w-8 h-8 transition-colors" style={{ backgroundColor: 'rgba(59,130,246,0.08)', color: '#3B82F6' }}><Edit2 size={14} /></button>
                  <button onClick={() => setDeleteId(ev.id)} className="inline-flex items-center justify-center w-8 h-8 transition-colors" style={{ backgroundColor: 'rgba(239,68,68,0.08)', color: '#EF4444' }}><Trash2 size={14} /></button>
                </td>
              </tr>
            ))}
            {items.length === 0 && <tr><td colSpan={4} className="text-center py-12 text-sm text-gray-400">Belum ada data event.</td></tr>}
          </tbody></table>
        </div>
      )}
      <ConfirmModal 
        isOpen={deleteId !== null} 
        title="Hapus Event" 
        message="Apakah Anda yakin ingin menghapus agenda wisata ini? Tindakan ini tidak dapat dibatalkan."
        confirmText="Ya, Hapus"
        onConfirm={confirmDelete} 
        onCancel={() => setDeleteId(null)} 
      />
    </div>
  );
}
