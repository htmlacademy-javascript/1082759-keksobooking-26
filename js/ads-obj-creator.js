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

import { getRandomInt, getRandomFloat, getRandomItems, getRandomArr } from './utils.js';

const getAuthor = () => {
  let number = getRandomInt(1, 10);
  if (number < 10) {
    number = `0${number}`;
  }
  return {
    avatar: `img/avatars/user${number}.png`,
  };
};

const location = {
  lat: getRandomFloat(LAT.min, LAT.max, LAT.dec),
  lng: getRandomFloat(LNG.min, LNG.max, LNG.dec),
};

const offer = {
  title: getRandomItems(TITLES),
  address: location,
  price: getRandomInt(1, FULL_PRICE),
  type: getRandomItems(HOUSING_TYPE),
  rooms: getRandomInt(1, ROOMS_COUNT),
  guests: getRandomInt(1, SEATS_COUNT),
  checkin: getRandomItems(TIMES),
  checkout: getRandomItems(TIMES),
  features: getRandomArr(FEATURES),
  description: getRandomItems(DESCRIPTIONS),
  photos: Array.from({ length: getRandomInt(1, ROOM_IMG.length - 1) }, (item, index) => ROOM_IMG[index]),
};

const getAdData = () => {

  const author = getAuthor();

  return { author, offer, location };
};

export { getAdData };
