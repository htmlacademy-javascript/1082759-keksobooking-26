import { getHousingAdsData } from './ads-arr-data-creator.js';
import { offerCard } from './offer-card-template.js';
import { pageState } from './page-state.js';
import { formValidator } from './form-validation.js';

const mapBlock = document.querySelector('#map-canvas');

mapBlock.append(offerCard(getHousingAdsData()[0]));
pageState('active');
formValidator();
