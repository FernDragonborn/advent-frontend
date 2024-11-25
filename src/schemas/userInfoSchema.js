import * as yup from 'yup';

import {
  addressSchema,
  classSchema,
  regionSchema,
  usernameSchema,
} from './baseSchemas';

export const userInfoSchema = yup.object({
  username: usernameSchema,
  sex: yup.string(),
  // .oneOf(['man, woman']),
  region: regionSchema,
  grade: classSchema,
});
