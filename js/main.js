const isValid = (min, max, cut) => {
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

const randomGenerator = (min, max, cut = 0) => {
  const result = isValid(min, max, cut)
    ? Number((Math.random() * (max - min + 1) + min).toFixed(cut))
    : 'Недопустимые значения';

  return result;
};

randomGenerator(1, 2);
randomGenerator(1.1, 1.2, 3);
