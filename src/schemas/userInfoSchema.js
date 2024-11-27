import * as yup from 'yup';

import { classSchema, regionSchema, usernameSchema } from './baseSchemas';
import { REQUIRED_MESSAGE } from '@/constants';

export const userInfoSchema = yup.object({
  name: usernameSchema,
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
