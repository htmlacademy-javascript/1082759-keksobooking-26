const isValid = (min, max, cut = 0) => {
  const start = 0;
  const isNumber = (num) => !isNaN(parseFloat(num)) && isFinite(num);

  if (
    min < start ||
    max <= start ||
    min >= max ||
    cut < start ||
    !isNumber(min) ||
    !isNumber(max) ||
    !isNumber(cut) ||
    !Number.isInteger(cut)
  ) {
    return false;
  }
  return true;
};

const randomGeneratorInt = (min, max) => {
  const result = isValid(min, max)
    ? Math.floor((Math.random() * (max - min + 1) + min))
    : 'Недопустимые значения';

  return result;
};
const randomGeneratorFloat = (min, max, cut) => {
  const result = isValid(min, max, cut)
    ? Number((Math.random() * (max - min + 1) + min).toFixed(cut))
    : 'Недопустимые значения';

  return result;
};

randomGeneratorInt(1, 2);
randomGeneratorFloat(1.1, 1.2, 3);
