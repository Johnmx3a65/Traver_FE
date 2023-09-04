export const roles = ['USER', 'ADMIN'];

export const isArrayEmptyOrNullish = (array) => {
  return !array || array.length === 0;
};

export const isAnyTrue = (array) => {
  return array.some((item) => item);
};
