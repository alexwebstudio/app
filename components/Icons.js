// Набор линейных иконок (инлайн-SVG, без внешних библиотек и без эмодзи).
// Все иконки одноцветные и наследуют currentColor.
const base = {
  width: 22,
  height: 22,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

const Svg = ({ children, ...props }) => (
  <svg {...base} {...props}>
    {children}
  </svg>
);

/* ---------- Логотип VOKU: пиала с палочками ---------- */
export function LogoMark(props) {
  return (
    <svg viewBox="0 0 48 48" fill="none" width={props.size || 30} height={props.size || 30} {...props}>
      <path
        d="M8 22h32a0 0 0 0 1 0 0v2c0 8.8-7.2 16-16 16S8 32.8 8 24v-2a0 0 0 0 1 0 0Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M12 28c3 2.4 8 3.6 12 3.6S33 30.4 36 28" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M20 6 30 18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M27 5 33 18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

/* ---------- Служебные ---------- */
export const CartIcon = (p) => (
  <Svg {...p}>
    <circle cx="9" cy="20" r="1.4" />
    <circle cx="18" cy="20" r="1.4" />
    <path d="M2 3h3l2.4 12.4a1.5 1.5 0 0 0 1.5 1.2h8.2a1.5 1.5 0 0 0 1.5-1.2L21 7H6" />
  </Svg>
);
export const UserIcon = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="8" r="3.6" />
    <path d="M5 20c0-3.6 3.1-5.6 7-5.6s7 2 7 5.6" />
  </Svg>
);
export const HomeIcon = (p) => (
  <Svg {...p}>
    <path d="M4 11l8-6 8 6" />
    <path d="M6 10v9h12v-9" />
  </Svg>
);
export const MenuIcon = (p) => (
  <Svg {...p}>
    <path d="M6 3h12a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
    <path d="M9 8h6M9 12h6M9 16h3" />
  </Svg>
);
export const PlusIcon = (p) => (
  <Svg {...p}>
    <path d="M12 5v14M5 12h14" />
  </Svg>
);
export const MinusIcon = (p) => (
  <Svg {...p}>
    <path d="M5 12h14" />
  </Svg>
);
export const CloseIcon = (p) => (
  <Svg {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </Svg>
);
export const TrashIcon = (p) => (
  <Svg width={18} height={18} {...p}>
    <path d="M4 7h16M9 7V5h6v2M6 7l1 12h10l1-12" />
  </Svg>
);
export const ChevronLeft = (p) => (
  <Svg {...p}>
    <path d="M15 5l-7 7 7 7" />
  </Svg>
);
export const ChevronRight = (p) => (
  <Svg {...p}>
    <path d="M9 5l7 7-7 7" />
  </Svg>
);
export const StarIcon = (p) => (
  <Svg {...p}>
    <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.7l5.9-.9z" />
  </Svg>
);
export const GiftIcon = (p) => (
  <Svg {...p}>
    <path d="M4 11h16v9H4z" />
    <path d="M2 7h20v4H2zM12 7v13" />
    <path d="M12 7C10.5 4 7 4 7 6.5 7 8 9.5 8 12 7ZM12 7c1.5-3 5-3 5-.5C17 8 14.5 8 12 7Z" />
  </Svg>
);
export const PhoneIcon = (p) => (
  <Svg {...p}>
    <path d="M6.5 3.5h4l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5l1.5-2 4 1.5v4c0 1-.8 1.8-1.8 1.7C11.5 24 3 15.5 4.8 5.3 5 4.3 5.6 3.5 6.5 3.5Z" />
  </Svg>
);
export const TableIcon = (p) => (
  <Svg {...p}>
    <path d="M3 9h18M4 9l1 4M20 9l-1 4M6 13v6M18 13v6M9 13v3h6v-3" />
  </Svg>
);
export const QrIcon = (p) => (
  <Svg {...p}>
    <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4z" />
    <path d="M14 14h2v2h-2zM18 14h2v2h-2zM14 18h2v2h-2zM18 18h2v2h-2z" />
  </Svg>
);
export const CheckIcon = (p) => (
  <Svg {...p}>
    <path d="M5 12.5l4.5 4.5L19 7" />
  </Svg>
);
export const InfoIcon = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5M12 8h.01" />
  </Svg>
);

/* ---------- Иконки категорий и блюд ---------- */
export const AllIcon = (p) => (
  <Svg {...p}>
    <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" />
  </Svg>
);
export const WokIcon = (p) => (
  <Svg {...p}>
    <path d="M3 11h16a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5Z" />
    <path d="M19 11l3-1.5M9 8c0-1.5 1.5-1.5 1.5-3M13 8c0-1.5 1.5-1.5 1.5-3" />
  </Svg>
);
export const NoodlesIcon = (p) => (
  <Svg {...p}>
    <path d="M4 11h13a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4Z" />
    <path d="M7 11c0-3 1-5 2-6M10 11c0-3 1-5 2-6M13 11c0-3 1-5 2-6" />
    <path d="M14 8l6-3" />
  </Svg>
);
export const RiceIcon = (p) => (
  <Svg {...p}>
    <path d="M4 12h14a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4Z" />
    <path d="M6 12c1.5-3 8.5-3 10 0" />
    <path d="M9 9.5h.01M12 8.5h.01M15 9.5h.01" />
  </Svg>
);
export const SoupIcon = (p) => (
  <Svg {...p}>
    <path d="M4 12h15a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5Z" />
    <path d="M2 20h20" />
    <path d="M9 8c0-1.2 1-1.2 1-2.4M13 8c0-1.2 1-1.2 1-2.4" />
  </Svg>
);
export const SnackIcon = (p) => (
  <Svg {...p}>
    <path d="M4 13a8 4 0 0 1 16 0Z" />
    <path d="M7 13c0-1.5.8-2.5 1.6-2.5M11 13c0-1.7.9-2.8 1.8-2.8M15 13c0-1.5.8-2.5 1.6-2.5" />
  </Svg>
);
export const DrinkIcon = (p) => (
  <Svg {...p}>
    <path d="M6 8h11l-1.2 11a2 2 0 0 1-2 1.8H9.2a2 2 0 0 1-2-1.8Z" />
    <path d="M8 8l1-3h6M9.5 13h.01M13 15h.01M11 17h.01" />
  </Svg>
);

// Карта иконок категорий по id.
export const categoryIcons = {
  all: AllIcon,
  wok: WokIcon,
  noodles: NoodlesIcon,
  rice: RiceIcon,
  soups: SoupIcon,
  snacks: SnackIcon,
  drinks: DrinkIcon,
};

// Иконка-плейсхолдер для блюда по категории (когда нет фото).
export function DishGlyph({ category, ...props }) {
  const Icon = categoryIcons[category] || NoodlesIcon;
  return <Icon {...props} />;
}
