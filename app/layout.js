import { Inter } from 'next/font/google';

import './globals.css';
import { Header } from '@/app/components/Header';
import { AppStyleProvider, ContextProvider, StoreProvider } from '@/app/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Invite Platform',
  description: 'Personalized invite platform'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
          integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className={inter.className}>
        <StoreProvider>
          <ContextProvider>
            <AppStyleProvider>
              <Header />
              {children}
            </AppStyleProvider>
          </ContextProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
