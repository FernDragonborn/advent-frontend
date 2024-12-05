import Image from 'next/image';
import clsx from 'clsx';

import styles from '@/styles/components/cards/TaskResultCard.module.scss';

const TaskResultCard = ({ text, imgSrc }) => {
  return (
    <div className={styles.card}>
      <Image
        className={styles.portalImg}
        src={imgSrc}
        width={384}
        height={419}
        alt="Портал"
      />
      <div className={styles.container}>
        {text?.split('\r\n')?.map?.(val => (
          <p key={val} className={styles.text}>
            {val}
          </p>
        ))}
      </div>
    </div>
  );
};

export default TaskResultCard;
