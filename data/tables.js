// Демонстрационные столы ресторана (8 шт.).
// В реальном приложении список и статус столов приходят с сервера,
// а конкретный стол определяется по QR-коду на столе (параметр в URL).
export const tables = [
  { id: 1, zone: 'Зал у окна' },
  { id: 2, zone: 'Зал у окна' },
  { id: 3, zone: 'Основной зал' },
  { id: 4, zone: 'Основной зал' },
  { id: 5, zone: 'Основной зал' },
  { id: 6, zone: 'Терраса' },
  { id: 7, zone: 'Терраса' },
  { id: 8, zone: 'VIP-кабинет' },
];

export const TABLE_COUNT = tables.length;

// Проверка корректности номера стола (для QR-параметра и выбора вручную).
export function isValidTableId(id) {
  const n = Number(id);
  return Number.isInteger(n) && n >= 1 && n <= TABLE_COUNT;
}
