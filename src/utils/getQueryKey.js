export const getQueryKey = (value, additionalValue) => {
  const queryKey = [value];
  additionalValue && queryKey.push(additionalValue);
  return queryKey;
};
