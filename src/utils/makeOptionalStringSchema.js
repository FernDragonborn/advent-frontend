export const makeOptionalStringSchema = schema =>
  schema.nullable().transform(val => (!val ? null : val));
