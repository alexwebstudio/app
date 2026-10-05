'use client';

import { useState } from 'react';
import { DishGlyph } from './Icons';

/**
 * Изображение блюда с фирменным плейсхолдером.
 * Пока фото не загрузилось (или если недоступно) — виден градиент
 * и одноцветная SVG-иконка категории (без эмодзи).
 */
export default function DishImage({
  category,
  gradient,
  image,
  alt,
  className,
  glyphSize = 44,
  onClick,
}) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={className}
      onClick={onClick}
      style={{ background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})` }}
    >
      <DishGlyph category={category} width={glyphSize} height={glyphSize} strokeWidth={1.6} />
      {image && !failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          onLoad={() => setLoaded(true)}
          style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.4s ease' }}
        />
      )}
    </div>
  );
}
