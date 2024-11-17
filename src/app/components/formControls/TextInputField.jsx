'use client';

import { forwardRef, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import styles from '@/styles/components/formControls/TextInputField.module.scss';

const TextInputField = (
  { name, label, error, multiline, type, disabled, ...props },
  ref,
) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className={clsx(styles.wrapper, disabled && styles.disabled)}>
      {label && (
        <label className={styles.label} htmlFor={name}>
          {label}
        </label>
      )}
      {multiline ? (
        <textarea
          className={clsx(styles.textarea, !!error && styles.hasError)}
          ref={ref}
          aria-invalid={error ? 'true' : 'false'}
          id={name}
          name={name}
          {...props}
        />
      ) : (
        <div className={styles.inputWrapper}>
          <input
            {...props}
            className={clsx(styles.input, !!error && styles.hasError)}
            ref={ref}
            aria-invalid={error ? 'true' : 'false'}
            id={name}
            name={name}
            type={type !== 'password' ? type : isVisible ? 'text' : 'password'}
          />

          {type === 'password' && (
            <button
              className={styles.visibilityToggler}
              type="button"
              onClick={() => setIsVisible(state => !state)}>
              {/* {isVisible ? <SolarEyeClosedLinearSvg /> : <VuesaxLinearEyeSvg />} */}
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

TextInputField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.object,
  disabled: PropTypes.bool,
  multiline: PropTypes.bool,
};

export default forwardRef(TextInputField);
