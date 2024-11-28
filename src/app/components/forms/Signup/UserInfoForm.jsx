import { Controller } from 'react-hook-form';

import { Button, Select, TextInputField } from '@/components';
import { GENDERS, GRADES } from '@/constants';
import { BuildingSvg, RulerPenSvg, UserSvg } from '@/svgs';
import styles from '@/styles/components/forms/AuthForm.module.scss';

const UserInfoForm = ({ formControl, onSubmit }) => {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div>
        <h2 className={styles.title}>Реєстрація</h2>
        <p className={styles.text}>
          Додайте інформацію про себе щоб взаємодіяти з календарем та взяти
          участь у розіграші
        </p>
      </div>

      <div className={styles.inputs}>
        <Controller
          name="name"
          control={formControl}
          render={({ field, fieldState: { error } }) => (
            <TextInputField
              label="ПІБ"
              placeholder="Прізвище, імʼя, по батькові"
              iconComponent={UserSvg}
              error={error}
              {...field}
            />
          )}
        />
        <Controller
          name="gender"
          control={formControl}
          render={({ field, fieldState: { error } }) => (
            <Select
              label="Стать"
              buttonLabel={'Оберіть стать'}
              data={GENDERS}
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
            <Select
              label="Клас"
              buttonLabel={'Оберіть клас'}
              data={GRADES}
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
