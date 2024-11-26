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
      old_password: '',
      new_password: '',
      password_confirmation: '',
    },
  });

  const passwordMutation = useAuthMutation({
    mutationFn: api.auth.changePassword,
    onSuccess: () => reset(),
    onError: ({ data }) => {
      Object.entries(data).forEach(([key, val]) =>
        setError(key, { message: val?.join('. ') }),
      );
    },
  });

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(passwordMutation.mutate)}>
      <h2 className={styles.title}>Пароль</h2>

      <div className={styles.inputs}>
        <Controller
          name="old_password"
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
          name="new_password"
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
          name="password_confirmation"
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
