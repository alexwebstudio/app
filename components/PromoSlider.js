'use client';

import { useEffect, useRef, useState } from 'react';
import { promos } from '@/data/promos';
import { ChevronLeft, ChevronRight } from './Icons';

const AUTOPLAY_MS = 4500;

export default function PromoSlider({ onPromoClick }) {
  const [index, setIndex] = useState(0);
  const count = promos.length;
  const touchStartX = useRef(null);
  const reducedMotion = useRef(false);

  const goTo = (i) => setIndex((i + count) % count);
  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      reducedMotion.current = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;
    }
  }, []);

  // Автолистание. Зависит от index — при ручном переключении таймер
  // пересоздаётся, поэтому листание продолжается плавно, без скачков.
  useEffect(() => {
    if (reducedMotion.current) return undefined;
    const t = setTimeout(() => {
      setIndex((cur) => (cur + 1) % count);
    }, AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [index, count]);

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta > 45) prev();
    else if (delta < -45) next();
    touchStartX.current = null;
  };

  return (
    <section className="promo" aria-roledescription="карусель" aria-label="Акции и новости">
      <div className="promo-viewport" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <button className="promo-arrow prev" onClick={prev} aria-label="Предыдущий слайд">
          <ChevronLeft />
        </button>

        <div
          className="promo-track"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {promos.map((p) => (
            <article
              key={p.id}
              className="promo-slide"
              style={{
                background: `linear-gradient(130deg, ${p.gradient[0]}, ${p.gradient[1]})`,
              }}
            >
              {p.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img className="promo-slide-bg" src={p.image} alt="" loading="lazy" />
              )}
              <div className="promo-slide-content">
                <h2 className="promo-title">{p.title}</h2>
                <p className="promo-subtitle">{p.subtitle}</p>
                <button
                  className="promo-cta"
                  onClick={() => onPromoClick && onPromoClick(p.ctaCategory)}
                >
                  {p.cta}
                </button>
              </div>
            </article>
          ))}
        </div>

        <button className="promo-arrow next" onClick={next} aria-label="Следующий слайд">
          <ChevronRight />
        </button>
      </div>

      <div className="promo-dots" role="tablist">
        {promos.map((p, i) => (
          <button
            key={p.id}
            className={`promo-dot ${i === index ? 'active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Слайд ${i + 1}`}
            aria-selected={i === index}
          />
        ))}
      </div>
    </section>
  );
}
