import { removeMarkers, resetMap } from './map.js';

const form = document.querySelector('.ad-form');
const formRsetBtn = document.querySelector('.ad-form__reset');

const formReset = () => {

  formRsetBtn.addEventListener('click', (evt) => {
    evt.preventDefault();

    form.reset();
    removeMarkers();
    resetMap();
  });
};

export { formReset };
