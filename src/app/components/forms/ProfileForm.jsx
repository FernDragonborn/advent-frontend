'use client';

import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button, PhoneInputField, TextInputField } from '@/components';
import { profileSchema } from '@/schemas';
import { BuildingSvg, HomeSvg, MailSvg, RulerPenSvg, UserSvg } from '@/svgs';
import styles from '@/styles/components/forms/ProfileForm.module.scss';

const ProfileForm = () => {
  const { control, handleSubmit } = useForm({
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
        <Button appearance="bordered" arrowPosition="left" onClick={() => null}>
          Відмінити
        </Button>
        <Button type="submit">Зберегти</Button>
      </div>
    </form>
  );
};

export default ProfileForm;
