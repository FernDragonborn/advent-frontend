import clsx from 'clsx';

import { GiftSvg } from '@/assets/images/svgs';
import styles from '@/styles/components/common/UserScore.module.scss';

const UserScore = ({ className, score = 0 }) => {
  return (
    <span className={clsx(styles.score, className)}>
      <GiftSvg width={32} height={32} />
      {score}
    </span>
  );
};

export default UserScore;
