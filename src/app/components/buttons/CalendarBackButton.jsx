'use client';

import { useRouter } from 'next/navigation';
import clsx from 'clsx';

import { GamingLeftArrow } from '@/svgs';
import styles from '@/styles/components/buttons/CalendarBackButton.module.scss';

const CalendarBackButton = ({ className, onClick }) => {
  const router = useRouter();

  const navigateBack = () => router.back();

  return (
    <button
      type="button"
      className={clsx(styles.button, className)}
      onClick={onClick || navigateBack}>
      <GamingLeftArrow width={58} height={48} />
    </button>
  );
};

export default CalendarBackButton;
