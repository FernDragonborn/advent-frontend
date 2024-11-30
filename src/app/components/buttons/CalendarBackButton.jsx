'use client';

import { useRouter } from 'next/navigation';

import { GamingLeftArrow } from '@/svgs';
import styles from '@/styles/components/buttons/CalendarBackButton.module.scss';

const CalendarBackButton = ({ onClick }) => {
  const router = useRouter();

  const navigateBack = () => router.back();

  return (
    <button
      type="button"
      className={styles.button}
      onClick={onClick || navigateBack}>
      <GamingLeftArrow width={58} height={48} />
    </button>
  );
};

export default CalendarBackButton;
