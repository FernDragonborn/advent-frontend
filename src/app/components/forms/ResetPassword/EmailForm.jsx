'use client';

import { useRef, useState } from 'react';
import { Controller } from 'react-hook-form';

import { Button, Recaptcha, TextInputField } from '@/components';
import { MailSvg } from '@/svgs';
import styles from '@/styles/components/forms/AuthForm.module.scss';

const ResetPasswordEmailForm = ({
  formControl,
  isLoading,
  onSubmit,
  onBack,
}) => {
  const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false);
  const recaptchaRef = useRef(null);

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div>
        <h2 className={styles.title}>Твоя пошта</h2>
        <p className={styles.text}>Додай пошту для відновлення паролю</p>
      </div>

      <Controller
        name="email"
        control={formControl}
        render={({ field, fieldState: { error } }) => (
          <TextInputField
            type="email"
            label="Електронна пошта"
            placeholder="Твій Е-мейл"
            iconComponent={MailSvg}
            error={error}
            {...field}
          />
        )}
      />

      <Recaptcha ref={recaptchaRef} setIsVerified={setIsRecaptchaVerified} />

      <div className={styles.actions}>
        <Button appearance="bordered" arrowPosition="left" onClick={onBack}>
          Назад
        </Button>
        <Button
          type="submit"
          isLoading={isLoading}
          disabled={!isRecaptchaVerified}>
          Продовжити
        </Button>
      </div>
    </form>
  );
};

export default ResetPasswordEmailForm;
