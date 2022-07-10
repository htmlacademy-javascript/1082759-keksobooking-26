import {
  FULL_PRICE,
  ROOMS_COUNT,
  SEATS_COUNT,
  LAT,
  LNG,
  TITLES,
  HOUSING_TYPE,
  TIMES,
  FEATURES,
  ROOM_IMG,
  DESCRIPTIONS,
} from './housing-ads-data.js';

import { getRandomGeneratorInt, getRandomGeneratorFloat, getRandomItems, getRandomArr } from './utils.js';

const getAuthor = () => {
  let number = getRandomGeneratorInt(1, 10);
  if (number < 10) {
    number = `0${number}`;
  }
  return {
    avatar: `img/avatars/user${number}.png`,
  };
};

const getLocation = () => ({
  lat: getRandomGeneratorFloat(LAT.min, LAT.max, LAT.dec),
  lng: getRandomGeneratorFloat(LNG.min, LNG.max, LNG.dec),
});

const getOffer = () => ({
  title: getRandomItems(TITLES),
  address: getLocation(),
  price: getRandomGeneratorInt(1, FULL_PRICE),
  type: getRandomItems(HOUSING_TYPE),
  rooms: getRandomGeneratorInt(1, ROOMS_COUNT),
  guests: getRandomGeneratorInt(1, SEATS_COUNT),
  checkin: getRandomItems(TIMES),
  checkout: getRandomItems(TIMES),
  features: getRandomArr(FEATURES),
  description: getRandomItems(DESCRIPTIONS),
  photos: getRandomArr(ROOM_IMG),
});

const getAdData = () => {
  const offer = getOffer();
  const author = getAuthor();

  return {
    author: author,
    offer: offer,
    location: offer['adress'],
  };
};

export { getAdData };
