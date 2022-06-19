export const isValid = (min, max, cut = 0) => {
  const START_VALUE = 0;
  const isNumber = (num) => !isNaN(parseFloat(num)) && isFinite(num);

  if (
    min < START_VALUE ||
    max <= START_VALUE ||
    min >= max ||
    cut < START_VALUE ||
    !isNumber(min) ||
    !isNumber(max) ||
    !isNumber(cut) ||
    !Number.isInteger(cut)
  ) {
    return false;
  }
  return true;
};

export const getRandomGeneratorInt = (min, max) => {
  const result = isValid(min, max)
    ? Math.floor(Math.random() * (max - min + 1) + min)
    : 'Недопустимые значения';

  return result;
};

export const getRandomGeneratorFloat = (min, max, cut) => {
  const result = isValid(min, max, cut)
    ? Number((Math.random() * (max - min + 1) + min).toFixed(cut))
    : 'Недопустимые значения';

  return result;
};

export const getRandomItems = (items) =>
  items[getRandomGeneratorInt(0, items.length - 1)];
