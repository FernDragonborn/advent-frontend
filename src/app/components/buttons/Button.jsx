import clsx from 'clsx';
import Link from 'next/link';
import PropTypes from 'prop-types';

import styles from '@/styles/components/buttons/Button.module.scss';

const Button = ({
  className,
  appearance,
  isLoading,
  children,
  isLink,
  iconAfter,
  disabled,
  onClick,
  ...otherProps
}) => {
  const Component = isLink ? Link : 'button';

  return (
    <Component
      className={clsx(
        styles.button,
        appearance === 'yellow' && styles.yellow,
        appearance === 'pink' && styles.pink,
        appearance === 'red' && styles.red,
        appearance === 'white' && styles.white,
        disabled && styles.disabled,
        className,
      )}
      onClick={!disabled && !isLoading ? onClick : undefined}
      disabled={isLoading || disabled}
      {...otherProps}>
      {children && (
        <span className={clsx(styles.label, isLoading && styles.transparent)}>
          {children}
        </span>
      )}

      <span
        className={clsx(
          styles.itemAfterWrapper,
          isLoading && styles.transparent,
        )}>
        {iconAfter}
      </span>

      {/* {isLoading && (
        <Loader className={styles.loader} size={'small'} color="currentColor" />
      )} */}
    </Component>
  );
};

Button.propTypes = {};

export default Button;
