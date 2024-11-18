import * as yup from 'yup';

export const emailSchema = yup
  .string()
  .email('Невірний формат емейлу')
  .required("Обов'язкове поле");
