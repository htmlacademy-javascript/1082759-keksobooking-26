const offerTemplate = document.querySelector('#card').content;
const popup = offerTemplate.querySelector('.popup').cloneNode(true);
const getItem = (selector) => popup.querySelector(selector);

const offerPopup = {
  title: getItem('.popup__title'),
  address: getItem('.popup__text--address'),
  price: getItem('.popup__text--price'),
  type: getItem('.popup__type'),
  capacity: getItem('.popup__text--capacity'),
  time: getItem('.popup__text--time'),
  features: getItem('.popup__features'),
  description: getItem('.popup__description'),
  photos: getItem('.popup__photos'),
  avatar: getItem('.popup__avatar')
};

const setPhotoSrc = (elem, data, targetElemSelector) => {

  if (!data) {
    return;
  }

  const element = elem.querySelector(targetElemSelector);

  elem.innerHTML = '';
  element.remove();
  data.forEach((photo) => {
    const photoElem = element.cloneNode(true);

    photoElem.src = photo ? photo : '../img/errors/sad404.svg';
    elem.appendChild(photoElem);
  });
};

const getFeatures = (elem, features, targetElemSelector) => {

  if (!features) {
    return;
  }

  const elements = elem.querySelectorAll(targetElemSelector);

  targetElemSelector = `${targetElemSelector.split('.')[1]}--`;

  const modifiers = features.map((feature) => targetElemSelector + feature);

  elements.forEach((element) => {

    const modifier = element.classList[1];

    if (!modifiers.includes(modifier)) {
      element.remove();
    }
  });
};

const offerCard = ({
  author: { avatar },
  offer: {
    title,
    type,
    address,
    price,
    checkin,
    checkout,
    rooms,
    guests,
    description,
    features,
    photos
  }
}) => {
  let offerType          = '';
  const offerTitle       = title || 'Not found';
  const offerAvatar      = avatar || '../img/errors/sad404.svg';
  const offerDescription = description || 'Not found';
  const offerPrice       = price ? `${price} ₽/ночь` : 'Not found';
  const offerAddress     = address ? address : 'Not found';
  const offerTime        = checkin && checkout ? `Заезд после ${checkin}, выезд до ${checkout}` : 'Not found';
  const offerCapacity    = rooms && guests ? `${rooms} комнаты для ${guests} гостей` : 'Not found';

  switch (type) {
    case 'flat'    : offerType = 'Квартира'; break;
    case 'bungalow': offerType = 'Бунгало' ; break;
    case 'house'   : offerType = 'Дом'     ; break;
    case 'palace'  : offerType = 'Дворец'  ; break;
    case 'hotel'   : offerType = 'Отель'   ; break;
    default: offerType = 'Not found'; break;
  }

  offerPopup.title.textContent = offerTitle;
  offerPopup.address.textContent = offerAddress;
  offerPopup.type.textContent = offerType;
  offerPopup.price.textContent = offerPrice;
  offerPopup.time.textContent = offerTime;
  offerPopup.capacity.textContent = offerCapacity;
  offerPopup.description.textContent = offerDescription;
  offerPopup.avatar.src = offerAvatar;

  getFeatures(offerPopup.features, features, '.popup__feature');
  setPhotoSrc(offerPopup.photos, photos, '.popup__photo');

  return popup;
};

export { offerCard };
