const adForm = document.querySelector('.ad-form');
const adFormSlider = adForm.querySelector('.ad-form__slider');
const mapFiltersForm = document.querySelector('.map__filters');

adFormSlider.setAttribute('aria-disabled', false);

const pageState = (state = 'inactive') => {

  if (state === 'inactive') {
    if ( !adForm.matches('.ad-form--disabled') ) {
      adForm.classList.add('ad-form--disabled');
      adFormSlider.ariaDisabled = 'true';
    }
    if ( !mapFiltersForm.matches('.map__filters--disabled') ) {
      mapFiltersForm.classList.add('map__filters--disabled');
    }
    for ( const adFormElems of adForm ) { adFormElems.disabled = true; }
    for ( const mapFiltersFormElems of adForm ) { mapFiltersFormElems.disabled = true; }
  }

  if (state === 'active') {
    if ( adForm.matches('.ad-form--disabled') ) {
      adForm.classList.remove('ad-form--disabled');
      adFormSlider.ariaDisabled = 'false';
    }
    if ( mapFiltersForm.matches('.map__filters--disabled') ) {
      mapFiltersForm.classList.remove('map__filters--disabled');
    }
    for ( const adFormElems of adForm ) { adFormElems.disabled = false; }
    for ( const mapFiltersFormElems of adForm ) { mapFiltersFormElems.disabled = false; }
  }
};

export { pageState };
