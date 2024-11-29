import { Controller } from 'react-hook-form';

import { Button, TextInputField } from '@/components';
import { MailSvg } from '@/svgs';
import styles from '@/styles/components/forms/AuthForm.module.scss';

const UserInfoForm = ({ formControl, isLoading, onSubmit, onBack }) => {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div>
        <h2 className={styles.title}>Твоя пошта</h2>
        <p className={styles.text}>Додай пошту для відновлення паролю</p>
      </div>

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

export default UserInfoForm;
