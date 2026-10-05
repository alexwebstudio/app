'use client';

import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/format';
import DishImage from './DishImage';
import { PlusIcon, MinusIcon } from './Icons';

export default function ProductCard({ product, onAdded, onOpen }) {
  const { items, addItem, decrementItem } = useCart();
  const qty = items[product.id]?.qty || 0;

  const handleAdd = () => {
    addItem(product);
    if (onAdded) onAdded(product);
  };

  return (
    <article className="product-card">
      <DishImage
        className="product-media"
        category={product.category}
        gradient={product.gradient}
        image={product.image}
        alt={product.name}
        glyphSize={52}
        onClick={() => onOpen && onOpen(product)}
      />

      <div className="product-body">
        <h3 className="product-name" onClick={() => onOpen && onOpen(product)}>
          {product.name}
        </h3>
        <p className="product-desc">{product.description}</p>

        <div className="product-footer">
          <span className="product-price">{formatPrice(product.price)}</span>

          {qty === 0 ? (
            <button className="add-btn" onClick={handleAdd} aria-label={`Добавить ${product.name}`}>
              <PlusIcon /> В корзину
            </button>
          ) : (
            <div className="qty-stepper" aria-label={`Количество: ${qty}`}>
              <button onClick={() => decrementItem(product.id)} aria-label="Убрать одну">
                <MinusIcon />
              </button>
              <span className="qty-value">{qty}</span>
              <button onClick={handleAdd} aria-label="Добавить ещё">
                <PlusIcon />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
