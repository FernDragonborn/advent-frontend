import { Roboto, Poppins } from 'next/font/google';
import localFont from 'next/font/local';
import clsx from 'clsx';

import { Providers } from '@/components';
import '@/styles/globals.scss';

const roboto = Roboto({
  variable: '--font-roboto',
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  style: ['normal'],
  display: 'swap',
});

const poppins = Poppins({
  variable: '--font-poppins',
  weight: ['400', '500'],
  subsets: ['latin'],
  style: ['normal'],
  display: 'swap',
});

// const almaz = localFont({
//   src: [
//     {
//       path: '../assets/fonts/Almaz-Medium.ttf',
//       weight: '500',
//       style: 'normal',
//     },
//     {
//       path: '../assets/fonts/Almaz-ExtraBold.ttf',
//       weight: '800',
//       style: 'normal',
//     },
//   ],
//   variable: '--font-almaz',
// });

export const metadata = {
  title: 'Адвент календар',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={clsx(roboto.variable, poppins.variable)}>
      <body>
        <Providers>{children}</Providers>
        <div id="modal-root" />
      </body>
    </html>
  );
}
