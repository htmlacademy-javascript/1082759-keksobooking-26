import { offerCard } from './offer-card-template.js';
import { pageState } from './page-state.js';

const addressElem = document.querySelector('#address');

const mainCoordinates = {
  lat: 35.652832,
  lng: 139.839478
};
const zoom = 8;
const mapLayerUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const mapLayerOtions = {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
};

const iconParams = (url, size, anchor) => ({ iconUrl: url, iconSize: size, iconAnchor: anchor });

const getMap = (data) => {

  const mainPinIcon = L.icon(iconParams('./img/main-pin.svg', [52, 52], [26, 52]));
  const pinIcon = L.icon(iconParams('./img/pin.svg', [40, 40], [20, 40]));

  const map = L.map('map-canvas');
  map.on('load', () => pageState('active'));

  const mapView = map.setView(mainCoordinates, zoom);

  const mapLayer = L.tileLayer(mapLayerUrl, mapLayerOtions);
  mapLayer.addTo(mapView);

  const getMainMarker = (mainMap) => {

    const iconOptions = {
      draggable: true,
      icon: mainPinIcon
    };

    const marker = L.marker(mainCoordinates, iconOptions);

    marker.addTo(mainMap);

    addressElem.value = `${mainCoordinates.lat}, ${mainCoordinates.lng}`;

    marker.on('move', (evt) => {

      const { lat, lng } = evt.target.getLatLng();

      addressElem.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
    });

    return marker;
  };

  getMainMarker(mapView);

  const markerGroup = L.layerGroup().addTo(mapView);

  const createMarker = (point) => {

    const offerPopup = offerCard(point);
    const iconOptions = {
      draggable: true,
      icon: pinIcon
    };

    const marker = L.marker(point.location, iconOptions);

    marker
      .addTo(markerGroup)
      .bindPopup(offerPopup);
  };

  data.forEach((point) => createMarker(point));
};

export { getMap };
