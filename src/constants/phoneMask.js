'+38 (0##) ### ####';

export const PHONE_MASK = '+38 (0##) ### ####';

export const PHONE_INPUT_MASK = PHONE_MASK.split('').map(val =>
  val === '#' ? /\d/ : val,
);

export const PHONE_MASK_REGEX = /^\+38 \(0\d{2}\) \d{3} \d{4}$/;
