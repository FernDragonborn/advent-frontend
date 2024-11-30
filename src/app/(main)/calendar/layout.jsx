'use client';

import { useParams } from 'next/navigation';

import { CalendarBackButton, HeroSection } from '@/components';
import styles from '@/styles/layouts/CalendarLayout.module.scss';

export default function Layout({ children }) {
  const { dayId } = useParams();

  return (
    <main className={styles.wrapper}>
      <HeroSection>
        <div className={styles.container}>
          {/* <CalendarBackButton /> */}

          <h1 className={styles.title}>День {dayId}</h1>
          {children}
        </div>
      </HeroSection>
    </main>
  );
}
