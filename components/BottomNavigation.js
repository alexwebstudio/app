'use client';

import { useCart } from '@/context/CartContext';
import { HomeIcon, MenuIcon, CartIcon, UserIcon } from './Icons';

const items = [
  { id: 'home', label: 'Главная', Icon: HomeIcon },
  { id: 'menu', label: 'Меню', Icon: MenuIcon },
  { id: 'cart', label: 'Корзина', Icon: CartIcon },
  { id: 'profile', label: 'Профиль', Icon: UserIcon },
];

export default function BottomNavigation({ active, onNavigate }) {
  const { count } = useCart();
  const index = Math.max(0, items.findIndex((i) => i.id === active));

  return (
    <nav className="bottom-nav" aria-label="Основная навигация">
      <div className="bottom-nav-inner">
        {/* Анимированный индикатор активного раздела */}
        <span
          className="nav-indicator"
          style={{
            width: `calc((100% - 16px) / ${items.length})`,
            transform: `translateX(${index * 100}%)`,
          }}
          aria-hidden="true"
        />
        {items.map(({ id, label, Icon }) => (
          <button
            key={id}
            className={`nav-item ${active === id ? 'active' : ''}`}
            onClick={() => onNavigate(id)}
            aria-current={active === id ? 'page' : undefined}
          >
            <span className="nav-icon">
              <Icon width={22} height={22} />
            </span>
            {label}
            {id === 'cart' && count > 0 && <span className="nav-badge">{count}</span>}
          </button>
        ))}
      </div>
    </nav>
  );
}
