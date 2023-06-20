//--------------------- FUNCTIONS ---------------------------//

const toStringWithSpaces = (num, arr = []) => {
  
  if (parseInt(num) !== 0)  {
    const str = num.toString();
    const len = str.length;
    const subStr = str.substring(len - 3, len);
    arr.unshift(subStr);
    return toStringWithSpaces((num - subStr)/1000, arr);
  } else {
    const value = arr.join(' ');
    return value;
  }
};

//--------------------- MENU (NAV) MOBILE ---------------------------//
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

//--------------------- BUTTON GRADIENT ---------------------------//

const buttons = document.getElementsByClassName("btn-gradient-animation");

const btnHoverAnimation = (button) => {
  button.classList.remove("btn-bg--hover-out");
  button.classList.add("btn-bg--hover");
};

const btnHoverAnimationReverse = (button) => {
  button.classList.remove("btn-bg--hover");
  button.classList.add("btn-bg--hover-out");
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

//--------------------- LEAFLET JS : MAP ---------------------------//

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

//--------------------- INPUT RANGE MUTIPLE VALUE ---------------------------//

// -------------------- PRICE FILTER -----------------------//
const celestialBlueColor = '#1E91D6';
const greyColor = '#C3C3C3';

const controlMinRangePrice = (rangeMinPrice, rangeMaxPrice, textMinPrice) => {
  const [min, max] = getParsedPrice(rangeMinPrice, rangeMaxPrice);
  fillSliderPrice(rangeMinPrice, rangeMaxPrice);
  if (min > max) {
    rangeMinPrice.value = max;
    textMinPrice.innerText = toStringWithSpaces(max);
  } else {
    rangeMinPrice.value = min;
    textMinPrice.innerText = toStringWithSpaces(min);
  }
}

const controlMaxRangePrice = (rangeMinPrice, rangeMaxPrice, textMaxPrice) => {
  const [min, max] = getParsedPrice(rangeMinPrice, rangeMaxPrice);
  fillSliderPrice(rangeMinPrice, rangeMaxPrice);
  setToggleAccessiblePrice(rangeMaxPrice);
  if (min <= max) {
    rangeMaxPrice.value = max;
    textMaxPrice.innerText = toStringWithSpaces(max);
  } else {
    rangeMaxPrice.value = min;
    textMaxPrice.innerText = toStringWithSpaces(min);
  }
}

const getParsedPrice = (currentMinPrice, currentMaxPrice) => {
  const min = parseInt(currentMinPrice.value, 10);
  const max = parseInt(currentMaxPrice.value, 10);
  return [min, max];
}

const fillSliderPrice = (rangeMin, rangeMax) => {
  const rangeDistance = rangeMax.max - rangeMax.min;
  const minPosition = rangeMin.value - rangeMax.min;
  const maxPosition = rangeMax.value - rangeMax.min;
  rangeMax.style.background = `linear-gradient(
    to right,
    ${greyColor} 0%,
    ${greyColor} ${(minPosition)/(rangeDistance)*100}%,
    ${celestialBlueColor} ${((minPosition)/(rangeDistance))*100}%,
    ${celestialBlueColor} ${(maxPosition)/(rangeDistance)*100}%, 
    ${greyColor} ${(maxPosition)/(rangeDistance)*100}%, 
    ${greyColor} 100%)`;
}

const setToggleAccessiblePrice = (currentTarget) => {
  const rangeMaxPrice = document.querySelector('#range-max-price');
  if (Number(currentTarget.value) <= 0 ) {
    rangeMaxPrice.style.zIndex = 20;
  } else {
    rangeMaxPrice.style.zIndex = 0;
  }
}


const rangeMinPrice = document.querySelector('#range-min-price');
const rangeMaxPrice = document.querySelector('#range-max-price');
const textMinPrice = document.querySelector('#text-min-price');
const textMaxPrice = document.querySelector('#text-max-price');
fillSliderPrice(rangeMinPrice, rangeMaxPrice);
setToggleAccessiblePrice(rangeMaxPrice);

rangeMinPrice.oninput = () => controlMinRangePrice(rangeMinPrice, rangeMaxPrice, textMinPrice);
rangeMaxPrice.oninput = () => controlMaxRangePrice(rangeMinPrice, rangeMaxPrice, textMaxPrice);

// -------------------- YEAR FILTER -----------------------//

const controlMinRangeYear = (rangeMinYear, rangeMaxYear, textMinYear) => {
  const [min, max] = getParsedYear(rangeMinYear, rangeMaxYear);
  fillSliderYear(rangeMinYear, rangeMaxYear);
  if (min > max) {
    rangeMinYear.value = max;
    textMinYear.innerText = max;
  } else {
    rangeMinYear.value = min;
    textMinYear.innerText = min;
  }
}

const controlMaxRangeYear = (rangeMinYear, rangeMaxYear, textMaxYear) => {
  const [min, max] = getParsedYear(rangeMinYear, rangeMaxYear);
  fillSliderYear(rangeMinYear, rangeMaxYear);
  setToggleAccessibleYear(rangeMaxYear);
  if (min <= max) {
    rangeMaxYear.value = max;
    textMaxYear.innerText = max;
  } else {
    rangeMaxYear.value = min;
    textMaxYear.innerText = min;
  }
}

const getParsedYear = (currentMinYear, currentMaxYear) => {
  const min = parseInt(currentMinYear.value, 10);
  const max = parseInt(currentMaxYear.value, 10);
  return [min, max];
}

const fillSliderYear = (rangeMin, rangeMax) => {
  const rangeDistance = rangeMax.max - rangeMax.min;
  const minPosition = rangeMin.value - rangeMax.min;
  const maxPosition = rangeMax.value - rangeMax.min;
  rangeMax.style.background = `linear-gradient(
    to right,
    ${greyColor} 0%,
    ${greyColor} ${(minPosition)/(rangeDistance)*100}%,
    ${celestialBlueColor} ${((minPosition)/(rangeDistance))*100}%,
    ${celestialBlueColor} ${(maxPosition)/(rangeDistance)*100}%, 
    ${greyColor} ${(maxPosition)/(rangeDistance)*100}%, 
    ${greyColor} 100%)`;
}

const setToggleAccessibleYear = (currentTarget) => {
  const rangeMaxYear = document.querySelector('#range-max-year');
  if (Number(currentTarget.value) <= 0 ) {
    rangeMaxYear.style.zIndex = 20;
  } else {
    rangeMaxYear.style.zIndex = 0;
  }
}


const rangeMinYear = document.querySelector('#range-min-year');
const rangeMaxYear = document.querySelector('#range-max-year');
const textMinYear = document.querySelector('#text-min-year');
const textMaxYear = document.querySelector('#text-max-year');
fillSliderYear(rangeMinYear, rangeMaxYear);
setToggleAccessibleYear(rangeMaxYear);

rangeMinYear.oninput = () => controlMinRangeYear(rangeMinYear, rangeMaxYear, textMinYear);
rangeMaxYear.oninput = () => controlMaxRangeYear(rangeMinYear, rangeMaxYear, textMaxYear);

// -------------------- KM FILTER -----------------------//

const controlMinRangeKm = (rangeMinKm, rangeMaxKm, textMinKm) => {
  const [min, max] = getParsedKm(rangeMinKm, rangeMaxKm);
  fillSliderKm(rangeMinKm, rangeMaxKm);
  if (min > max) {
    rangeMinKm.value = max;
    textMinKm.innerText = toStringWithSpaces(max);
  } else {
    rangeMinKm.value = min;
    textMinKm.innerText = toStringWithSpaces(min);
  }
}

const controlMaxRangeKm = (rangeMinKm, rangeMaxKm, textMaxKm) => {
  const [min, max] = getParsedKm(rangeMinKm, rangeMaxKm);
  fillSliderKm(rangeMinKm, rangeMaxKm);
  setToggleAccessibleKm(rangeMaxKm);
  if (min <= max) {
    rangeMaxKm.value = max;
    textMaxKm.innerText = toStringWithSpaces(max);
  } else {
    rangeMaxKm.value = min;
    textMaxKm.innerText = toStringWithSpaces(min);
  }
}

const getParsedKm = (currentMinKm, currentMaxKm) => {
  const min = parseInt(currentMinKm.value, 10);
  const max = parseInt(currentMaxKm.value, 10);
  return [min, max];
}

const fillSliderKm = (rangeMin, rangeMax) => {
  const rangeDistance = rangeMax.max - rangeMax.min;
  const minPosition = rangeMin.value - rangeMax.min;
  const maxPosition = rangeMax.value - rangeMax.min;
  rangeMax.style.background = `linear-gradient(
    to right,
    ${greyColor} 0%,
    ${greyColor} ${(minPosition)/(rangeDistance)*100}%,
    ${celestialBlueColor} ${((minPosition)/(rangeDistance))*100}%,
    ${celestialBlueColor} ${(maxPosition)/(rangeDistance)*100}%, 
    ${greyColor} ${(maxPosition)/(rangeDistance)*100}%, 
    ${greyColor} 100%)`;
}

const setToggleAccessibleKm = (currentTarget) => {
  const rangeMaxKm = document.querySelector('#range-max-km');
  if (Number(currentTarget.value) <= 0 ) {
    rangeMaxKm.style.zIndex = 20;
  } else {
    rangeMaxKm.style.zIndex = 0;
  }
}


const rangeMinKm = document.querySelector('#range-min-km');
const rangeMaxKm = document.querySelector('#range-max-km');
const textMinKm = document.querySelector('#text-min-km');
const textMaxKm = document.querySelector('#text-max-km');
fillSliderKm(rangeMinKm, rangeMaxKm);
setToggleAccessibleKm(rangeMaxKm);

rangeMinKm.oninput = () => controlMinRangeKm(rangeMinKm, rangeMaxKm, textMinKm);
rangeMaxKm.oninput = () => controlMaxRangeKm(rangeMinKm, rangeMaxKm, textMaxKm);

//--------------------- BUTTON RESET FILTER ---------------------------//

const buttonResetFilter = document.getElementById('button-reset-filter');

buttonResetFilter.addEventListener('click', () => {
  // Price filter
  rangeMinPrice.value = 0;
  rangeMaxPrice.value = 1000000;
  textMinPrice.innerText = toStringWithSpaces(0);
  textMaxPrice.innerText = toStringWithSpaces(1000000);
  fillSliderPrice(rangeMinPrice, rangeMaxPrice);
  // Year filter
  rangeMinYear.value = 0;
  rangeMaxYear.value = 2023;
  textMinYear.innerText = 0;
  textMaxYear.innerText = 2023;
  fillSliderYear(rangeMinYear, rangeMaxYear);
  // Km filter
  rangeMinKm.value = 0;
  rangeMaxKm.value = 1000000;
  textMinKm.innerText = toStringWithSpaces(0);
  textMaxKm.innerText = toStringWithSpaces(1000000);
  fillSliderKm(rangeMinKm, rangeMaxKm);
});
