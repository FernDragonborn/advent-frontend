import { Controller } from 'react-hook-form';

import { Button, TextInputField } from '@/components';
import { CirclePasswordSvg } from '@/svgs';
import styles from '@/styles/components/forms/AuthForm.module.scss';

const PasswordForm = ({ title, formControl, isLoading, onSubmit, onBack }) => {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div>
        <h2 className={styles.title}>{title || 'Пароль'}</h2>
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
              type="password"
              label="Пароль"
              placeholder="Введіть пароль"
              hint="Пароль має містити щонайменше 8 символів"
              iconComponent={CirclePasswordSvg}
              error={error}
              {...field}
            />
          )}
        />
        <Controller
          name="passwordConfirmation"
          control={formControl}
          render={({ field, fieldState: { error } }) => (
            <TextInputField
              type="password"
              label="Підтвердіть Пароль"
              placeholder="Введіть пароль"
              iconComponent={CirclePasswordSvg}
              error={error}
              {...field}
            />
          )}
        />
      </div>

      <div className={styles.actions}>
        <Button appearance="bordered" arrowPosition="left" onClick={onBack}>
          Назад
        </Button>
        <Button type="submit" isLoading={isLoading}>
          Продовжити
        </Button>
      </div>
    </form>
  );
};

export default PasswordForm;
