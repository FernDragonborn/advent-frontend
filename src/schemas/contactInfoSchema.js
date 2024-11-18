import * as yup from 'yup';

import { emailSchema, phoneSchema } from './baseSchemas';

export const contactInfoSchema = yup.object({
  email: emailSchema,
  phone: phoneSchema,
});
