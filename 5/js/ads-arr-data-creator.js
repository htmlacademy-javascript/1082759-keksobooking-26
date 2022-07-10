import { getAdData } from './ads-obj-creator.js';
import { ADS_QUANTITY } from './housing-ads-data.js';

const housingRentalAd = (
  author = 'Not found',
  offer = 'Not found',
  location = 'Not found'
) => ({
  author: author,
  offer: offer,
  location: location,
});

const getHousingAdsData = () => {
  const {author, offer, location} = getAdData();

  return Array.from({ length: ADS_QUANTITY }, () =>
    housingRentalAd(author, offer, location)
  );
};

export { getHousingAdsData };
