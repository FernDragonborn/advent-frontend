import localFont from 'next/font/local';
import clsx from 'clsx';

import { FacebookPixel, Providers } from '@/components';
import '@/styles/globals.scss';

const basisGrotesquePro = localFont({
  src: [
    {
      path: '../assets/fonts/BasisGrotesquePro-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/BasisGrotesquePro-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../assets/fonts/BasisGrotesquePro-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-grotesque',
});

export const metadata = {
  title: 'Адвент календар',
  other: {
    'facebook-domain-verification': 'ukanufznt9fsjph0qihebc1ytsh4wv',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="uk" className={clsx(basisGrotesquePro.variable)}>
      <body>
        <Providers>{children}</Providers>
        <FacebookPixel />
        <div id="modal-root" />
      </body>
    </html>
  );
}
