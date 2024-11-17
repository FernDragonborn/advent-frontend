'use client';

import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';

import styles from '@/styles/components/buttons/BackButton.module.scss';

const BackButton = () => {
  const router = useRouter();

  return (
    <button
      type="button"
      className={styles.button}
      onClick={() => router.back()}></button>
  );
};

BackButton.propTypes = {};

export default BackButton;
