import Link from 'next/link';
import { Controller } from 'react-hook-form';
import clsx from 'clsx';

import { Button, GoogleButton, TextInputField } from '@/components';
import { CirclePasswordSvg, MailSvg } from '@/svgs';
import styles from '@/styles/components/forms/AuthForm.module.scss';

const LoginForm = ({ formControl, isLoading, loginGoogleHref, onSubmit }) => {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div>
        <h2 className={styles.title}>Вхід</h2>
        <p className={styles.text}>
          Увійди, щоб взаємодіяти з календарем та взяти участь у розіграші
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

          <Link
            className={clsx(styles.link, styles.topIndent)}
            href="/reset-password">
            Забули пароль?
          </Link>
        </div>
      </div>

      <div className={clsx(styles.actions, styles.vertical)}>
        <Button type="submit" isLoading={isLoading}>
          Продовжити
        </Button>
        <span className={styles.labelSeparator}>Або</span>
        <GoogleButton href={loginGoogleHref} />
      </div>
    </form>
  );
};

export default LoginForm;
