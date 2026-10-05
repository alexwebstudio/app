'use client';

import { useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/format';
import DishImage from './DishImage';
import { CloseIcon, PlusIcon, MinusIcon } from './Icons';

// Модальное окно с детальной карточкой блюда.
export default function ProductModal({ product, onClose, onAdded }) {
  const { items, addItem, decrementItem } = useCart();
  const qty = product ? items[product.id]?.qty || 0 : 0;

  // Блокировка прокрутки фона + закрытие по Esc.
  useEffect(() => {
    if (!product) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [product, onClose]);

  if (!product) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={product.name}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-handle" />
        <div className="modal-head">
          <span />
          <button className="icon-btn" onClick={onClose} aria-label="Закрыть">
            <CloseIcon />
          </button>
        </div>

        <DishImage
          className="dish-modal-media"
          category={product.category}
          gradient={product.gradient}
          image={product.image}
          alt={product.name}
          glyphSize={72}
        />

        <h2 className="dish-modal-name">{product.name}</h2>
        <p className="dish-modal-desc">{product.description}</p>

        <div className="dish-modal-foot">
          <span className="dish-modal-price">{formatPrice(product.price)}</span>
          {qty === 0 ? (
            <button
              className="add-btn"
              onClick={() => {
                addItem(product);
                if (onAdded) onAdded(product);
              }}
            >
              <PlusIcon /> В корзину
            </button>
          ) : (
            <div className="qty-stepper" aria-label={`Количество: ${qty}`}>
              <button onClick={() => decrementItem(product.id)} aria-label="Убрать одну">
                <MinusIcon />
              </button>
              <span className="qty-value">{qty}</span>
              <button
                onClick={() => {
                  addItem(product);
                  if (onAdded) onAdded(product);
                }}
                aria-label="Добавить ещё"
              >
                <PlusIcon />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
