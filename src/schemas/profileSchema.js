import * as yup from 'yup';

import {
  addressSchema,
  classSchema,
  emailSchema,
  phoneSchema,
  regionSchema,
  usernameSchema,
} from './baseSchemas';

export const profileSchema = yup.object({
  name: usernameSchema,
  email: emailSchema,
  phone: phoneSchema,
  address: addressSchema,
  region: regionSchema,
  class: classSchema,
});
