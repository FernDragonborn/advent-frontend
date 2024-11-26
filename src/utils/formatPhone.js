import { format } from '@react-input/mask';

import { PHONE_MASK } from '@/constants';

export const formatPhone = value =>
  typeof value === 'string'
    ? format(value, { mask: PHONE_MASK, replacement: { '#': /\d/ } })
    : '';
