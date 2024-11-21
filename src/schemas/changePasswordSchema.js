import * as yup from 'yup';

import { passwordSchema } from './baseSchemas';

export const changePasswordSchema = yup.object({
  currentPassword: passwordSchema,
  newPassword: passwordSchema,
  passwordConfirmation: passwordSchema.equals(
    [yup.ref('newPassword')],
    'Паролі не збігаються',
  ),
});
