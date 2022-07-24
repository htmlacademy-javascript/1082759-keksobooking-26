import { MAIN_COORDINATES } from './housing-ads-data.js';
import { offerCard } from './offer-card-template.js';
import { pageState } from './page-state.js';

const addressElem = document.querySelector('#address');
const COPY_TXT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const ZOOM = 8;
const mapLayerUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const mapLayerOtions = { attribution: COPY_TXT };

pageState('inactive');
const iconParams = (url, size, anchor) => ({ iconUrl: url, iconSize: size, iconAnchor: anchor });

const mainPinIcon = L.icon(iconParams('./img/main-pin.svg', [52, 52], [26, 52]));
const pinIcon = L.icon(iconParams('./img/pin.svg', [40, 40], [20, 40]));

const mapCanvas = L.map('map-canvas').on('load', () => pageState('active'));
const mapView = mapCanvas.setView(MAIN_COORDINATES, ZOOM);
const markerGroup = L.layerGroup().addTo(mapView);
const mapLayer = L.tileLayer(mapLayerUrl, mapLayerOtions);

const mainMarkerOptions = {
  draggable: true,
  icon: mainPinIcon
};

const mainMarker = L.marker(MAIN_COORDINATES, mainMarkerOptions);

mainMarker.addTo(mapView);

addressElem.value = `${MAIN_COORDINATES.lat}, ${MAIN_COORDINATES.lng}`;

mainMarker.on('move', (evt) => {

  const { lat, lng } = evt.target.getLatLng();

  addressElem.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
});

const createMarker = (point) => {

  const iconOptions = {
    draggable: false,
    icon: pinIcon
  };
  const offerPopup = offerCard(point);

  const marker = L.marker(point.location, iconOptions);

  marker
    .addTo(markerGroup)
    .bindPopup(offerPopup);

};

const getMap = (data) => {

  mapLayer.addTo(mapView);

  data.forEach((point) => createMarker(point));
};

const resetMap = (coordinates = MAIN_COORDINATES, zoom = ZOOM) => {

  mapCanvas.setView(coordinates, zoom);
  mapCanvas.closePopup();
  mainMarker.setLatLng(coordinates);
  addressElem.value = `${coordinates.lat.toFixed(5)}, ${coordinates.lng.toFixed(5)}`;
};

const removeMarkers = () => {
  markerGroup.clearLayers();
};

export { getMap, removeMarkers, resetMap };
