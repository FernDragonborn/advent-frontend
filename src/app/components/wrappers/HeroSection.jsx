import clsx from 'clsx';

import styles from '@/styles/components/wrappers/HeroSection.module.scss';

const HeroSection = ({ className, children }) => {
  return (
    <section className={clsx(styles.wrapper, className)}>{children}</section>
  );
};

export default HeroSection;
