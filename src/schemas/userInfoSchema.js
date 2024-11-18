import * as yup from 'yup';

import { usernameSchema } from './baseSchemas';

export const userInfoSchema = yup.object({
  name: usernameSchema,
  address: yup
    .string()
    .min(4, 'Мінімільна довжина 4 символи')
    .max(100, 'Максимальна довжина 100 символів'),
  region: yup
    .string()
    .min(4, 'Мінімільна довжина 4 символи')
    .max(150, 'Максимальна довжина 150 символів'),
  class: yup
    .string()
    .max(100, 'Максимальна довжина 100 символів')
    .required("Обов'язкове поле"),
});
