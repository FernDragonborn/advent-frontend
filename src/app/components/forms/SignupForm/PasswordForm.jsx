import { Controller } from 'react-hook-form';

import { Button, TextInputField } from '@/components';
import { CirclePasswordSvg } from '@/svgs';
import styles from '@/styles/components/forms/SignupForm.module.scss';

const PasswordForm = ({ formControl, onSubmit, onBack }) => {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div>
        <h2 className={styles.title}>Пароль</h2>
        <p className={styles.text}>
          Вигадай пароль, щоб відкривати календар пізніше.
        </p>
      </div>

      <div className={styles.inputs}>
        <Controller
          name="password"
          control={formControl}
          render={({ field, fieldState: { error } }) => (
            <TextInputField
              label="Пароль"
              placeholder="Введіть пароль"
              iconComponent={CirclePasswordSvg}
              error={error}
              type="password"
              {...field}
            />
          )}
        />
        <Controller
          name="password-confirmation"
          control={formControl}
          render={({ field, fieldState: { error } }) => (
            <TextInputField
              label="Підтвердіть Пароль"
              placeholder="Введіть пароль"
              iconComponent={CirclePasswordSvg}
              error={error}
              type="password"
              {...field}
            />
          )}
        />
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

export default PasswordForm;
