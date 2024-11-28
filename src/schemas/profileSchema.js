import * as yup from 'yup';

import {
  emailSchema,
  phoneSchema,
  regionSchema,
  selectItemSchema,
  usernameSchema,
} from './baseSchemas';

export const profileSchema = yup.object({
  name: usernameSchema,
  email: emailSchema,
  phone_number: phoneSchema,
  region: regionSchema,
  grade: selectItemSchema,
  gender: selectItemSchema,
});
