import * as yup from 'yup';

import { REQUIRED_MESSAGE } from '@/constants';

export const addressSchema = yup
  .string()
  .required(REQUIRED_MESSAGE)
  .min(4, 'Мінімільна довжина 4 символи')
  .max(150, 'Максимальна довжина 150 символів');
