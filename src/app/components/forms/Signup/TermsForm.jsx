import Link from 'next/link';
import { Controller } from 'react-hook-form';

import { Button, Checkbox } from '@/components';
import styles from '@/styles/components/forms/AuthForm.module.scss';

const TermsForm = ({ formControl, isLoading, onSubmit, onBack }) => {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div>
        <h2 className={styles.title}>Умови участі</h2>
        <p className={styles.text}>
          Покажи цю сторінку батькам. Для нас важливо, щоб вони прочитали і дали
          свою згоду
        </p>
      </div>

      <Controller
        name="isAgreed"
        control={formControl}
        render={({ field, fieldState: { error } }) => (
          <Checkbox
            className={styles.centered}
            text='Я, законний представник непонолітнього/неповнолітньої, що бере участь в "Різдвяному адвент-календарі", прочитав/прочитала та погоджуюсь з'
            error={error}
            {...field}
          />
        )}
      />

      <p className={styles.text}>
        <Link
          className={styles.underlined}
          href="/privacy-policy"
          target="_blank">
          Політика конфіденційності
        </Link>{' '}
        та{' '}
        <Link className={styles.underlined} href="/terms" target="_blank">
          Офіційними умовами участі
        </Link>
      </p>

      <div className={styles.actions}>
        <Button appearance="bordered" arrowPosition="left" onClick={onBack}>
          Назад
        </Button>
        <Button type="submit" isLoading={isLoading}>
          Зареєструватись
        </Button>
      </div>
    </form>
  );
};

export default TermsForm;
