import * as yup from 'yup';

import { PHONE_MASK } from '@/constants';

export const phoneSchema = yup
  .string()
  .length(PHONE_MASK.length, 'Невірний формат телефону');
