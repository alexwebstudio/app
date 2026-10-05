'use client';

import { useMemo } from 'react';
import { products } from '@/data/products';
import ProductCard from './ProductCard';
import { AllIcon } from './Icons';

export default function ProductGrid({ category, onAdded, onOpen }) {
  const visible = useMemo(() => {
    if (category === 'all') return products;
    return products.filter((p) => p.category === category);
  }, [category]);

  if (visible.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">
          <AllIcon width={40} height={40} />
        </div>
        <p className="empty-title">Пока пусто</p>
        <p className="empty-text">В этой категории скоро появятся новые блюда.</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {visible.map((p) => (
        <ProductCard key={p.id} product={p} onAdded={onAdded} onOpen={onOpen} />
      ))}
    </div>
  );
}
