'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { CloseIcon } from './Icons';

// Модальное окно демо-регистрации / входа в личный кабинет.
export default function AuthModal({ onClose, onSuccess }) {
  const { register, login } = useAuth();
  const [mode, setMode] = useState('register'); // register | login
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  const switchMode = (m) => {
    setMode(m);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const res =
      mode === 'register'
        ? register({ name, phone, password })
        : login({ phone, password });
    if (res.ok) {
      onSuccess?.(mode);
      onClose();
    } else {
      setError(res.error);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label="Личный кабинет"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-handle" />
        <div className="modal-head">
          <h2 className="modal-title">Личный кабинет</h2>
          <button className="icon-btn" onClick={onClose} aria-label="Закрыть">
            <CloseIcon />
          </button>
        </div>

        <div className="auth-tabs" role="tablist">
          <button
            className={`auth-tab ${mode === 'register' ? 'active' : ''}`}
            onClick={() => switchMode('register')}
            type="button"
          >
            Регистрация
          </button>
          <button
            className={`auth-tab ${mode === 'login' ? 'active' : ''}`}
            onClick={() => switchMode('login')}
            type="button"
          >
            Вход
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {mode === 'register' && (
            <div className="field">
              <label htmlFor="auth-name">Имя</label>
              <input
                id="auth-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Как вас зовут"
                autoComplete="name"
              />
            </div>
          )}
          <div className="field">
            <label htmlFor="auth-phone">Телефон</label>
            <input
              id="auth-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+7 (700) 000-00-00"
              autoComplete="tel"
            />
          </div>
          <div className="field">
            <label htmlFor="auth-pass">Пароль</label>
            <input
              id="auth-pass"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Не короче 4 символов"
              autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
            />
          </div>

          {error && <div className="auth-error">{error}</div>}

          <button className="btn-primary" type="submit">
            {mode === 'register' ? 'Зарегистрироваться' : 'Войти'}
          </button>
        </form>

        <p className="auth-note">
          Демонстрационная регистрация: данные хранятся только в этом браузере,
          без сервера. Не вводите настоящий пароль.
        </p>
      </div>
    </div>
  );
}
