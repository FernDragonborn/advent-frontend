import * as yup from 'yup';

import { emailSchema, passwordSchema } from './baseSchemas';

export const loginSchema = yup.object({
  email: emailSchema,
  password: passwordSchema,
});
