import { getHousingAdsData } from './ads-arr-data-creator.js';
import { offerCard } from './offer-card-template.js';

const mapBlock = document.querySelector('#map-canvas');

mapBlock.append(offerCard(getHousingAdsData()[0]));

// console.log(getHousingAdsData()[0]);
