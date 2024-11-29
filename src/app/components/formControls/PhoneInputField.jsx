'use client';

import MaskedInput from 'react-text-mask';
import clsx from 'clsx';

import { SmartPhoneSvg } from '@/assets/images/svgs';
import {
  FIXED_PHONE_MASK_CHARACTER_NUMBER,
  PHONE_INPUT_MASK,
} from '@/constants';
import { formatPhone } from '@/utils';
import styles from '@/styles/components/formControls/PhoneInputField.module.scss';

const PhoneInputField = ({
  label,
  name,
  error,
  disabled,
  placeholder,
  hint,
  ref,
  ...props
}) => {
  const inputValue = String(props?.value);

  return (
    <div
      className={clsx(
        styles.wrapper,
        disabled && styles.disabled,
        !!error && styles.hasError,
      )}>
      <label className={styles.label} htmlFor={name}>
        <SmartPhoneSvg className={styles.icon} width={20} height={20} />
        {label || 'Номер'}
      </label>

      <div className={styles.inputWrapper}>
        <span className={styles.countryCode}>+38 (0</span>
        <MaskedInput
          {...props}
          onChange={({ currentTarget }) => {
            props?.onChange?.(formatPhone(currentTarget.value));
          }}
          value={inputValue.slice(FIXED_PHONE_MASK_CHARACTER_NUMBER)}
          className={styles.input}
          aria-invalid={error ? 'true' : 'false'}
          id={name}
          name={name}
          placeholder={placeholder || '99) 999 9999'}
          type="tel"
          mask={PHONE_INPUT_MASK}
          guide={true}
          placeholderChar="-"
        />
      </div>

      {error?.message && (
        <p className={styles.error} role="alert">
          {error.message}
        </p>
      )}

      {hint && <p className={styles.hint}>{hint}</p>}
    </div>
  );
};

export default PhoneInputField;
