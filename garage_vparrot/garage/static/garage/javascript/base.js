//--------------------- PAGE PRELOAD : PREVENT ANIMATION ON LOADING ---------------------------//

setTimeout(() => {
    document.body.classList.remove('preload');
}, 500);

//--------------------- MOBILE MENU : DISPLAY AND TRANSITION ---------------------------//

const buttonMobileMenu = document.querySelector('#btn-mobile-menu');
const mobileMenu = document.querySelector('#mobile-menu');
const mobileMenuLine1 = document.querySelector('#btn-mobile-menu-line1');
const mobileMenuLine2 = document.querySelector('#btn-mobile-menu-line2');
const mobileMenuLine3 = document.querySelector('#btn-mobile-menu-line3');

const toggleMobileMenu = () => {
    mobileMenu.classList.toggle('mobile-menu-active');
};

const toggleTransitionButtonMobileMenu = () => {
    mobileMenuLine1.classList.toggle('transform-mobile-menu-line1');
    mobileMenuLine2.classList.toggle('transform-mobile-menu-line2');
    mobileMenuLine3.classList.toggle('transform-mobile-menu-line3');
};

buttonMobileMenu.addEventListener('click', () => {
    toggleMobileMenu();
    toggleTransitionButtonMobileMenu();
});

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