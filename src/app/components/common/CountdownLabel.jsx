'use client';

import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import { getDuration } from '@/utils';
import { CheerfulStarSvg } from '@/assets/images/svgs';
import styles from '@/styles/components/common/CountdownLabel.module.scss';

const startDate = '2024-12-01 00:00';

const CountdownLabel = ({ className, onComplete }) => {
  const [formattedDuration, setFormattedDuration] = useState('');
  const timerRef = useRef();

  useEffect(() => {
    const updateDuration = () => {
      const newDuration = getDuration(startDate);
      setFormattedDuration(newDuration);
      newDuration ? setNewTimeout() : onComplete?.();
    };

    const setNewTimeout = () => {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        updateDuration();
      }, 1000);
    };

    setNewTimeout();
    updateDuration();

    return () => clearTimeout(timerRef.current);
  }, [onComplete]);

  return (
    <span className={clsx(styles.wrapper, className)}>
      <CheerfulStarSvg className={styles.icon} width={25} height={25} />
      До початку:{' '}
      <span className={styles.accent}>{formattedDuration || '-'}</span>
    </span>
  );
};

export default CountdownLabel;
