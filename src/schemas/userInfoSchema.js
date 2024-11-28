import * as yup from 'yup';

import { regionSchema, selectItemSchema, usernameSchema } from './baseSchemas';

export const userInfoSchema = yup.object({
  name: usernameSchema,
  region: regionSchema,
  grade: selectItemSchema,
  gender: selectItemSchema,
});
