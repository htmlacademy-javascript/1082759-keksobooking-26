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
  const data = getAdData();

  return Array.from({ length: ADS_QUANTITY }, () =>
    housingRentalAd(
      data['author'],
      data['offer'],
      data['location']
    )
  );
};

export { getHousingAdsData };
