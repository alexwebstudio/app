'use client';

import { createContext, useContext, useState, useCallback, useEffect, useMemo } from 'react';
import { isValidTableId } from '@/data/tables';

const TableContext = createContext(null);
const STORAGE_KEY = 'voku.table.v1';

// Читает номер стола из QR-параметра в URL: ?table=5 или ?t=5.
function readTableFromUrl() {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  const raw = params.get('table') ?? params.get('t');
  return raw && isValidTableId(raw) ? Number(raw) : null;
}

export function TableProvider({ children }) {
  const [table, setTable] = useState(null);
  // fromQr — стол был определён автоматически по QR-коду.
  const [fromQr, setFromQr] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Приоритет у QR-параметра: если по ссылке со стола пришёл валидный
    // номер — выбираем именно его. Иначе восстанавливаем прошлый выбор.
    const qrTable = readTableFromUrl();
    if (qrTable) {
      setTable(qrTable);
      setFromQr(true);
      try {
        localStorage.setItem(STORAGE_KEY, String(qrTable));
      } catch {
        /* no-op */
      }
    } else {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved && isValidTableId(saved)) setTable(Number(saved));
      } catch {
        /* no-op */
      }
    }
    setHydrated(true);
  }, []);

  const selectTable = useCallback((id) => {
    if (!isValidTableId(id)) return;
    const n = Number(id);
    setTable(n);
    setFromQr(false);
    try {
      localStorage.setItem(STORAGE_KEY, String(n));
    } catch {
      /* no-op */
    }
  }, []);

  const value = useMemo(
    () => ({ table, fromQr, hydrated, selectTable }),
    [table, fromQr, hydrated, selectTable]
  );

  return <TableContext.Provider value={value}>{children}</TableContext.Provider>;
}

export function useTable() {
  const ctx = useContext(TableContext);
  if (!ctx) throw new Error('useTable must be used within TableProvider');
  return ctx;
}
