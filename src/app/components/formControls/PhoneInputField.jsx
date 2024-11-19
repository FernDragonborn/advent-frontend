'use client';

import MaskedInput from 'react-text-mask';
import clsx from 'clsx';

import styles from '@/styles/components/formControls/PhoneInputField.module.scss';
import { SmartPhoneSvg } from '@/assets/images/svgs';
import { PHONE_MASK } from '@/constants';

const PhoneInputField = ({
  label,
  name,
  error,
  disabled,
  placeholder,
  ref,
  ...props
}) => {
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

      <MaskedInput
        {...props}
        className={styles.input}
        aria-invalid={error ? 'true' : 'false'}
        id={name}
        name={name}
        placeholder={placeholder || 'Твій номер'}
        type="tel"
        mask={PHONE_MASK}
        guide={true}
        placeholderChar="-"
      />

      {error?.message && (
        <p className={styles.error} role="alert">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default PhoneInputField;
