'use client';

import { createContext, useContext, useState, useCallback, useEffect, useMemo } from 'react';

// ДЕМО-авторизация для наглядного показа.
// Данные хранятся только в localStorage браузера, без сервера и без шифрования.
// Это НЕ настоящая регистрация: для боевой версии нужны бэкенд, хеширование
// паролей и защищённая сессия. Пароли здесь в открытом виде — только для демо.

const AuthContext = createContext(null);
const USERS_KEY = 'voku.users.v1';
const CURRENT_KEY = 'voku.auth.v1';

function readUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
}
function writeUsers(users) {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch {
    /* no-op */
  }
}
const normPhone = (p) => (p || '').replace(/[^\d+]/g, '');

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { name, phone }
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CURRENT_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      /* no-op */
    }
    setHydrated(true);
  }, []);

  const persistCurrent = useCallback((u) => {
    try {
      if (u) localStorage.setItem(CURRENT_KEY, JSON.stringify(u));
      else localStorage.removeItem(CURRENT_KEY);
    } catch {
      /* no-op */
    }
  }, []);

  const register = useCallback(
    ({ name, phone, password }) => {
      const cleanName = (name || '').trim();
      const cleanPhone = normPhone(phone);
      if (!cleanName) return { ok: false, error: 'Введите имя' };
      if (cleanPhone.length < 6) return { ok: false, error: 'Введите корректный телефон' };
      if (!password || password.length < 4)
        return { ok: false, error: 'Пароль должен быть не короче 4 символов' };

      const users = readUsers();
      if (users.some((u) => normPhone(u.phone) === cleanPhone))
        return { ok: false, error: 'Такой телефон уже зарегистрирован' };

      users.push({ name: cleanName, phone: cleanPhone, password });
      writeUsers(users);
      const publicUser = { name: cleanName, phone: cleanPhone };
      setUser(publicUser);
      persistCurrent(publicUser);
      return { ok: true };
    },
    [persistCurrent]
  );

  const login = useCallback(
    ({ phone, password }) => {
      const cleanPhone = normPhone(phone);
      const users = readUsers();
      const found = users.find((u) => normPhone(u.phone) === cleanPhone);
      if (!found) return { ok: false, error: 'Пользователь не найден' };
      if (found.password !== password) return { ok: false, error: 'Неверный пароль' };
      const publicUser = { name: found.name, phone: found.phone };
      setUser(publicUser);
      persistCurrent(publicUser);
      return { ok: true };
    },
    [persistCurrent]
  );

  const logout = useCallback(() => {
    setUser(null);
    persistCurrent(null);
  }, [persistCurrent]);

  const value = useMemo(
    () => ({ user, hydrated, register, login, logout }),
    [user, hydrated, register, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
