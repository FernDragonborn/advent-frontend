import * as yup from 'yup';

import {
  classSchema,
  emailSchema,
  phoneSchema,
  regionSchema,
  usernameSchema,
} from './baseSchemas';
import { REQUIRED_MESSAGE } from '@/constants';

export const profileSchema = yup.object({
  username: usernameSchema,
  email: emailSchema,
  phone: phoneSchema,
  region: regionSchema,
  grade: classSchema,
  gender: yup
    .mixed()
    .test({
      message: REQUIRED_MESSAGE,
      test: val => !!(val?.id && val?.title),
    })
    .required(REQUIRED_MESSAGE),
});
