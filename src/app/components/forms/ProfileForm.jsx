'use client';

import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';

import {
  Button,
  Loader,
  PhoneInputField,
  Select,
  TextInputField,
} from '@/components';
import { profileSchema } from '@/schemas';
import { useAuthMutation, useFetchProfile } from '@/hooks';
import { api } from '@/services';
import { formatPhone } from '@/utils';
import { GENDER } from '@/constants';
import { BuildingSvg, MailSvg, RulerPenSvg, UserSvg } from '@/svgs';
import styles from '@/styles/components/forms/ProfileForm.module.scss';

const genders = [
  { id: GENDER.MALE, title: 'Чоловік' },
  { id: GENDER.FEMALE, title: 'Жінка' },
];

const ProfileForm = () => {
  const { control, handleSubmit, reset, setError } = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      username: '',
      gender: '',
      grade: '',
      email: '',
      phone_number: '',
      region: '',
    },
  });

  const queryClient = useQueryClient();

  const profileQuery = useFetchProfile();
  const profileMutation = useAuthMutation({
    mutationFn: api.auth.updateUser,
    onSuccess: () => queryClient.refetchQueries({ queryKey: ['profile'] }),
    onError: ({ data }) =>
      Object.entries(data).map(([key, val]) =>
        setError(key, { message: val?.join('. ') }),
      ),
  });

  useEffect(() => {
    if (!profileQuery.data) {
      return;
    }
    reset({
      ...profileQuery.data,
      phone_number: formatPhone(profileQuery.data?.phone_number),
      gender: genders.find(val => val.id === profileQuery.data.gender),
    });
  }, [profileQuery?.data]);

  const onUpdateProfile = data =>
    profileMutation.mutate({ ...data, gender: data.gender?.id });

  return (
    <form className={styles.form} onSubmit={handleSubmit(onUpdateProfile)}>
      <h2 className={styles.title}>Загальна інформація</h2>

      {profileQuery.isLoading ? (
        <Loader className={styles.loader} size="large" />
      ) : (
        <>
          <div className={styles.inputs}>
            <Controller
              name="username"
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
              name="gender"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Select
                  label="Стать"
                  buttonLabel={'Оберіть стать'}
                  data={genders}
                  error={error}
                  iconComponent={UserSvg}
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
                  disabled
                  {...field}
                />
              )}
            />
            <Controller
              name="phone_number"
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
              name="grade"
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
        </>
      )}
    </form>
  );
};

export default ProfileForm;
