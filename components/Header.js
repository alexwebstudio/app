'use client';

import { useCart } from '@/context/CartContext';
import { useTable } from '@/context/TableContext';
import { CartIcon, TableIcon, LogoMark } from './Icons';

// Верхняя панель: логотип VOKU (синий, одноцветный) + подпись «ресторан
// китайской кухни» слева; кнопка выбранного стола и корзина справа.
export default function Header({ onOpenTable, onOpenCart }) {
  const { count } = useCart();
  const { table } = useTable();

  return (
    <header className="header">
      <div className="brand">
        <div className="brand-mark" aria-hidden="true">
          <LogoMark size={28} />
        </div>
        <div className="brand-text">
          <span className="brand-name">VOKU</span>
          <span className="brand-sub">ресторан китайской кухни</span>
        </div>
      </div>

      <div className="header-actions">
        <button className="table-btn" onClick={onOpenTable} aria-label="Выбрать стол">
          <TableIcon width={18} height={18} />
          {table ? (
            <span>
              Стол <b>{table}</b>
            </span>
          ) : (
            <span>Стол</span>
          )}
        </button>
        <button className="icon-btn accent" onClick={onOpenCart} aria-label="Открыть корзину">
          <CartIcon />
          {count > 0 && <span className="cart-badge">{count}</span>}
        </button>
      </div>
    </header>
  );
}
