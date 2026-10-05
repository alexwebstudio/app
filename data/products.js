// Демонстрационный каталог блюд.
// Данные вынесены отдельно от JSX — легко заменить ответом от API.
//
//  - category  — определяет иконку-плейсхолдер (components/Icons.js)
//  - gradient  — фирменный фон плейсхолдера (виден, пока/если фото не загрузилось)
//  - image     — демонстрационное фото со стока Unsplash (https://unsplash.com),
//                временное, не является собственной фотографией ресторана.
//  - price     — цена в тенге (₸)

export const products = [
  {
    id: 'wok-chicken',
    name: 'Вок с курицей терияки',
    description:
      'Пшеничная лапша вок, обжаренная с куриным филе, болгарским перцем и фирменным соусом терияки. Подаётся с кунжутом и зелёным луком.',
    price: 2290,
    category: 'wok',
    gradient: ['#F26A4B', '#E11D2A'],
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&q=80',
  },
  {
    id: 'wok-beef',
    name: 'Вок с говядиной',
    description:
      'Рисовая лапша с мраморной говядиной, шампиньонами и овощами в устричном соусе. Насыщенный вкус и лёгкая острота.',
    price: 2790,
    category: 'wok',
    gradient: ['#FF8A5B', '#D7263D'],
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&q=80',
  },
  {
    id: 'noodles-veg',
    name: 'Лапша с овощами',
    description:
      'Удон с брокколи, морковью, стручковой фасолью и болгарским перцем. Вегетарианское блюдо с кунжутом и соевым соусом.',
    price: 1890,
    category: 'noodles',
    gradient: ['#4C6EF5', '#10245C'],
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&q=80',
  },
  {
    id: 'noodles-shrimp',
    name: 'Удон с креветками',
    description:
      'Пшеничная лапша с тигровыми креветками, чесноком и соусом чили. Ароматное блюдо для любителей морепродуктов.',
    price: 2990,
    category: 'noodles',
    gradient: ['#FF7A9C', '#E11D2A'],
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&q=80',
  },
  {
    id: 'rice-beef',
    name: 'Рис с говядиной по-сычуаньски',
    description:
      'Рассыпчатый рис с говядиной в остром сычуаньском соусе, зелёным луком и кунжутом. Ярко и пикантно.',
    price: 2490,
    category: 'rice',
    gradient: ['#5C7CFA', '#12327A'],
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600&q=80',
  },
  {
    id: 'rice-chicken',
    name: 'Рис с курицей и ананасом',
    description:
      'Жареный рис с куриным филе, ананасом, яйцом и зелёным горошком. Сбалансированный кисло-сладкий вкус.',
    price: 2190,
    category: 'rice',
    gradient: ['#FFB020', '#E1631D'],
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&q=80',
  },
  {
    id: 'soup-tomyum',
    name: 'Суп том-ям',
    description:
      'Острый суп на кокосовом молоке с креветками, грибами, лемонграссом и лаймом. Классика азиатской кухни.',
    price: 2390,
    category: 'soups',
    gradient: ['#FF6B4A', '#B3121D'],
    image: 'https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=600&q=80',
  },
  {
    id: 'soup-wonton',
    name: 'Суп с вонтонами',
    description:
      'Прозрачный бульон с пельменями вонтон, зелёным луком и имбирём. Лёгкое и согревающее блюдо.',
    price: 1790,
    category: 'soups',
    gradient: ['#4DABF7', '#10245C'],
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80',
  },
  {
    id: 'snack-dumplings',
    name: 'Димсам (6 шт.)',
    description:
      'Пельмени на пару с сочной начинкой из свинины и креветок. Подаются с соевым соусом.',
    price: 1590,
    category: 'snacks',
    gradient: ['#FF922B', '#D7263D'],
    image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=600&q=80',
  },
  {
    id: 'snack-rolls',
    name: 'Спринг-роллы (4 шт.)',
    description:
      'Хрустящие роллы с овощами и сладким соусом чили. Идеальная закуска к основному блюду.',
    price: 1390,
    category: 'snacks',
    gradient: ['#69DB7C', '#1B7A3D'],
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80',
  },
  {
    id: 'drink-bubble',
    name: 'Bubble tea манго',
    description:
      'Молочный чай с тапиокой и вкусом спелого манго. Освежающий и в меру сладкий напиток.',
    price: 1290,
    category: 'drinks',
    gradient: ['#FFC078', '#E8590C'],
    image: 'https://images.unsplash.com/photo-1558857563-b371033873b8?w=600&q=80',
  },
  {
    id: 'drink-tea',
    name: 'Улун холодный',
    description:
      'Освежающий китайский чай улун со льдом и лаймом. Тонизирует и хорошо сочетается с острыми блюдами.',
    price: 890,
    category: 'drinks',
    gradient: ['#4DABF7', '#1864AB'],
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80',
  },
];
