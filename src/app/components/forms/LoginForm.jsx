import Link from 'next/link';
import { Controller } from 'react-hook-form';

import { Button, TextInputField } from '@/components';
import { CirclePasswordSvg, MailSvg } from '@/svgs';
import styles from '@/styles/components/forms/AuthForm.module.scss';
import clsx from 'clsx';

const LoginForm = ({ formControl, onSubmit }) => {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div>
        <h2 className={styles.title}>Вхід</h2>
        <p className={styles.text}>
          Увійди щоб взаємодіяти з календарем та взяти участь у розіграші
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
              placeholder="Твій Е-мейл"
              iconComponent={MailSvg}
              error={error}
              {...field}
            />
          )}
        />
        <div>
          <Controller
            name="password"
            control={formControl}
            render={({ field, fieldState: { error } }) => (
              <TextInputField
                type="password"
                label="Пароль"
                placeholder="Введіть пароль"
                iconComponent={CirclePasswordSvg}
                error={error}
                {...field}
              />
            )}
          />

          <Link
            className={clsx(styles.link, styles.topIndent)}
            href="/reset-password">
            Забули пароль?
          </Link>
        </div>
      </div>

      <div className={styles.actions}>
        <Button type="submit">Продовжити</Button>
      </div>
    </form>
  );
};

export default LoginForm;
