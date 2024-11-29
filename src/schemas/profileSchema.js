import * as yup from 'yup';

import {
  emailSchema,
  phoneSchema,
  selectItemSchema,
  usernameSchema,
} from './baseSchemas';

export const profileSchema = yup.object({
  name: usernameSchema,
  email: emailSchema,
  phone_number: phoneSchema,
  region: selectItemSchema,
  grade: selectItemSchema,
  gender: selectItemSchema,
});
