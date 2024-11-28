import * as yup from 'yup';

import { REQUIRED_MESSAGE } from '@/constants';

export const codeSchema = yup.object({
  // code: yup.string().length(4, 'Довжина повинна становити 4 символи'),
  code: yup.string().required(REQUIRED_MESSAGE),
});
