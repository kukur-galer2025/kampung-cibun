'use client';

import { useState } from 'react';
import { Upload, ImageIcon, X } from 'lucide-react';

type Props = {
  preview: string | null;
  onFileChange: (file: File | null) => void;
  onClear: () => void;
  error?: string;
};

export default function ImageUploader({ preview, onFileChange, onClear, error }: Props) {
  const [dragOver, setDragOver] = useState(false);

  const validate = (file: File): string | null => {
    const allowed = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowed.includes(file.type)) return 'Format file tidak didukung. Gunakan JPG, PNG, GIF, atau WebP.';
    if (file.size > 10 * 1024 * 1024) return 'Ukuran file melebihi batas maksimal 10MB.';
    return null;
  };

  const handleFile = (file: File) => {
    const err = validate(file);
    if (err) { onFileChange(null); return; }
    onFileChange(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div>
      <label className="block font-label text-xs font-semibold tracking-wider uppercase mb-3" style={{ color: '#999' }}>Foto</label>
      <div
        className="relative border-2 border-dashed rounded-sm p-8 text-center transition-colors cursor-pointer"
        style={{ borderColor: dragOver ? '#C5A55A' : 'rgba(0,0,0,0.1)', backgroundColor: dragOver ? 'rgba(197,165,90,0.05)' : '#FAFAF8' }}
        onClick={() => document.getElementById('img-upload')?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        {preview ? (
          <div className="relative">
            <img src={preview} alt="Preview" className="max-h-48 mx-auto object-contain rounded-sm" />
            <button type="button" onClick={(e) => { e.stopPropagation(); onClear(); }}
              className="absolute top-0 right-0 p-1" style={{ backgroundColor: 'rgba(239,68,68,0.9)', color: '#FFF' }}>
              <X size={14} />
            </button>
            <p className="mt-3 text-xs font-label" style={{ color: '#999' }}>Klik untuk mengganti</p>
          </div>
        ) : (
          <div>
            <Upload size={32} className="mx-auto mb-3" style={{ color: '#CCC' }} />
            <p className="text-sm font-label font-semibold mb-1" style={{ color: '#666' }}>Klik atau drag & drop foto</p>
          </div>
        )}
        <input id="img-upload" type="file" accept=".jpg,.jpeg,.png,.gif,.webp" className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ''; }} />
      </div>
      <div className="flex items-center gap-4 mt-3">
        <div className="flex items-center gap-1.5">
          <ImageIcon size={12} style={{ color: '#999' }} />
          <span className="text-[11px] font-label" style={{ color: '#999' }}>Format: JPG, PNG, GIF, WebP</span>
        </div>
        <span className="text-[11px] font-label" style={{ color: '#999' }}>•</span>
        <span className="text-[11px] font-label" style={{ color: '#999' }}>Maks. 10MB</span>
      </div>
      {error && <p className="text-xs mt-2" style={{ color: '#cc4444' }}>{error}</p>}
    </div>
  );
}
