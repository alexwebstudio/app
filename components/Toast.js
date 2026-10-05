'use client';

import { useEffect } from 'react';

// Короткое уведомление. Само исчезает через заданное время.
// toast.Icon — необязательный компонент SVG-иконки (без эмодзи).
export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return undefined;
    const t = setTimeout(onClose, toast.duration || 2400);
    return () => clearTimeout(t);
  }, [toast, onClose]);

  if (!toast) return null;

  const Icon = toast.Icon;

  return (
    <div className="toast-wrap">
      <div className={`toast ${toast.accent ? 'accent' : ''}`} role="status">
        {Icon && <Icon width={18} height={18} />}
        {toast.text}
      </div>
    </div>
  );
}
