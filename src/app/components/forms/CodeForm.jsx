import { Controller } from 'react-hook-form';

import { Button, TextInputField } from '@/components';
import { CirclePasswordSvg } from '@/svgs';
import styles from '@/styles/components/forms/AuthForm.module.scss';

const CodeForm = ({ userEmail, formControl, isLoading, onSubmit, onBack }) => {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div>
        <h2 className={styles.title}>Введи код</h2>
        <p className={styles.text}>
          Ми надіслали тобі код на поштову скриньку{' '}
          <span className={styles.accent}>{userEmail}</span>
        </p>
        <p className={styles.text}>Введи отриманий код в полі нижче</p>
      </div>

      <Controller
        name="code"
        control={formControl}
        render={({ field, fieldState: { error } }) => (
          <TextInputField
            label="Код"
            placeholder="Введіть код"
            iconComponent={CirclePasswordSvg}
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

export default CodeForm;
