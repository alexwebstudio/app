'use client';

import { createContext, useContext, useMemo, useState, useCallback, useEffect } from 'react';

const CartContext = createContext(null);
const STORAGE_KEY = 'voku.cart.v1';

export function CartProvider({ children }) {
  // items: { [productId]: { product, qty } }
  const [items, setItems] = useState({});
  const [hydrated, setHydrated] = useState(false);

  // Загружаем сохранённую корзину из localStorage (после монтирования —
  // чтобы не было расхождений при серверном рендере).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // localStorage недоступен (приватный режим и т.п.) — работаем без сохранения.
    }
    setHydrated(true);
  }, []);

  // Сохраняем изменения корзины.
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* игнорируем ошибки записи */
    }
  }, [items, hydrated]);

  const addItem = useCallback((product) => {
    setItems((prev) => {
      const existing = prev[product.id];
      return {
        ...prev,
        [product.id]: { product, qty: existing ? existing.qty + 1 : 1 },
      };
    });
  }, []);

  const decrementItem = useCallback((productId) => {
    setItems((prev) => {
      const existing = prev[productId];
      if (!existing) return prev;
      if (existing.qty <= 1) {
        const next = { ...prev };
        delete next[productId];
        return next;
      }
      return { ...prev, [productId]: { ...existing, qty: existing.qty - 1 } };
    });
  }, []);

  const removeItem = useCallback((productId) => {
    setItems((prev) => {
      const next = { ...prev };
      delete next[productId];
      return next;
    });
  }, []);

  const clearCart = useCallback(() => setItems({}), []);

  const list = useMemo(() => Object.values(items), [items]);
  const count = useMemo(() => list.reduce((s, e) => s + e.qty, 0), [list]);
  const total = useMemo(
    () => list.reduce((s, e) => s + e.qty * e.product.price, 0),
    [list]
  );

  const value = useMemo(
    () => ({ items, list, count, total, addItem, decrementItem, removeItem, clearCart }),
    [items, list, count, total, addItem, decrementItem, removeItem, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
