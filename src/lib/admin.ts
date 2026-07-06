'use client';

import toast from 'react-hot-toast';

export async function adminSave(endpoint: string, data: Record<string, unknown>, imageFile: File | null, id?: number): Promise<{ ok: boolean; error?: string }> {
  const token = localStorage.getItem('admin_token');
  const url = id ? `${process.env.NEXT_PUBLIC_API_URL || 'https://apikampungcibun.amania.id'}/api/${endpoint}/${id}` : `${process.env.NEXT_PUBLIC_API_URL || 'https://apikampungcibun.amania.id'}/api/${endpoint}`;

  const formData = new FormData();
  for (const [key, value] of Object.entries(data)) {
    if (value === null || value === undefined) continue;
    if (Array.isArray(value)) {
      formData.append(key, JSON.stringify(value));
    } else {
      formData.append(key, String(value));
    }
  }
  if (imageFile) formData.append('image', imageFile);

  try {
    const res = await fetch(url, { method: 'POST', headers: { 'Authorization': `Bearer ${token}` }, body: formData });
    if (!res.ok) {
      const d = await res.json().catch(() => ({}));
      toast.error(d.message || 'Gagal menyimpan data.');
      return { ok: false, error: d.message || 'Gagal menyimpan.' };
    }
    toast.success('Data berhasil disimpan!');
    return { ok: true };
  } catch {
    toast.error('Tidak dapat terhubung ke server.');
    return { ok: false, error: 'Tidak dapat terhubung ke server.' };
  }
}

export async function adminDelete(endpoint: string, id: number): Promise<void> {
  const token = localStorage.getItem('admin_token');
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://apikampungcibun.amania.id'}/api/${endpoint}/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
    if (res.ok) {
      toast.success('Data berhasil dihapus!');
    } else {
      toast.error('Gagal menghapus data.');
    }
  } catch {
    toast.error('Gagal terhubung ke server.');
  }
}

export function imgUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  return `${process.env.NEXT_PUBLIC_API_URL || 'https://apikampungcibun.amania.id'}${path}`;
}
