'use client';

import clsx from 'clsx';
import { useLayoutEffect, useRef, useState } from 'react';

import { splitDuration } from '@/utils';
import { EVENT_START_DATE } from '@/constants';
import styles from '@/styles/components/common/CalendarCountdown.module.scss';

const CalendarCountdown = ({ className }) => {
  const [timeUnits, setTimeUnits] = useState({});
  const timerRef = useRef();

  useLayoutEffect(() => {
    const startCountdown = () => {
      clearTimeout(timerRef.current);

      timerRef.current = setTimeout(() => {
        const newDuration = splitDuration(EVENT_START_DATE, 'YYYY-MM-DD HH:mm');
        setTimeUnits(newDuration);
        startCountdown();
      }, 1000);
    };

    startCountdown();
    setTimeUnits(splitDuration(EVENT_START_DATE, 'YYYY-MM-DD HH:mm'));

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
