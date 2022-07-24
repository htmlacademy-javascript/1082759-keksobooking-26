import { formValidator } from './form-validation.js';
import { getData } from './api.js';
import { getMap } from './map.js';
import { formReset } from './form-reset.js';

getData()
  .then((data) => {
    getMap(data);
  });

formValidator();
formReset();
