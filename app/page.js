'use client';

import { useEffect, useRef, useState } from 'react';
import Preloader from '@/components/Preloader';
import Header from '@/components/Header';
import PromoSlider from '@/components/PromoSlider';
import CategoryTabs from '@/components/CategoryTabs';
import ProductGrid from '@/components/ProductGrid';
import CartView from '@/components/CartView';
import ProfileView from '@/components/ProfileView';
import BottomNavigation from '@/components/BottomNavigation';
import ProductModal from '@/components/ProductModal';
import TableModal from '@/components/TableModal';
import AuthModal from '@/components/AuthModal';
import Toast from '@/components/Toast';
import { useTable } from '@/context/TableContext';
import { CheckIcon, TableIcon, UserIcon } from '@/components/Icons';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('home'); // home | cart | profile
  const [homeTab, setHomeTab] = useState('home'); // подсветка нижней навигации на главной: home | menu
  const [category, setCategory] = useState('all');
  const [toast, setToast] = useState(null);
  const [tableModal, setTableModal] = useState(false);
  const [authModal, setAuthModal] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);

  const { table, fromQr } = useTable();
  const catalogRef = useRef(null);
  const qrNotified = useRef(false);

  // Прелоадер: показываем один раз при первой загрузке, недолго.
  useEffect(() => {
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t = setTimeout(() => setLoading(false), reduced ? 700 : 1900);
    return () => clearTimeout(t);
  }, []);

  const showToast = (text, opts = {}) => setToast({ text, id: Date.now(), ...opts });

  // Уведомление, если стол определился автоматически по QR-коду.
  useEffect(() => {
    if (!loading && fromQr && table && !qrNotified.current) {
      qrNotified.current = true;
      showToast(`Вы за столом № ${table}`, { Icon: TableIcon });
    }
  }, [loading, fromQr, table]);

  const scrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Активный пункт нижней навигации: на главной различаем «Главная» и «Меню».
  const activeNav = view === 'home' ? homeTab : view;

  const handleNavigate = (id) => {
    if (id === 'menu') {
      setView('home');
      setHomeTab('menu');
      requestAnimationFrame(() => scrollToCatalog());
      return;
    }
    setView(id);
    if (id === 'home') {
      setHomeTab('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const openCart = () => setView('cart');

  const handlePromoClick = (categoryId) => {
    setCategory(categoryId || 'all');
    setView('home');
    setHomeTab('menu');
    requestAnimationFrame(() => scrollToCatalog());
  };

  const handleAdded = (product) => {
    showToast(`${product.name} — в корзине`, { accent: true, Icon: CheckIcon });
  };

  const handleCheckout = () => {
    showToast('Демо-режим: реальный заказ пока не оформляется', {});
  };

  const handleAuthSuccess = (mode) => {
    showToast(mode === 'register' ? 'Аккаунт создан' : 'Вы вошли в аккаунт', {
      accent: true,
      Icon: UserIcon,
    });
  };

  return (
    <div className="app-shell">
      {loading && <Preloader />}

      <Header onOpenCart={openCart} onOpenTable={() => setTableModal(true)} />

      <main className="page">
        {view === 'home' && (
          <div className="view" key="home">
            <PromoSlider onPromoClick={handlePromoClick} />
            <div ref={catalogRef} style={{ scrollMarginTop: 140 }}>
              <CategoryTabs active={category} onChange={setCategory} />
              <h2 className="section-title">Меню</h2>
              <ProductGrid category={category} onAdded={handleAdded} onOpen={setActiveProduct} />
            </div>
          </div>
        )}

        {view === 'cart' && (
          <CartView key="cart" onGoMenu={() => handleNavigate('menu')} onCheckout={handleCheckout} />
        )}

        {view === 'profile' && (
          <ProfileView
            key="profile"
            onOpenTable={() => setTableModal(true)}
            onOpenAuth={() => setAuthModal(true)}
          />
        )}
      </main>

      <BottomNavigation active={activeNav} onNavigate={handleNavigate} />

      {activeProduct && (
        <ProductModal
          product={activeProduct}
          onClose={() => setActiveProduct(null)}
          onAdded={handleAdded}
        />
      )}

      {tableModal && <TableModal onClose={() => setTableModal(false)} />}

      {authModal && (
        <AuthModal onClose={() => setAuthModal(false)} onSuccess={handleAuthSuccess} />
      )}

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
