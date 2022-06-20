const isValid = (min, max, cut = 0) => {
  const START_VALUE = 0;
  const isNumber = (num) => !isNaN(parseFloat(num)) && isFinite(num);

  return !(
    min < START_VALUE ||
    max <= START_VALUE ||
    min >= max ||
    cut < START_VALUE ||
    !isNumber(min) ||
    !isNumber(max) ||
    !isNumber(cut) ||
    !Number.isInteger(cut));
};

export const getRandomGeneratorInt = (min, max) => isValid(min, max)
  ? Math.floor(Math.random() * (max - min + 1) + min)
  : 'Недопустимые значения';

export const getRandomGeneratorFloat = (min, max, cut) => isValid(min, max, cut)
  ? Number((Math.random() * (max - min + 1) + min).toFixed(cut))
  : 'Недопустимые значения';

export const getRandomItems = (items) => items[getRandomGeneratorInt(0, items.length - 1)];

export const getRandomArr = (items) => {
  const newArrLength = getRandomGeneratorInt(0, items.length - 1);
  return items.slice(newArrLength);
};
