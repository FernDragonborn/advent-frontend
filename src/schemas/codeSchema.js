import * as yup from 'yup';

export const codeSchema = yup.object({
  code: yup.string().length(4, 'Довжина повинна становити 4 символи'),
});
