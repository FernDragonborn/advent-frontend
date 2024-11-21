import * as yup from 'yup';

import { REQUIRED_MESSAGE } from '@/constants';

export const classSchema = yup
  .number()
  .typeError(REQUIRED_MESSAGE)
  .min(1, 'Мінімальне значення 1')
  .max(12, 'Максимальне значення 12');
