import { Controller } from 'react-hook-form';
import clsx from 'clsx';

import { Button, TextInputField } from '@/components';
import { MailSvg, SmartPhoneSvg } from '@/svgs';
import styles from '@/styles/components/forms/SignupForm.module.scss';

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
              label="Електронна пошта"
              placeholder="Твій Е-мейл"
              iconComponent={MailSvg}
              error={error}
              {...field}
            />
          )}
        />
        <div>
          <Controller
            name="phone"
            control={formControl}
            render={({ field, fieldState: { error } }) => (
              <TextInputField
                label="Номер"
                placeholder="Твій номер"
                iconComponent={SmartPhoneSvg}
                error={error}
                {...field}
              />
            )}
          />
          <p className={clsx(styles.text, styles.alignLeft)}>
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
