import { isNumber } from './utils.js';

const adForm = document.querySelector('.ad-form');

const getItem = (selector) => adForm.querySelector(selector);

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'form__item--invalid',
  successClass: 'form__item--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
});

const formValidator = () => {

  const validationObj = {
    title: {
      element: getItem('#title'),
      validation: titleValidate,
      errorMessage: 'От 30 до 100 символов',
    },
    price: {
      element: getItem('#price'),
      validation: priceValidate,
      errorMessage: 'Введите число от 0 до 100000',
    },
    capacity: {
      element: getItem('#capacity'),
    },
    rooms: {
      element: getItem('#room_number'),
      validation: roomsValidate,
      errorMessage: 'Количество гостей не соответствует количеству комнат',
      capacity: {
        1: ['1'],
        2: ['1', '2'],
        3: ['1', '2', '3'],
        100: ['0'],
      }
    },
  };

  const { title, price, capacity, rooms } = validationObj;

  function titleValidate(value) {
    return value.length >= 30 && value.length <= 100;
  }

  function priceValidate(value) {
    return isNumber(value) && value <= 100000 && value >= 0;
  }

  function roomsValidate(value) {
    return rooms.capacity[value].includes(capacity.element.value);
  }

  pristine.addValidator(title.element, title.validation, title.errorMessage);
  pristine.addValidator(price.element, price.validation, price.errorMessage);
  pristine.addValidator(rooms.element, rooms.validation, rooms.errorMessage);

  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(adForm);
    const isValid = pristine.validate();
    const formDataValues = {};

    for (const value of formData.entries()) {
      formDataValues[value[0]] = value[1];
    }

    if (isValid) {
      // console.log(formDataValues);
    }

  });
};

export { formValidator };
