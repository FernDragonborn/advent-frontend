import * as yup from 'yup';

import { emailSchema } from './baseSchemas';

export const resetPasswordEmailSchema = yup.object({
  email: emailSchema,
});
