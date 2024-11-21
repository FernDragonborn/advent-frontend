import * as yup from 'yup';

import {
  addressSchema,
  classSchema,
  regionSchema,
  usernameSchema,
} from './baseSchemas';

export const userInfoSchema = yup.object({
  name: usernameSchema,
  address: addressSchema,
  region: regionSchema,
  class: classSchema,
});
