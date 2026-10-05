'use client';

import { useEffect } from 'react';
import { tables } from '@/data/tables';
import { useTable } from '@/context/TableContext';
import { CloseIcon, TableIcon, QrIcon, CheckIcon } from './Icons';

// Модальное окно выбора стола (8 столов). Номер также может прийти
// автоматически из QR-кода на столе (параметр ?table= в URL).
export default function TableModal({ onClose }) {
  const { table, selectTable } = useTable();

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

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label="Выбор стола"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-handle" />
        <div className="modal-head">
          <h2 className="modal-title">Выберите стол</h2>
          <button className="icon-btn" onClick={onClose} aria-label="Закрыть">
            <CloseIcon />
          </button>
        </div>

        <div className="tables-grid">
          {tables.map((t) => {
            const isActive = table === t.id;
            return (
              <button
                key={t.id}
                className={`table-card ${isActive ? 'active' : ''}`}
                onClick={() => {
                  selectTable(t.id);
                  onClose();
                }}
                aria-pressed={isActive}
              >
                <span className="table-card-icon">
                  {isActive ? <CheckIcon width={20} height={20} /> : <TableIcon width={20} height={20} />}
                </span>
                <span>
                  <span className="table-card-num">Стол {t.id}</span>
                  <br />
                  <span className="table-card-zone">{t.zone}</span>
                </span>
              </button>
            );
          })}
        </div>

        <p className="modal-note">
          <QrIcon width={18} height={18} />
          <span>
            Обычно стол определяется автоматически, когда вы сканируете QR-код на
            столе. Выбор стола сохраняется между разделами.
          </span>
        </p>
      </div>
    </div>
  );
}
