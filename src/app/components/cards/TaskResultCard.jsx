import Image from 'next/image';
import clsx from 'clsx';

import styles from '@/styles/components/cards/TaskResultCard.module.scss';

const TaskResultCard = () => {
  return (
    <div className={styles.card}>
      <Image
        className={styles.portalImg}
        src="/images/portals/portal-desktop.png"
        width={384}
        height={419}
        alt="Портал"
      />
      <div className={styles.container}>
        <p className={styles.text}>
          Оце так майстерність! Ви не просто відгадали шифр, ви його розплутали,
          як клубок ниток після котячих ігор! Математика — це вам не жарти, але
          ви впоралися на всі сто!
        </p>
        <p className={styles.text}>
          Тепер ви математичні генії, а ваше логічне мислення — гостре, як зуб у
          акули! Додавання, віднімання, множення — тепер для вас це простіше,
          ніж надути повітряну кульку. І все це не просто так! Бо наш телепорт
          сам себе не побудує, а з такими геніями, як ви, жодні задачі нас не
          зупинять!
        </p>
        <p className={styles.text}>
          Так тримати, розумники! Попереду ще більше викликів, але з вами — хоч
          у темряву, хоч на Марс!
        </p>
        <p className={styles.text}>
          Так тримати, розумники! Попереду ще більше викликів, але з вами — хоч
          у темряву, хоч на Марс!
        </p>
        <p className={styles.text}>
          Так тримати, розумники! Попереду ще більше викликів, але з вами — хоч
          у темряву, хоч на Марс!
        </p>
        <p className={styles.text}>
          Так тримати, розумники! Попереду ще більше викликів, але з вами — хоч
          у темряву, хоч на Марс!
        </p>
      </div>
    </div>
  );
};

export default TaskResultCard;
