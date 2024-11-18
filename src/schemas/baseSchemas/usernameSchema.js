import * as yup from 'yup';

export const usernameSchema = yup
  .string()
  .min(4, 'Мінімільна довжина 4 символи')
  .max(200, 'Максимальна довжина 200 символів');
