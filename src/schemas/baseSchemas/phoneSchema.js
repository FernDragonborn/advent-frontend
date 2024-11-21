import * as yup from 'yup';

import { PHONE_MASK_REGEX, REQUIRED_MESSAGE } from '@/constants';

export const phoneSchema = yup
  .string()
  .required(REQUIRED_MESSAGE)
  .matches(PHONE_MASK_REGEX, 'Невірний формат телефону');
