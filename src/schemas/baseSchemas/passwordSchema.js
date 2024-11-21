import * as yup from 'yup';

import { REQUIRED_MESSAGE } from '@/constants';

export const passwordSchema = yup
  .string()
  .required(REQUIRED_MESSAGE)
  .min(8, 'Мінімільна довжина 8 символів')
  .max(100, 'Максимальна довжина 100 символів');
