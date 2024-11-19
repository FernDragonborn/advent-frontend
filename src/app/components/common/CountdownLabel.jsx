'use client';

import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import { getDuration } from '@/utils';
import { CheerfulStarSvg } from '@/assets/images/svgs';
import styles from '@/styles/components/common/CountdownLabel.module.scss';

const CountdownLabel = ({ className }) => {
  const [formattedDuration, setFormattedDuration] = useState(() =>
    getDuration('2024-12-01 00:00'),
  );
  const timerRef = useRef();

  useEffect(() => {
    const fn = () => {
      clearTimeout(timerRef.current);

      timerRef.current = setTimeout(() => {
        const newDuration = getDuration('2024-12-01 00:00');
        setFormattedDuration(newDuration);
        fn();
      }, 1000);
    };

    timerRef.current = setTimeout(() => fn(), 1000);

    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <span className={clsx(styles.wrapper, className)}>
      <CheerfulStarSvg className={styles.icon} width={25} height={25} />
      До початку:{' '}
      <span className={styles.accent}>{formattedDuration || '-'}</span>
    </span>
  );
};

export default CountdownLabel;
