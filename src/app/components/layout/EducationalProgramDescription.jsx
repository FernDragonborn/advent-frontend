import Link from 'next/link';
import { getImageProps } from 'next/image';

import { Button } from '@/components';
import styles from '@/styles/components/layout/EducationalProgramDescription.module.scss';

const EducationalProgramDescription = () => {
  const common = { quality: 75, alt: 'Учень', sizes: '100vw' };
  const {
    props: { srcSet: desktop },
  } = getImageProps({
    ...common,
    width: 720,
    height: 482,
    src: '/images/educational-program/teacher-and-student-desktop.jpg',
  });
  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({
    ...common,
    width: 435,
    height: 350,
    src: '/images/educational-program/teacher-and-student-mobile.jpg',
  });

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          Програма «Освітній Суп» від ГО «Навчай для України»
        </h2>
        <p className={styles.text}>
          Покращити знання зі шкільних предметів за вісім тижнів додаткових
          занять? Все можливо із «Освітнім Супом»! Займайтеся із тьюторами або ж
          менторами у малих групах онлайн двічі на тиждень по 45 хвилин.
          Обирайте зручний час занять та бажаний предмет, і отримуйте
          безкоштовне навчання разом із вмотивованими однолітками.
        </p>
        <Button
          className={styles.btn}
          as={Link}
          href="https://teachforukraine.org/osvitnij-sup/"
          target="_blank"
          rel="noopener noreferrer nofollow">
          Зареєструватися на програму
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

export default EducationalProgramDescription;
