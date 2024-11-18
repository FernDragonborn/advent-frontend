import * as yup from 'yup';

export const passwordSchema = yup
  .string()
  .min(8, 'Мінімільна довжина 8 символів')
  .max(100, 'Максимальна довжина 100 символів');
