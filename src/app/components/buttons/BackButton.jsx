'use client';

import { useRouter } from 'next/navigation';

import { ArrowLeftSvg } from '@/assets/images/svgs';
import styles from '@/styles/components/buttons/BackButton.module.scss';

const BackButton = ({ label, onClick }) => {
  const router = useRouter();

  const navigateBack = () => router.back();

  return (
    <button
      type="button"
      className={styles.button}
      onClick={onClick || navigateBack}>
      <ArrowLeftSvg width={16} height={16} />
      {label}
    </button>
  );
};

export default BackButton;
