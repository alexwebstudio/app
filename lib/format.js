// Форматирование валюты. В приложении используется только тенге (₸).
export function formatPrice(amount) {
  const rounded = Math.round(Number(amount) || 0);
  // Разряды разделяем неразрывным пробелом: 2 490 ₸
  const withSpaces = rounded.toLocaleString('ru-RU').replace(/ /g, ' ');
  return `${withSpaces} ₸`;
}

// Форматирование количества бонусов (тоже в ₸, 1 бонус = 1 ₸).
export function formatBonus(amount) {
  return formatPrice(amount);
}
