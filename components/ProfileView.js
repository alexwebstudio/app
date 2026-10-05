'use client';

import { useCart } from '@/context/CartContext';
import { useTable } from '@/context/TableContext';
import { useAuth } from '@/context/AuthContext';
import { formatPrice } from '@/lib/format';
import { demoProfile, demoBonusHistory, BONUS_RATE } from '@/data/profile';
import { UserIcon, PhoneIcon, TableIcon, StarIcon, GiftIcon } from './Icons';

export default function ProfileView({ onOpenTable, onOpenAuth }) {
  const { total } = useCart();
  const { table } = useTable();
  const { user, logout } = useAuth();
  const projected = Math.round(total * BONUS_RATE);

  const name = user?.name || demoProfile.name;
  const phone = user?.phone || demoProfile.phone;

  return (
    <div className="view profile-page">
      <h1 className="section-title">Профиль</h1>

      {/* Приглашение войти, если пользователь не авторизован */}
      {!user && (
        <div className="login-card">
          <span className="info-icon">
            <UserIcon width={26} height={26} />
          </span>
          <h3>Войдите в личный кабинет</h3>
          <p>Регистрируйтесь, чтобы копить бонусы и видеть историю заказов.</p>
          <button className="btn-primary" onClick={onOpenAuth}>
            Войти или зарегистрироваться
          </button>
        </div>
      )}

      {/* Бонусная карта */}
      <div className="bonus-card">
        <span className="bonus-card-badge">Кэшбэк 3%</span>
        <div className="bonus-card-label">Бонусный баланс</div>
        <div className="bonus-card-value">{formatPrice(demoProfile.bonusBalance)}</div>
        <div className="bonus-card-note">
          {projected > 0
            ? `За текущий заказ начислим +${formatPrice(projected)}`
            : 'Оплачивайте заказы и получайте 3% бонусами'}
        </div>
      </div>

      {/* Базовая информация */}
      <div className="profile-info">
        <div className="info-row">
          <span className="info-icon">
            <UserIcon width={20} height={20} />
          </span>
          <span>
            <span className="info-label">Имя</span>
            <br />
            <span className="info-value">{name}</span>
          </span>
        </div>
        <div className="info-row">
          <span className="info-icon">
            <PhoneIcon width={20} height={20} />
          </span>
          <span>
            <span className="info-label">Телефон</span>
            <br />
            <span className="info-value">{phone}</span>
          </span>
        </div>
        <button className="info-row" style={{ width: '100%', textAlign: 'left' }} onClick={onOpenTable}>
          <span className="info-icon">
            <TableIcon width={20} height={20} />
          </span>
          <span>
            <span className="info-label">Текущий стол</span>
            <br />
            <span className="info-value">{table ? `Стол № ${table}` : 'Выбрать стол'}</span>
          </span>
        </button>
      </div>

      {user && (
        <button className="btn-ghost" onClick={logout}>
          Выйти из аккаунта
        </button>
      )}

      {/* История бонусов */}
      <h2 className="bonus-history-title">История бонусов</h2>
      {demoBonusHistory.map((h) => (
        <div className="bonus-item" key={h.id}>
          <div className="bonus-item-main">
            <span className="bonus-item-title">{h.title}</span>
            <span className="bonus-item-date">{h.date}</span>
          </div>
          <span className="bonus-item-amount plus">+{formatPrice(h.amount)}</span>
        </div>
      ))}

      <p className="modal-note" style={{ marginTop: 18 }}>
        <GiftIcon width={18} height={18} />
        <span>
          Регистрация и бонусы показаны в демонстрационном режиме. Реальные
          аккаунт, баланс и история подключаются на стороне сервера.
        </span>
      </p>
    </div>
  );
}
