'use client';

import { CalendarCountdown } from '@/app/components';
import { SnowflakeSvg } from '@/assets/images/svgs';
import styles from '@/styles/pages/CalendarPage.module.scss';

export default function Page() {
  return (
    <main className={styles.wrapper}>
      <section className={styles.hero}>
        <h1 className={styles.title}>
          До відкриття{' '}
          <span>
            <SnowflakeSvg width={30} height={26} />
            адвент-календаря
          </span>
        </h1>

        <CalendarCountdown className={styles.countdown} />
      </section>
    </main>
  );
}
