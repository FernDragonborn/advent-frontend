import Link from 'next/link';

import { Button } from '@/components';
import styles from '@/styles/components/layout/CalendarPromo.module.scss';
import Image from 'next/image';

const CalendarPromo = ({}) => {
  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>Приєднуйся!</h2>
      <p className={styles.text}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
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
