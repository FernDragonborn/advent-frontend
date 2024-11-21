import * as yup from 'yup';

import { REQUIRED_MESSAGE } from '@/constants';

export const regionSchema = yup
  .string()
  .required(REQUIRED_MESSAGE)
  .min(4, 'Мінімільна довжина 4 символи')
  .max(100, 'Максимальна довжина 100 символів');
