import clsx from 'clsx';

import { TickSvg } from '@/svgs';
import styles from '@/styles/components/formControls/Checkbox.module.scss';

const Checkbox = ({ className, text, error, ...otherProps }) => {
  const isChecked = !!otherProps?.value;

  return (
    <div className={className}>
      <label className={clsx(styles.wrapper, isChecked && styles.checked)}>
        <input
          {...otherProps}
          checked={isChecked}
          className="visually-hidden"
          type="checkbox"
        />
        <span className={styles.box}>
          <TickSvg className={styles.icon} width={14} height={14} />
        </span>
        {text}
      </label>
      {error?.message && (
        <p className={styles.error} role="alert">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default Checkbox;
