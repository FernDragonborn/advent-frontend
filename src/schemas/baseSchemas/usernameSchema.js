import * as yup from 'yup';

import { REQUIRED_MESSAGE } from '@/constants';

export const usernameSchema = yup
  .string()
  .required(REQUIRED_MESSAGE)
  .min(4, 'Мінімільна довжина 4 символи')
  .max(200, 'Максимальна довжина 200 символів');
