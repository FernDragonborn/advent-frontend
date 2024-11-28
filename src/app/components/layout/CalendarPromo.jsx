import Link from 'next/link';
import Image from 'next/image';

import { Button } from '@/components';
import styles from '@/styles/components/layout/CalendarPromo.module.scss';

const CalendarPromo = () => {
  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>Приєднуйся!</h2>
      <p className={styles.text}>
        Як освітні посередники та вірні штурмани українського учнівства у
        навчальних пригодах, ми переконані, що якісна освіта та зацікавленість
        дітей у навчанні не повинні бути дивом! Проте саме диво історії може
        нагади дітям про природну спраглість до відкриттів.
      </p>
      <p className={styles.text}>
        Давайте разом напишемо історію освітнього дива у різдвяному
        адвент-календарі ❤️
      </p>

      <Button className={styles.btn} size="large" as={Link} href="/signup">
        Зареєструватись
      </Button>

      <div className={styles.imgWrapper}>
        <Image
          className={styles.img}
          src="/images/calendar-promo/child.png"
          width={327}
          height={367}
          alt="Учень"
        />
      </div>
    </section>
  );
};

export default CalendarPromo;
