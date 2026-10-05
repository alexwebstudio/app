import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { TableProvider } from '@/context/TableContext';
import { AuthProvider } from '@/context/AuthContext';

export const metadata = {
  title: 'VOKU — ресторан китайской кухни',
  description: 'Лапша, вок, рис, супы и роллы. Заказ за столом по QR. Демо-прототип VOKU.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#10245c',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        <TableProvider>
          <AuthProvider>
            <CartProvider>{children}</CartProvider>
          </AuthProvider>
        </TableProvider>
      </body>
    </html>
  );
}
