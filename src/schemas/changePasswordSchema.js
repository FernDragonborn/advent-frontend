import * as yup from 'yup';

import { passwordSchema } from './baseSchemas';

export const changePasswordSchema = yup.object({
  old_password: passwordSchema,
  new_password: passwordSchema,
  password_confirmation: passwordSchema.equals(
    [yup.ref('new_password')],
    'Паролі не збігаються',
  ),
});
