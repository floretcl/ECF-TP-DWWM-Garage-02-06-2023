const buttonMenuMobile = document.getElementById("btn-menu-mobile");
const menuMobile = document.getElementById("menu-mobile");
const menuMobileLine1 = document.getElementById("btn-menu-mobile-line1");
const menuMobileLine2 = document.getElementById("btn-menu-mobile-line2");
const menuMobileLine3 = document.getElementById("btn-menu-mobile-line3");

const toggleMenuMobile = () => {
  menuMobile.classList.toggle("menu-mobile-active");
};

const toggleButtonMenuMobile = () => {
  menuMobileLine2.classList.toggle("opacity-0");
  menuMobileLine1.classList.toggle("rotate-45");
  menuMobileLine3.classList.toggle("-rotate-45");
  menuMobileLine1.classList.toggle("translate-y-2.5");
  menuMobileLine3.classList.toggle("-translate-y-2");
};

buttonMenuMobile.addEventListener("click", () => {
  toggleMenuMobile();
  toggleButtonMenuMobile();
});

//----------------------------------------------------------//

const buttons = document.getElementsByClassName("btn-gradient-animation");

const btnHoverAnimation = (button) => {
  button.classList.remove("btn__bg--hover-out");
  button.classList.add("btn__bg--hover");
};

const btnHoverAnimationReverse = (button) => {
  button.classList.remove("btn__bg--hover");
  button.classList.add("btn__bg--hover-out");
};

for (const button of buttons) {
  button.addEventListener("mouseenter", () => {
    btnHoverAnimation(button);
  });
}

for (const button of buttons) {
  button.addEventListener("mouseleave", () => {
    btnHoverAnimationReverse(button);
  });
}

//----------------------------------------------------------//

const lon = 43.614012;
const lat = 1.462147;
const zoomLevel = 16;
const maxZoom = 19;
const minZoom = 10;

let leafletMap = L.map("leaflet-map").setView([lon, lat], zoomLevel);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  minZoom: minZoom,
  maxZoom: maxZoom,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(leafletMap);

let garageVParrotPlaceMarker = L.marker([lon, lat], {
  title: "Garage V. Parrot",
  alt: "Emplacement du garage V. Parrot",
})
  .addTo(leafletMap)
  .bindPopup("Garage V. Parrot");
