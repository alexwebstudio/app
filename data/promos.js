// Демонстрационные промо-слайды для верхнего слайдера.
// ctaCategory — id категории, на которую фильтруется каталог по нажатию кнопки.
// image — временное фото со стока Unsplash (https://unsplash.com), не фото ресторана.
export const promos = [
  {
    id: 'combo',
    title: 'Комбо недели',
    subtitle: 'Вок + напиток + закуска со скидкой 25%',
    cta: 'Собрать комбо',
    ctaCategory: 'wok',
    gradient: ['#E11D2A', '#8E0F17'],
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=900&q=80',
  },
  {
    id: 'first-order',
    title: 'Скидка на первый заказ',
    subtitle: '−1500 ₸ по промокоду VOKU на заказ от 4990 ₸',
    cta: 'Открыть меню',
    ctaCategory: 'all',
    gradient: ['#10245C', '#1B3A8C'],
    image: 'https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=900&q=80',
  },
  {
    id: 'new-menu',
    title: 'Новое меню уже здесь',
    subtitle: 'Сычуаньская кухня и авторские соусы',
    cta: 'Попробовать',
    ctaCategory: 'rice',
    gradient: ['#E1631D', '#B3121D'],
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=900&q=80',
  },
  {
    id: 'noodles',
    title: 'Любимая лапша',
    subtitle: 'Удон, рамен и рисовая лапша от 1890 ₸',
    cta: 'Выбрать лапшу',
    ctaCategory: 'noodles',
    gradient: ['#1864AB', '#0B1F51'],
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=900&q=80',
  },
];
