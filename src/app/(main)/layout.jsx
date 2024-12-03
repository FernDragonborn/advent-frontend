'use client';

import { usePathname } from 'next/navigation';

import { Footer, Header } from '@/components';
import styles from '@/styles/layouts/MainLayout.module.scss';

export default function Layout({ children }) {
  const pathname = usePathname();

  return (
    <div className={styles.wrapper}>
      {!pathname.startsWith('/calendar/days/') && <Header />}
      {children}
      <Footer />
    </div>
  );
}
