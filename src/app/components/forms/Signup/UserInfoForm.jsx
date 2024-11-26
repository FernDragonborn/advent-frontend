import { Controller } from 'react-hook-form';

import { Button, Select, TextInputField } from '@/components';
import { BuildingSvg, RulerPenSvg, UserSvg } from '@/svgs';
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
          name="username"
          control={formControl}
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
          name="sex"
          control={formControl}
          render={({ field, fieldState: { error } }) => (
            <Select
              label="Стать"
              buttonLabel={'Оберіть стать'}
              data={[
                { id: 'man', title: 'Чоловік' },
                { id: 'woman', title: 'Жінка' },
              ]}
              error={error}
              iconComponent={UserSvg}
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
              placeholder="Напр.: Київська, Хмельницька, Харківська тощо"
              iconComponent={BuildingSvg}
              error={error}
              {...field}
            />
          )}
        />
        <Controller
          name="grade"
          control={formControl}
          render={({ field, fieldState: { error } }) => (
            <TextInputField
              type="number"
              label="Клас"
              placeholder="1-12"
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
