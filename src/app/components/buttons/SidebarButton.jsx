import clsx from 'clsx';

import styles from '@/styles/components/buttons/SidebarButton.module.scss';

const SidebarButton = ({
  className,
  isActive,
  disabled,
  children,
  iconComponent: Icon,
  onClick,
  ...otherProps
}) => {
  return (
    <button
      className={clsx(
        styles.button,
        isActive && styles.active,
        disabled && styles.disabled,
        className,
      )}
      disabled={disabled}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : undefined}
      type={'button'}
      onClick={onClick}
      {...otherProps}>
      <Icon className={styles.icon} width={24} height={24} />
      {children}
    </button>
  );
};

export default SidebarButton;
