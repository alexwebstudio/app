'use client';

import { useCart } from '@/context/CartContext';
import { useTable } from '@/context/TableContext';
import { formatPrice } from '@/lib/format';
import { BONUS_RATE } from '@/data/profile';
import DishImage from './DishImage';
import { PlusIcon, MinusIcon, TrashIcon, CartIcon, StarIcon, TableIcon } from './Icons';

export default function CartView({ onGoMenu, onCheckout }) {
  const { list, total, count, addItem, decrementItem, removeItem } = useCart();
  const { table } = useTable();
  const bonus = Math.round(total * BONUS_RATE);

  return (
    <div className="view cart-page">
      <h1 className="section-title">Корзина</h1>

      {list.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <CartIcon width={40} height={40} />
          </div>
          <p className="empty-title">Корзина пуста</p>
          <p className="empty-text">
            Добавьте любимую лапшу, вок или роллы — и они появятся здесь.
          </p>
          <button className="btn-primary" style={{ maxWidth: 260 }} onClick={onGoMenu}>
            Перейти в меню
          </button>
        </div>
      ) : (
        <>
          <div className="cart-list">
            {list.map(({ product, qty }) => (
              <div className="cart-line" key={product.id}>
                <DishImage
                  className="cart-line-media"
                  category={product.category}
                  gradient={product.gradient}
                  image={product.image}
                  alt={product.name}
                  glyphSize={30}
                />
                <div className="cart-line-info">
                  <p className="cart-line-name">{product.name}</p>
                  <span className="cart-line-price">
                    {formatPrice(product.price)} × {qty} = {formatPrice(product.price * qty)}
                  </span>
                </div>
                <div className="qty-stepper" aria-label={`Количество: ${qty}`}>
                  <button onClick={() => decrementItem(product.id)} aria-label="Убрать одну">
                    <MinusIcon />
                  </button>
                  <span className="qty-value">{qty}</span>
                  <button onClick={() => addItem(product)} aria-label="Добавить ещё">
                    <PlusIcon />
                  </button>
                </div>
                <button
                  className="icon-btn"
                  style={{ width: 38, height: 38, boxShadow: 'none', color: 'var(--muted)' }}
                  onClick={() => removeItem(product.id)}
                  aria-label={`Удалить ${product.name}`}
                >
                  <TrashIcon />
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-row">
              <span>Стол</span>
              <span className="summary-value" style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}>
                <TableIcon width={16} height={16} />
                {table ? `№ ${table}` : 'не выбран'}
              </span>
            </div>
            <div className="summary-row">
              <span>Блюд в заказе</span>
              <span className="summary-value">{count}</span>
            </div>
            <div className="summary-row total">
              <span>Итого</span>
              <span className="summary-value">{formatPrice(total)}</span>
            </div>

            <div className="bonus-hint">
              <StarIcon width={18} height={18} />
              <span>
                Начислим {formatPrice(bonus)} бонусов за этот заказ (3%)
              </span>
            </div>

            <button className="btn-primary" onClick={onCheckout} disabled={!table}>
              {table ? 'Оформить заказ' : 'Сначала выберите стол'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
