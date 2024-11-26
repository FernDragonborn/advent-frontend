'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';

import { Loader } from '@/components';
import { ArrowDownSvg, CheckSvg } from '@/svgs';
import styles from '@/styles/components/formControls/Select.module.scss';

const Select = ({
  data = [],
  error,
  value,
  label,
  buttonLabel,
  appearance,
  isLoading,
  disabled,
  onChange,
  children,
  iconComponent: Icon,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleClick = () => {
      setIsMenuOpen(false);
    };
    if (isMenuOpen) {
      document.addEventListener('click', handleClick);
    }
    return () => document.removeEventListener('click', handleClick);
  }, [isMenuOpen]);

  return (
    <div className={clsx(styles.wrapper, !!error && styles.hasError)}>
      {label && (
        <label className={styles.label}>
          {Icon && <Icon className={styles.labelIcon} width={20} height={20} />}
          {label}
        </label>
      )}
      <div className={clsx(styles.container, isMenuOpen && styles.isOpen)}>
        <button
          className={clsx(
            styles.toggler,
            appearance === 'button' && styles.buttonAppearance,
            disabled && styles.disabled,
            !!value?.title && styles.hasValue,
          )}
          disabled={disabled}
          type="button"
          onClick={() => !disabled && setIsMenuOpen(state => !state)}>
          {value?.title || buttonLabel}
          <ArrowDownSvg
            className={clsx(styles.icon, styles.togglerIcon)}
            width={24}
            height={24}
          />
        </button>

        <ul className={styles.dropdownList}>
          {isLoading ? (
            <li>
              <Loader className={styles.loader} size="small" />
            </li>
          ) : data?.length ? (
            data.map(({ id, title }) => (
              <SelectOption
                key={id}
                isActive={value?.id === id}
                onSelect={() => onChange({ id, title })}>
                {title}
              </SelectOption>
            ))
          ) : children ? (
            children
          ) : (
            <li className={styles.notFoundItem}>Нічого не знайдено :(</li>
          )}
        </ul>
      </div>

      {error?.message && (
        <p className={styles.error} role="alert">
          {error.message}
        </p>
      )}
    </div>
  );
};

const SelectOption = ({ isActive, onSelect, children }) => {
  return (
    <li>
      <button
        className={clsx(
          styles.dropdownOptionButton,
          isActive && styles.isActive,
        )}
        type="button"
        onClick={onSelect}>
        <span>{children}</span>
        {isActive && (
          <CheckSvg className={styles.checkIcon} width={24} height={24} />
        )}
      </button>
    </li>
  );
};

Select.Option = SelectOption;

export default Select;
