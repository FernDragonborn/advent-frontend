import clsx from 'clsx';

import { Loader } from '@/components';
import { ArrowLeftSvg, ArrowRightSvg } from '@/assets/images/svgs';
import styles from '@/styles/components/buttons/Button.module.scss';

const Button = ({
  className,
  size = 'medium',
  as: Component = 'button',
  disabled,
  isLoading,
  appearance = 'blue',
  children,
  arrowPosition = 'right', // left right none
  ...otherProps
}) => {
  return (
    <Component
      className={clsx(
        styles.button,
        size === 'large' && styles.large,
        size === 'small' && styles.small,
        appearance === 'blue' && styles.blue,
        appearance === 'orange' && styles.orange,
        appearance === 'bordered' && styles.bordered,
        appearance === 'transparent' && styles.transparent,
        disabled && styles.disabled,
        className,
      )}
      disabled={disabled || isLoading}
      aria-disabled={disabled || isLoading}
      tabIndex={disabled || isLoading ? -1 : undefined}
      type={Component === 'button' ? 'button' : undefined}
      {...otherProps}>
      {arrowPosition === 'left' && (
        <ArrowLeftSvg className={styles.icon} width={16} height={16} />
      )}
      <span>{children}</span>
      {arrowPosition === 'right' && (
        <ArrowRightSvg className={styles.icon} width={16} height={16} />
      )}
      {isLoading && (
        <Loader className={styles.loader} size={'small'} color="currentColor" />
      )}
    </Component>
  );
};

Button.propTypes = {};

export default Button;
