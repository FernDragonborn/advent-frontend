import { Controller } from 'react-hook-form';

import { Button, TextInputField } from '@/components';
import { BuildingSvg, HomeSvg, RulerPenSvg, UserSvg } from '@/svgs';
import styles from '@/styles/components/forms/AuthForm.module.scss';

const UserInfoForm = ({ formControl, onSubmit }) => {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div>
        <h2 className={styles.title}>Реєстрація</h2>
        <p className={styles.text}>
          Додай інформацію про себе щоб взаємодіяти з календарем та взяти участь
          у розіграші
        </p>
      </div>

      <div className={styles.inputs}>
        <Controller
          name="name"
          control={formControl}
          render={({ field, fieldState: { error } }) => (
            <TextInputField
              label="Ім’я"
              placeholder="Напишіть Твоє ім’я"
              iconComponent={UserSvg}
              error={error}
              {...field}
            />
          )}
        />
        <Controller
          name="address"
          control={formControl}
          render={({ field, fieldState: { error } }) => (
            <TextInputField
              label="Адреса"
              placeholder="Твоя адреса"
              iconComponent={HomeSvg}
              error={error}
              {...field}
            />
          )}
        />
        <Controller
          name="region"
          control={formControl}
          render={({ field, fieldState: { error } }) => (
            <TextInputField
              label="Область проживання"
              placeholder="Твоя область"
              iconComponent={BuildingSvg}
              error={error}
              {...field}
            />
          )}
        />
        <Controller
          name="class"
          control={formControl}
          render={({ field, fieldState: { error } }) => (
            <TextInputField
              label="Клас"
              placeholder="Твій клас"
              iconComponent={RulerPenSvg}
              error={error}
              {...field}
            />
          )}
        />
      </div>

      <Button className={styles.centered} type="submit">
        Продовжити
      </Button>
    </form>
  );
};

export default UserInfoForm;