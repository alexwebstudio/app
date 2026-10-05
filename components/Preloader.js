import { LogoMark } from './Icons';

// Экран загрузки с логотипом VOKU и короткой фирменной анимацией.
// Визуально скрывается CSS-анимацией; из DOM удаляется родителем по таймеру.
export default function Preloader() {
  return (
    <div className="preloader" role="status" aria-label="Загрузка VOKU">
      <div className="preloader-logo">
        <div className="preloader-mark">
          <LogoMark size={64} />
        </div>
        <div className="preloader-name">VOKU</div>
        <div className="preloader-sub">ресторан китайской кухни</div>
      </div>
      <div className="preloader-bar" aria-hidden="true">
        <span />
      </div>
    </div>
  );
}
