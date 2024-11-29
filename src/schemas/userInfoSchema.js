import * as yup from 'yup';

import { selectItemSchema, usernameSchema } from './baseSchemas';

export const userInfoSchema = yup.object({
  name: usernameSchema,
  region: selectItemSchema,
  grade: selectItemSchema,
  gender: selectItemSchema,
});
