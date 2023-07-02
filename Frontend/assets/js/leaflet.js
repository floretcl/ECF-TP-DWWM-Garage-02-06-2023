//--------------------- LEAFLET JS : MAP ---------------------------//

const lon = 43.614012;
const lat = 1.462147;
const zoomLevel = 16;
const maxZoom = 19;
const minZoom = 10;

const leafletMap = L.map('leaflet-map').setView([lon, lat], zoomLevel);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  minZoom: minZoom,
  maxZoom: maxZoom,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(leafletMap);

const garageVParrotPlaceMarker = L.marker([lon, lat], {
  title: 'Garage V. Parrot',
  alt: 'Emplacement du garage V. Parrot',
})
  .addTo(leafletMap)
  .bindPopup('Garage V. Parrot');
