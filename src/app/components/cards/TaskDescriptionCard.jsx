import Image from 'next/image';

import styles from '@/styles/components/cards/TaskDescriptionCard.module.scss';
import { TextInputField } from '@/app/components';
import { ArrowLeftSvg, ArrowRightSvg } from '@/assets/images/svgs';

const TaskDescriptionCard = ({ imgSrc }) => {
  return (
    <div className={styles.card}>
      <div className={styles.images}>
        <Image
          className={styles.taskImg}
          src={imgSrc}
          width={1100}
          height={620}
          alt="Завдання"
        />
        <Image
          className={styles.taskImg}
          src={imgSrc}
          width={1100}
          height={620}
          alt="Завдання"
        />
      </div>

      <div className={styles.container}>
        <div className={styles.pagination}>
          <button
            className={styles.paginationBtn}
            type="button"
            onClick={() => null}>
            <span>
              <ArrowRightSvg width={20} height={20} />
            </span>
          </button>

          <div className={styles.paginationDots}>
            <span />
            <span className={styles.isActive} />
            <span />
          </div>

          <button
            className={styles.paginationBtn}
            type="button"
            onClick={() => null}>
            <span>
              <ArrowRightSvg width={20} height={20} />
            </span>
          </button>
        </div>
        <TextInputField placeholder="Введіть відповідь" />
      </div>
    </div>
  );
};

export default TaskDescriptionCard;
