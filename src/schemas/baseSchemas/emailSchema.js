import * as yup from 'yup';

import { REQUIRED_MESSAGE } from '@/constants';

export const emailSchema = yup
  .string()
  .required(REQUIRED_MESSAGE)
  .email('Невірний формат емейлу');
