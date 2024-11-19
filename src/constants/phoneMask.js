export const PHONE_MASK = [
  '+',
  3,
  8,
  ' ',
  '(',
  0,
  /\d/,
  /\d/,
  ')',
  ' ',
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

export const PHONE_MASK_REGEX = /^\+38 \(0\d{2}\) \d{3} \d{4}$/;
