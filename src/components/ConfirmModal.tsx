'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';
import { useEffect } from 'react';

type Props = {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  isDanger?: boolean;
};

export default function ConfirmModal({ isOpen, title, message, onConfirm, onCancel, confirmText = 'Konfirmasi', cancelText = 'Batal', isDanger = true }: Props) {
  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCancel} />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-[#FFFFFF] shadow-2xl overflow-hidden"
            style={{ border: '1px solid rgba(0,0,0,0.1)' }}
          >
            {/* Header Accent */}
            <div className="h-1 w-full" style={{ backgroundColor: isDanger ? '#cc4444' : '#C5A55A' }} />
            
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center shrink-0" style={{ backgroundColor: isDanger ? 'rgba(204,68,68,0.1)' : 'rgba(197,165,90,0.1)', color: isDanger ? '#cc4444' : '#C5A55A' }}>
                    <AlertTriangle size={20} />
                  </div>
                  <h3 className="text-xl font-label font-bold" style={{ color: '#2D2D2D' }}>{title}</h3>
                </div>
                <button onClick={onCancel} className="text-gray-400 hover:text-black transition-colors"><X size={18} /></button>
              </div>
              
              <p className="text-sm leading-relaxed mb-8" style={{ color: '#666' }}>{message}</p>
              
              <div className="flex gap-4">
                <button onClick={onCancel} className="flex-1 py-3 text-sm font-label font-semibold tracking-wider transition-colors"
                  style={{ backgroundColor: '#FAF8F5', color: '#666', border: '1px solid rgba(0,0,0,0.06)' }}>
                  {cancelText}
                </button>
                <button onClick={onConfirm} className="flex-1 py-3 text-sm font-label font-semibold tracking-wider transition-colors"
                  style={{ backgroundColor: isDanger ? '#cc4444' : '#C5A55A', color: '#FFFFFF' }}>
                  {confirmText}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
