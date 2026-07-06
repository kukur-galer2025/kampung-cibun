'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, X, Save } from 'lucide-react';
import ImageUploader from '@/components/ImageUploader';
import { adminSave, adminDelete, imgUrl } from '@/lib/admin';
import ConfirmModal from '@/components/ConfirmModal';

type Product = { id: number; name: string; description: string; features: string[]; image_url?: string; };

export default function ProductsAdmin() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [current, setCurrent] = useState<Partial<Product>>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [featureInput, setFeatureInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const fetchData = async () => { try { setItems(await (await fetch('http://localhost:8000/api/products')).json()); } catch {} finally { setLoading(false); } };
  useEffect(() => { fetchData(); }, []);

  const onFileChange = (f: File | null) => { setImageFile(f); if (f) { const r = new FileReader(); r.onloadend = () => setPreview(r.result as string); r.readAsDataURL(f); } };
  const openAdd = () => { setIsEditing(true); setCurrent({}); setImageFile(null); setPreview(null); setFeatureInput(''); setError(''); };
  const openEdit = (p: Product) => { setIsEditing(true); setCurrent(p); setImageFile(null); setPreview(imgUrl(p.image_url)); setFeatureInput(''); setError(''); };
  const addFeature = () => { if (!featureInput.trim()) return; setCurrent({ ...current, features: [...(current.features || []), featureInput.trim()] }); setFeatureInput(''); };
  const removeFeature = (i: number) => setCurrent({ ...current, features: (current.features || []).filter((_, idx) => idx !== i) });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true); setError('');
    const { image_url, id, ...data } = current as Product;
    const res = await adminSave('products', data, imageFile, current.id);
    if (!res.ok) { setError(res.error || ''); setSaving(false); return; }
    setIsEditing(false); fetchData(); setSaving(false);
  };
  
  const confirmDelete = async () => {
    if (!deleteId) return;
    await adminDelete('products', deleteId);
    setDeleteId(null);
    fetchData();
  };

  if (loading) return <div className="flex justify-center p-12"><div className="w-8 h-8 rounded-full animate-spin" style={{ border: '3px solid rgba(0,0,0,0.06)', borderTopColor: '#C5A55A' }}></div></div>;

  return (
    <div>
      <div className="flex justify-between items-end mb-10">
        <div><h1 className="text-3xl mb-2" style={{ fontFamily: 'var(--font-heading)', color: '#2D2D2D' }}>Products</h1><p className="text-sm" style={{ color: '#999' }}>Kelola produk UMKM lokal.</p></div>
        <button onClick={openAdd} className="flex items-center gap-2 font-label text-sm font-semibold tracking-wider px-5 py-3 transition-colors" style={{ backgroundColor: '#2D2D2D', color: '#FFFFFF' }}><Plus size={16} /> Tambah</button>
      </div>
      {isEditing ? (
        <div className="p-8 mb-8" style={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(0,0,0,0.06)' }}>
          <div className="flex justify-between items-center mb-8"><h2 className="text-xl font-label font-semibold" style={{ color: '#2D2D2D' }}>{current.id ? 'Edit' : 'Tambah'} Produk</h2><button onClick={() => setIsEditing(false)} className="p-2 transition-colors hover:text-black" style={{ color: '#999' }}><X size={18} /></button></div>
          {error && <div className="p-4 mb-6 text-sm" style={{ backgroundColor: 'rgba(204,68,68,0.05)', color: '#cc4444' }}>{error}</div>}
          <form onSubmit={handleSave} className="space-y-6">
            <div><label className="block font-label text-xs font-semibold tracking-wider uppercase mb-3" style={{ color: '#999' }}>Nama</label><input type="text" value={current.name || ''} onChange={e => setCurrent({...current, name: e.target.value})} required className="w-full px-5 py-4 text-sm focus:outline-none" style={{ backgroundColor: '#FAF8F5', border: '1px solid rgba(0,0,0,0.08)', color: '#2D2D2D' }} /></div>
            <div><label className="block font-label text-xs font-semibold tracking-wider uppercase mb-3" style={{ color: '#999' }}>Deskripsi</label><textarea value={current.description || ''} onChange={e => setCurrent({...current, description: e.target.value})} required rows={3} className="w-full px-5 py-4 text-sm focus:outline-none resize-none" style={{ backgroundColor: '#FAF8F5', border: '1px solid rgba(0,0,0,0.08)', color: '#2D2D2D' }} /></div>
            <div>
              <label className="block font-label text-xs font-semibold tracking-wider uppercase mb-3" style={{ color: '#999' }}>Tag</label>
              <div className="flex gap-2 mb-3"><input type="text" value={featureInput} onChange={e => setFeatureInput(e.target.value)} placeholder="Tambah tag" onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addFeature(); } }} className="flex-1 px-5 py-4 text-sm focus:outline-none" style={{ backgroundColor: '#FAF8F5', border: '1px solid rgba(0,0,0,0.08)', color: '#2D2D2D' }} /><button type="button" onClick={addFeature} className="px-4 py-4 font-label font-semibold transition-colors" style={{ backgroundColor: '#2D2D2D', color: '#FFFFFF' }}>+</button></div>
              <div className="flex flex-wrap gap-2">{(current.features || []).map((f, i) => (<span key={i} className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-label" style={{ backgroundColor: 'rgba(197,165,90,0.1)', color: '#C5A55A' }}>{f} <button type="button" onClick={() => removeFeature(i)} className="hover:text-black"><X size={12} /></button></span>))}</div>
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
            <th className="px-6 py-4 font-label text-[11px] font-semibold tracking-[0.15em] uppercase text-right w-28" style={{ color: '#999' }}>Aksi</th>
          </tr></thead><tbody>
            {items.map(p => (
              <tr key={p.id} className="hover:bg-[#FAF8F5] transition-colors" style={{ borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
                <td className="px-6 py-4">{p.image_url ? <img src={imgUrl(p.image_url)!} alt="" className="w-14 h-14 object-cover rounded-sm" /> : <div className="w-14 h-14 bg-gray-100 rounded-sm" />}</td>
                <td className="px-6 py-4"><p className="font-semibold text-sm font-label mb-1" style={{ color: '#2D2D2D' }}>{p.name}</p><p className="text-sm line-clamp-1" style={{ color: '#999' }}>{p.description}</p></td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button onClick={() => openEdit(p)} className="inline-flex items-center justify-center w-8 h-8 transition-colors" style={{ backgroundColor: 'rgba(59,130,246,0.08)', color: '#3B82F6' }}><Edit2 size={14} /></button>
                  <button onClick={() => setDeleteId(p.id)} className="inline-flex items-center justify-center w-8 h-8 transition-colors" style={{ backgroundColor: 'rgba(239,68,68,0.08)', color: '#EF4444' }}><Trash2 size={14} /></button>
                </td>
              </tr>
            ))}
            {items.length === 0 && <tr><td colSpan={3} className="text-center py-12 text-sm text-gray-400">Belum ada data produk.</td></tr>}
          </tbody></table>
        </div>
      )}
      
      <ConfirmModal 
        isOpen={deleteId !== null} 
        title="Hapus Produk" 
        message="Apakah Anda yakin ingin menghapus produk ini? Tindakan ini tidak dapat dibatalkan."
        confirmText="Ya, Hapus"
        onConfirm={confirmDelete} 
        onCancel={() => setDeleteId(null)} 
      />
    </div>
  );
}
