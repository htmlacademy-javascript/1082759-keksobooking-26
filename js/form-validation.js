import { sendData } from './api.js';
import { removeMarkers, resetMap } from './map.js';
import { isNumber } from './utils.js';

const adForm = document.querySelector('.ad-form');
const successMsg = document.querySelector('#success')
  .content
  .querySelector('.success');
const errorMsg = document.querySelector('#error')
  .content
  .querySelector('.error');

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
      strLength: {
        min: 30,
        max: 100
      }
    },
    housingType: {
      element: getItem('#type'),
      validation: typeValidate,
      errorMessage: 'Такой тип жилья не найден',
      priceFloor: {
        'bungalow': 0,
        'flat': 1000,
        'hotel': 3000,
        'house': 5000,
        'palace': 10000
      },
    },
    price: {
      element: getItem('#price'),
      slider: getItem('.ad-form__slider'),
      validation: priceValidate,
      errorMessage: 'Введите число от 0 до 100000',
      amaunt: {
        min: 0,
        max: 100000
      }
    },
    checkInTime: {
      checkin: {
        element: getItem('#timein'),
        validation: checkInValidate,
      },
      checkout: {
        element: getItem('#timeout'),
        validation: checkOutValidate,
      },
      errorMessage: 'Заезд не соответствует времени выезда'
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

  const { title, housingType, price, checkInTime, capacity, rooms } = validationObj;
  const { checkin, checkout } = checkInTime;

  function titleValidate(value) {
    return value.length >= title.strLength.min && value.length <= title.strLength.max;
  }

  function typeValidate(value) {

    const isVslid = Object.keys(housingType.priceFloor).includes(value);

    if (isVslid) {
      price.element.placeholder = housingType.priceFloor[value];
      price.element.min = housingType.priceFloor[value];
    }
    return isVslid;
  }

  function priceValidate(value) {
    return isNumber(+value) && +value <= price.element.max && +value >= price.element.min;
  }

  function checkInValidate(value) {

    const checkoutElem = [...checkout.element.children].filter((opt) => opt.value === value)[0];
    const isValid = value === checkoutElem.value;

    if (isValid) {
      checkoutElem.selected = true;
    }
    return isValid;
  }

  function checkOutValidate(value) {

    const checkinElem = [...checkin.element.children].filter((opt) => opt.value === value)[0];
    const isValid = value === checkinElem.value;

    if (isValid) {
      checkinElem.selected = true;
    }
    return isValid;
  }

  function roomsValidate(value) {
    return rooms.capacity[value].includes(capacity.element.value);
  }

  noUiSlider.create(price.slider, {
    start: [price.element.min],
    range: price.amaunt,
    step: 1000,
  });

  price.slider.noUiSlider.on('update', (values, handle) => {
    price.element.value = Math.floor(values[handle]);
  });

  pristine.addValidator(title.element, title.validation, title.errorMessage);
  pristine.addValidator(housingType.element, housingType.validation, housingType.errorMessage);
  pristine.addValidator(price.element, price.validation, price.errorMessage);
  pristine.addValidator(checkin.element, checkin.validation, checkInTime.errorMessage);
  pristine.addValidator(checkout.element, checkout.validation, checkInTime.errorMessage);
  pristine.addValidator(rooms.element, rooms.validation, rooms.errorMessage);

  const getSuccessMsg = (template) => {

    template.classList.remove('hidden');
    document.body.append(template);

    const successMsgElem = document.querySelector('.success');

    const listener = (evt) => {
      evt.target.classList.add('hidden');
    };

    const clickListener = (evt) => {
      if (evt.code === 'Escape') {
        successMsgElem.classList.add('hidden');
      }
    };

    successMsgElem.addEventListener('click', listener);

    document.body.addEventListener('keydown', clickListener);
  };

  const getErrorMsg = (template) => {

    template.classList.remove('hidden');
    document.body.append(template);

    const errorMsgElem = document.querySelector('.error');

    const listener = (evt) => {
      if (!evt.target.matches('.error') && !evt.target.matches('.error__button')) {
        return;
      }
      errorMsgElem.classList.add('hidden');
    };

    const clickListener = (evt) => {
      if (evt.code === 'Escape') {
        errorMsgElem.classList.add('hidden');
      }
    };

    document.body.addEventListener('click', listener);

    document.body.addEventListener('keydown', clickListener);
  };

  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    const data = evt.target;

    if (isValid) {
      sendData(data)
        .then((res) => {
          if (res.ok) {
            getSuccessMsg(successMsg);
            data.reset();
          }
        })
        .catch(() => {
          getErrorMsg(errorMsg);
        })
        .finally(() => {
          removeMarkers();
          resetMap();
        });
    }
  });
};

export { formValidator };
