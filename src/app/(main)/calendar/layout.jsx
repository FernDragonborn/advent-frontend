'use client';

import { useLayoutEffect, useState } from 'react';

import { CalendarBackButton, HeroSection } from '@/components';
import styles from '@/styles/layouts/CalendarLayout.module.scss';

export default function Layout({ children }) {
  const [currentDay, setCurrentDay] = useState(0);

  useLayoutEffect(() => {
    setCurrentDay(new Date().getDate());
  }, []);

  return (
    <main className={styles.wrapper}>
      <HeroSection>
        <div className={styles.container}>
          {/* <CalendarBackButton /> */}
          <h1 className={styles.title}>День {currentDay}</h1>
          {children}
        </div>
      </HeroSection>
    </main>
  );
}
