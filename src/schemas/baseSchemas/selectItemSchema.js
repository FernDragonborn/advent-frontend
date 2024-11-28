import { REQUIRED_MESSAGE } from '@/constants';
import * as yup from 'yup';

export const selectItemSchema = yup
  .mixed()
  .test({
    message: REQUIRED_MESSAGE,
    test: val => !!(val?.id && val?.title),
  })
  .required(REQUIRED_MESSAGE);
