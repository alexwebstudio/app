'use client';

import { useEffect, useRef } from 'react';
import { categories } from '@/data/categories';
import { categoryIcons } from './Icons';

export default function CategoryTabs({ active, onChange }) {
  const refs = useRef({});

  // При смене категории подкручиваем активный чип в зону видимости.
  useEffect(() => {
    const el = refs.current[active];
    if (el) el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, [active]);

  return (
    <nav className="categories" aria-label="Категории меню">
      <div className="categories-track no-scrollbar">
        {categories.map((c) => {
          const Icon = categoryIcons[c.id];
          return (
            <button
              key={c.id}
              ref={(node) => {
                refs.current[c.id] = node;
              }}
              className={`category-chip ${active === c.id ? 'active' : ''}`}
              onClick={() => onChange(c.id)}
              aria-pressed={active === c.id}
            >
              {Icon && <Icon width={18} height={18} />}
              {c.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
