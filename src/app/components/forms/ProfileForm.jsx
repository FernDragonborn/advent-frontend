'use client';

import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';

import { Button, PhoneInputField, TextInputField } from '@/components';
import { profileSchema } from '@/schemas';
import { useAuthMutation, useFetchProfile } from '@/hooks';
import { api } from '@/services';
import { BuildingSvg, HomeSvg, MailSvg, RulerPenSvg, UserSvg } from '@/svgs';
import styles from '@/styles/components/forms/ProfileForm.module.scss';

const ProfileForm = () => {
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      name: '',
      address: '',
      class: '',
      email: '',
      phone: '',
      region: '',
    },
  });

  const queryClient = useQueryClient();

  const profileQuery = useFetchProfile();
  const profileMutation = useAuthMutation({
    mutationFn: api.auth.updateUser,
    onSuccess: () => queryClient.refetchQueries({ queryKey: ['profile'] }),
  });

  useEffect(() => {
    const { dto } = profileQuery.data || {};
    if (!dto) {
      return;
    }
    // reset({ ...dto, phone: formatPhone(dto?.phoneNumber) });
  }, [profileQuery?.data]);

  return (
    <form className={styles.form} onSubmit={handleSubmit(console.log)}>
      <h2 className={styles.title}>Загальна інформація</h2>

      <div className={styles.inputs}>
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextInputField
              label="ПІБ"
              placeholder="Іваненко Іван Іванович"
              iconComponent={UserSvg}
              error={error}
              {...field}
            />
          )}
        />
        <Controller
          name="address"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextInputField
              label="Адреса"
              placeholder="вул. Залізнична 23 м. Рівне"
              iconComponent={HomeSvg}
              error={error}
              {...field}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
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
        <Controller
          name="phone"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <PhoneInputField error={error} {...field} />
          )}
        />
        <Controller
          name="region"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextInputField
              label="Область проживання"
              placeholder="Рівненська"
              iconComponent={BuildingSvg}
              error={error}
              {...field}
            />
          )}
        />
        <Controller
          name="class"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextInputField
              label="Клас"
              placeholder="1-12"
              iconComponent={RulerPenSvg}
              error={error}
              {...field}
            />
          )}
        />
      </div>

      <div className={styles.actions}>
        <Button
          appearance="bordered"
          arrowPosition="left"
          onClick={() => reset()}>
          Відмінити
        </Button>
        <Button type="submit" isLoading={profileMutation.isPending}>
          Зберегти
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;
