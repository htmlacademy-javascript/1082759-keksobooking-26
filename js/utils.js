const isNumber = (num) => !isNaN(parseFloat(num)) && isFinite(num);

const isValid = (min, max, cut = 0) => {
  const START_VALUE = 0;

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

const getRandomInt = (min, max) => isValid(min, max)
  ? Math.floor(Math.random() * (max - min + 1) + min)
  : 'Недопустимые значения';

const getRandomFloat = (min, max, cut) => isValid(min, max, cut)
  ? Number((Math.random() * (max - min + 1) + min).toFixed(cut))
  : 'Недопустимые значения';

const getRandomItems = (items) => items[getRandomInt(0, items.length - 1)];

const getRandomArr = (items) => {
  const newArrLength = getRandomInt(0, items.length);
  return items.slice(newArrLength);
};

export {
  isNumber,
  isValid,
  getRandomInt,
  getRandomFloat,
  getRandomItems,
  getRandomArr
};
