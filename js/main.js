import { getHousingAdsData } from './ads-arr-data-creator.js';
import { formValidator } from './form-validation.js';
import { pageState } from './page-state.js';
import { getMap } from './map.js';

const adData = getHousingAdsData();
pageState('inactive');
getMap(adData);
formValidator();
