import * as yup from 'yup';

import { phoneMask } from '@/constants';

export const makeOptionalString = schema => schema.nullable().transform(val => (!val ? null : val));

export const usernameSchema = yup
  .string()
  .min(4, 'Мінімільна довжина 4 символа')
  .max(200, 'Максимальна довжина 200 символів');

export const emailSchema = yup
  .string()
  .email('Невірний формат емейлу')
  .required("Обов'язкове поле");

export const phoneSchema = yup.string().length(phoneMask.length, 'Невірний формат телефону');

export const passwordSchema = yup
  .string()
  .min(8, 'Мінімільна довжина 8 символів')
  .max(100, 'Максимальна довжина 100 символів');

export const loginSchema = yup.object({
  email: emailSchema,
  password: passwordSchema,
});

export const profileSchema = yup.object({
  firstName: usernameSchema,
  lastName: usernameSchema,
  nickname: makeOptionalString(usernameSchema),
  email: emailSchema,
  phoneNumber: makeOptionalString(phoneSchema),
});
