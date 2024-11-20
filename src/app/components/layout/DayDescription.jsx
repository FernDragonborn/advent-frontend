import Link from 'next/link';
import { getImageProps } from 'next/image';

import { Button } from '@/components';
import styles from '@/styles/components/layout/DayDescription.module.scss';

const DayDescription = () => {
  const common = { quality: 75, alt: 'Учень', sizes: '100vw' };
  const {
    props: { srcSet: desktop },
  } = getImageProps({
    ...common,
    width: 720,
    height: 482,
    src: '/images/day-description/child-desktop.jpg',
  });
  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({
    ...common,
    width: 435,
    height: 350,
    src: '/images/day-description/child-mobile.jpg',
  });

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <h2 className={styles.title}>День третій</h2>
        <p className={styles.text}>
          Додай інформацію про себе щоб взаємодіяти з календарем та взяти участь
          у розіграші
        </p>
        <Button className={styles.btn} as={Link} href="/calendar">
          До календаря
        </Button>
      </div>

      <picture className={styles.picture}>
        <source media="(min-width: 1440px)" srcSet={desktop} />
        <source srcSet={mobile} />
        <img {...rest} alt="Учень" />
      </picture>
    </section>
  );
};

export default DayDescription;
