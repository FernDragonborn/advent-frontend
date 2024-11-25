import { PuffLoader } from 'react-spinners';
import clsx from 'clsx';

import styles from '@/styles/components/common/Loader.module.scss';

const Loader = ({ className, size = 'medium', ...otherProps }) => {
  return (
    <div className={clsx(styles.wrapper, className)}>
      <PuffLoader
        color="var(--color-accent-blue)"
        size={size === 'small' ? 30 : size === 'large' ? 80 : 50}
        {...otherProps}
      />
    </div>
  );
};

export default Loader;
