import * as yup from 'yup';

import { PHONE_MASK_REGEX } from '@/constants';

export const phoneSchema = yup
  .string()
  .matches(PHONE_MASK_REGEX, 'Невірний формат телефону');
