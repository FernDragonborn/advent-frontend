'use client';

import { useState } from 'react';
import clsx from 'clsx';

import styles from '@/styles/components/formControls/TextInputField.module.scss';
import { EyeSlashSvg, EyeSvg } from '@/assets/images/svgs';

const TextInputField = ({
  name,
  label,
  error,
  multiline,
  type,
  disabled,
  placeholder,
  iconComponent: Icon,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className={clsx(
        styles.wrapper,
        disabled && styles.disabled,
        !!error && styles.hasError,
      )}>
      {label && (
        <label className={styles.label} htmlFor={name}>
          {Icon && <Icon className={styles.icon} width={20} height={20} />}
          {label}
        </label>
      )}
      {multiline ? (
        <textarea
          {...props}
          className={styles.textarea}
          aria-invalid={error ? 'true' : 'false'}
          id={name}
          name={name}
          placeholder={placeholder}
        />
      ) : (
        <div className={styles.inputWrapper}>
          <input
            {...props}
            className={clsx(
              styles.input,
              type === 'password' && styles.hasIcon,
            )}
            aria-invalid={error ? 'true' : 'false'}
            id={name}
            name={name}
            placeholder={placeholder}
            type={type !== 'password' ? type : isVisible ? 'text' : 'password'}
          />

          {type === 'password' && (
            <button
              className={styles.visibilityToggler}
              type="button"
              onClick={() => setIsVisible(state => !state)}>
              {isVisible ? <EyeSlashSvg /> : <EyeSvg />}
            </button>
          )}
        </div>
      )}

      {error?.message && (
        <p className={styles.error} role="alert">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default TextInputField;
