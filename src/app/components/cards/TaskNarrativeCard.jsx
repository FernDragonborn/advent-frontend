import Image from 'next/image';

import styles from '@/styles/components/cards/TaskNarrativeCard.module.scss';

const TaskNarrativeCard = ({ imgSrc, data, text }) => {
  return (
    <div className={styles.card}>
      <Image
        className={styles.narrativeImg}
        src={imgSrc}
        width={290}
        height={295}
        alt="Картка"
      />

      <div className={styles.container}>
        {text?.split?.('\r\n')?.map?.(val => (
          <p key={val} className={styles.text}>
            {val}
          </p>
        ))}
        {data?.map?.(val => (
          <p key={val} className={styles.text}>
            {val}
          </p>
        ))}
      </div>
    </div>
  );
};

export default TaskNarrativeCard;
