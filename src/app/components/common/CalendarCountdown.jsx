'use client';

import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

import { splitDuration } from '@/utils';
import styles from '@/styles/components/common/CalendarCountdown.module.scss';

const CalendarCountdown = ({ className }) => {
  const [timeUnits, setTimeUnits] = useState(() =>
    splitDuration('2024-12-01 00:00'),
  );
  const timerRef = useRef();

  useEffect(() => {
    const fn = () => {
      clearTimeout(timerRef.current);

      timerRef.current = setTimeout(() => {
        const newDuration = splitDuration('2024-12-01 00:00');
        setTimeUnits(newDuration);
        fn();
      }, 1000);
    };

    timerRef.current = setTimeout(() => fn(), 1000);

    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <div className={clsx(styles.wrapper, className)}>
      <div className={styles.container}>
        <span className={styles.column}>
          <span className={styles.value}>{timeUnits.days}</span>
          <span className={styles.label}>Днів</span>
        </span>
        <span className={styles.dots} />
        <span className={styles.column}>
          <span className={styles.value}>{timeUnits.hours}</span>
          <span className={styles.label}>Годин</span>
        </span>
        <span className={styles.dots} />
        <span className={styles.column}>
          <span className={styles.value}>{timeUnits.minutes}</span>
          <span className={styles.label}>Хвилин</span>
        </span>
        <span className={styles.dots} />
        <span className={styles.column}>
          <span className={styles.value}>{timeUnits.seconds}</span>
          <span className={styles.label}>Секунд</span>
        </span>
      </div>
    </div>
  );
};

export default CalendarCountdown;
