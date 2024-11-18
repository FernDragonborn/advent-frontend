import * as yup from 'yup';

export const termsSchema = yup.object({
  isAgreed: yup.bool().isTrue('Ви повинні погодитись, щоб продовжити'),
});
