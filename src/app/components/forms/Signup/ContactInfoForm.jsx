import { Controller } from 'react-hook-form';
import clsx from 'clsx';

import { Button, PhoneInputField, TextInputField } from '@/components';
import { MailSvg } from '@/svgs';
import styles from '@/styles/components/forms/AuthForm.module.scss';

const ContactInfoForm = ({ formControl, onSubmit, onBack }) => {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div>
        <h2 className={styles.title}>Твоя пошта</h2>
        <p className={styles.text}>
          Додай пошту яку ти часто відкриваєш, щоб не пропустити сповіщення.
        </p>
        <p className={styles.text}>
          Якщо не маєш власної, це може бути пошта батьків.
        </p>
      </div>

      <div className={styles.inputs}>
        <Controller
          name="email"
          control={formControl}
          render={({ field, fieldState: { error } }) => (
            <TextInputField
              type="email"
              label="Електронна пошта"
              placeholder="user@gmail.com"
              iconComponent={MailSvg}
              error={error}
              {...field}
            />
          )}
        />
        <div>
          <Controller
            name="phone_number"
            control={formControl}
            render={({ field, fieldState: { error } }) => (
              <PhoneInputField error={error} {...field} />
            )}
          />
          <p className={clsx(styles.text, styles.details)}>
            Він потрібен для того, щоб за необхідності зв&apos;язатись з тобою в
            разі виграшу
          </p>
        </div>
      </div>

      <div className={styles.actions}>
        <Button appearance="bordered" arrowPosition="left" onClick={onBack}>
          Назад
        </Button>
        <Button type="submit">Продовжити</Button>
      </div>
    </form>
  );
};

export default ContactInfoForm;
