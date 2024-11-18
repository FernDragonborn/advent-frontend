import * as yup from 'yup';

import { passwordSchema } from './baseSchemas';

export const passwordManageSchema = yup.object({
  password: passwordSchema,
  passwordConfirmation: passwordSchema.equals(
    [yup.ref('password')],
    'Паролі не збігаються',
  ),
});
