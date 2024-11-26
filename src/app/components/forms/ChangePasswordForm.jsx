'use client';

import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button, TextInputField } from '@/components';
import { CirclePasswordSvg } from '@/svgs';
import { changePasswordSchema } from '@/schemas';
import { useAuthMutation } from '@/hooks';
import { api } from '@/services';
import styles from '@/styles/components/forms/ChangePasswordForm.module.scss';

const ChangePasswordForm = () => {
  const { control, handleSubmit, reset, setError } = useForm({
    resolver: yupResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      passwordConfirmation: '',
    },
  });

  const passwordMutation = useAuthMutation({
    mutationFn: api.user.updatePassword,
    onSuccess: () => reset(),
    onError: ({ data }) => {
      // const [field, message] = error?.split?.('&') || [];
      // setError(field, { message });
    },
  });

  return (
    <form className={styles.form} onSubmit={handleSubmit(console.log)}>
      <h2 className={styles.title}>Пароль</h2>

      <div className={styles.inputs}>
        <Controller
          name="currentPassword"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextInputField
              type="password"
              label="Старий Пароль"
              placeholder="Введіть пароль"
              iconComponent={CirclePasswordSvg}
              error={error}
              {...field}
            />
          )}
        />
        <Controller
          name="newPassword"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextInputField
              type="password"
              label="Новий Пароль"
              placeholder="Введіть пароль"
              iconComponent={CirclePasswordSvg}
              error={error}
              {...field}
            />
          )}
        />
        <Controller
          name="passwordConfirmation"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextInputField
              type="password"
              label="Повтори Новий Пароль"
              placeholder="Введіть пароль"
              iconComponent={CirclePasswordSvg}
              error={error}
              {...field}
            />
          )}
        />
      </div>

      <Button
        className={styles.submitBtn}
        type="submit"
        isLoading={passwordMutation.isPending}>
        Зберегти
      </Button>
    </form>
  );
};

export default ChangePasswordForm;
