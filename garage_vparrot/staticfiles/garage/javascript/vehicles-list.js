const celestialBlueColor = "#1E91D6";
const greyColor = "#C3C3C3";
const priceStep = 1000;
const yearStep = 1;
const kmStep = 1000;
const paginateBy = 6;
let currentPage = 1;

const rangeMinPrice = document.querySelector("#range-min-price");
const rangeMaxPrice = document.querySelector("#range-max-price");
const textMinPrice = document.querySelector("#text-min-price");
const textMaxPrice = document.querySelector("#text-max-price");

const rangeMinYear = document.querySelector("#range-min-year");
const rangeMaxYear = document.querySelector("#range-max-year");
const textMinYear = document.querySelector("#text-min-year");
const textMaxYear = document.querySelector("#text-max-year");

let rangeMinKm = document.querySelector("#range-min-km");
let rangeMaxKm = document.querySelector("#range-max-km");
let textMinKm = document.querySelector("#text-min-km");
let textMaxKm = document.querySelector("#text-max-km");

//--------------------- FUNCTIONS ---------------------------//

// -------------------- UTILITY FUNCTIONS -----------------------//

/* Convert an integer to another rounded down to a step value.
 ** e.g. value=34200 and step=1000 return 34000
 ** value and step are integer numbers
 ** return a number
 */
const toLowerStep = (value, step) => {
  return Math.floor(value / step) * step;
};

const toUpperStep = (value, step) => {
  return Math.ceil(value / step) * step;
};

/* Convert an integer to a string with thousands separations,
 ** e.g. 1234567 -> 1 234 567.
 ** num is an integer number
 ** arr is an empty array, only use for recursivity
 ** return a string
 */
const toStringHumanized = (num, arr = []) => {
  if (parseInt(num) !== 0) {
    const str = num.toString();
    const len = str.length;
    const subStr = str.substring(len - 3, len);
    arr.unshift(subStr);
    return toStringHumanized((num - subStr) / 1000, arr);
  } else {
    const value = arr.join(" ");
    return value;
  }
};

// -------------------- SET FILTERS ---------------------------//

let vehicleMinYear = undefined;
let vehicleMaxYear = undefined;
let vehicleMinKm = undefined;
let vehicleMaxKm = undefined;
let vehicleMinPrice = undefined;
let vehicleMaxPrice = undefined;
let minPrice = undefined;
let maxPrice = undefined;
let minYear = undefined;
let maxYear = undefined;
let minKm = undefined;
let maxKm = undefined;

const getMin = (min, value) => {
  if ((min !== undefined && min > value) || min === undefined) {
    min = value;
  }
  return min;
};

const getMax = (max, value) => {
  if ((max !== undefined && max < value) || max === undefined) {
    max = value;
  }
  return max;
};

const getMinMaxValues = (vehicle) => {
  vehicleMinYear = getMin(vehicleMinYear, vehicle.year);
  vehicleMaxYear = getMax(vehicleMaxYear, vehicle.year);
  vehicleMinKm = getMin(vehicleMinKm, vehicle.km);
  vehicleMaxKm = getMax(vehicleMaxKm, vehicle.km);
  vehicleMinPrice = getMin(vehicleMinPrice, vehicle.price);
  vehicleMaxPrice = getMax(vehicleMaxPrice, vehicle.price);
};

const setFilter = (rangeMin, rangeMax, textMin, textMax, min, max, step) => {
  rangeMin.setAttribute("step", step);
  rangeMin.setAttribute("min", min);
  rangeMin.setAttribute("max", max);
  rangeMin.setAttribute("value", min);
  rangeMax.setAttribute("step", step);
  rangeMax.setAttribute("min", min);
  rangeMax.setAttribute("max", max);
  rangeMax.setAttribute("value", max);
  textMin.innerHTML = toStringHumanized(min);
  textMax.innerHTML = toStringHumanized(max);
  fillSlider(rangeMin, rangeMax);
};

const setFilters = () => {
  minPrice = toLowerStep(vehicleMinPrice, priceStep);
  maxPrice = toUpperStep(vehicleMaxPrice, priceStep);
  minYear = toLowerStep(vehicleMinYear, yearStep);
  maxYear = toUpperStep(vehicleMaxYear, yearStep);
  minKm = toLowerStep(vehicleMinKm, priceStep);
  maxKm = toUpperStep(vehicleMaxKm, priceStep);

  setFilter(
    rangeMinPrice,
    rangeMaxPrice,
    textMinPrice,
    textMaxPrice,
    minPrice,
    maxPrice,
    priceStep
  );
  setFilter(
    rangeMinYear,
    rangeMaxYear,
    textMinYear,
    textMaxYear,
    minYear,
    maxYear,
    yearStep
  );
  setFilter(
    rangeMinKm, 
    rangeMaxKm, 
    textMinKm, 
    textMaxKm, 
    minKm, 
    maxKm, 
    kmStep
  );
};

// -------------------- CREATE VEHICLE LIST ---------------------------//

const vehiclesDiv = document.getElementById("vehicles-list");
const modalFormInputSubject = document.getElementById("id_subject");

const createVehicleCard = (vehicle, vehicleId, vehiclesPicsObj) => {
  const vehicleName = vehicle.name;
  const vehiclePrice = vehicle.price;
  const vehicleYear = vehicle.year;
  const vehicleKm = vehicle.km;

  let card = document.createElement("div");
  let imageLink = document.createElement("a");
  let image = document.createElement("img");
  let cardContent = document.createElement("div");
  let title = document.createElement("h3");
  let listSpecs = document.createElement("ul");
  let yearSpec = document.createElement("li");
  let yearValue = document.createElement("span");
  let kmSpec = document.createElement("li");
  let kmValue = document.createElement("span");
  let price = document.createElement("p");
  let contactSection = document.createElement("div");
  let contactText = document.createElement("p");
  let contactButtonDiv = document.createElement("div");
  let contactButton = document.createElement("button");

  card.classList.add("shadow-lg", "rounded-md");
  card.id = 'vehicle-id-' + vehicleId;
  imageLink.setAttribute("href", "#");
  image.setAttribute("src", "../" + addPic(vehicleId, vehiclesPicsObj))
  image.setAttribute('alt', "photos de " + vehicleName);
  image.classList.add(
    "rounded-t-md",
    "h-[240px]",
    "object-cover",
    "w-full",
    "hover:contrast-125",
    "transition"
  );
  cardContent.classList.add(
    "flex",
    "flex-col",
    "flex-nowrap",
    "justify-center",
    "items-start",
    "px-6",
    "py-5"
  );
  title.classList.add("font-bold", "text-lg", "text-onyx", "uppercase", "mb-2");
  title.innerText = vehicleName;
  listSpecs.classList.add(
    "list-disc",
    "list-inside",
    "text-slate-500",
    "mb-5",
    "lg:mb-8",
    "xl:mb-10"
  );
  yearSpec.innerText = "Année: ";
  yearValue.innerText = vehicleYear;
  kmSpec.innerText = "Kilométrage: ";
  kmValue.innerText = toStringHumanized(vehicleKm) + "km";
  price.classList.add(
    "text-center",
    "font-bold",
    "text-lg",
    "text-onyx",
    "my-4"
  );
  price.innerText = toStringHumanized(vehiclePrice) + "€";
  contactSection.classList.add('self-center');
  contactText.innerText = "Ce véhicule vous intéresse ?";
  contactButtonDiv.classList.add(
    "flex",
    "flex-row",
    "flex-nowrap",
    "justify-center",
    "items-center",
    "my-2"
  );
  contactButton.classList.add(
    "modal-vehicles-open-btn",
    "font-regular",
    "text-whiteTeal",
    "uppercase",
    "bg-celestialBlue",
    "active:bg-darkBlue",
    "btn-gradient-animation",
    "pt-3",
    "pb-2",
    "px-4",
    "drop-shadow-md",
    "rounded"
  );
  contactButton.innerHTML = 'Contactez nous';
  contactButton.addEventListener('click', () => {
    modalVehicles.classList.remove("hidden");
    modalFormInputSubject.value = vehicleName;
  });

  card.appendChild(imageLink);
  card.appendChild(cardContent);
  imageLink.appendChild(image);
  cardContent.appendChild(title);
  cardContent.appendChild(listSpecs);
  cardContent.appendChild(price);
  cardContent.appendChild(contactSection);
  listSpecs.appendChild(yearSpec);
  listSpecs.appendChild(kmSpec);
  yearSpec.appendChild(yearValue);
  kmSpec.appendChild(kmValue);
  contactSection.appendChild(contactText);
  contactSection.appendChild(contactButtonDiv);
  contactButtonDiv.appendChild(contactButton);

  vehiclesDiv.appendChild(card);
};

const addPic = (vehicleId, vehiclesPicsObj) => {
  for (picsObj of vehiclesPicsObj) {
    const pics = picsObj.fields;
    if (vehicleId === pics.vehicle) {
      return pics.picture;
    }
  }
  return '';
}
// -------------------- FILTERS -----------------------//

const getParseIntMinMax = (min, max) => {
  return [parseInt(min, 10), parseInt(max, 10)];
};

const controlMinRange = (rangeMin, rangeMax, textMin, humanize = true) => {
  const [min, max] = getParseIntMinMax(rangeMin.value, rangeMax.value);
  fillSlider(rangeMin, rangeMax);
  if (min > max) {
    rangeMin.value = max;
    textMin.innerText = humanize ? toStringHumanized(max) : max;
  } else {
    rangeMin.value = min;
    textMin.innerText = humanize ? toStringHumanized(min) : min;
  }
};

const controlMaxRange = (rangeMin, rangeMax, textMax, humanize = true) => {
  const [min, max] = getParseIntMinMax(rangeMin.value, rangeMax.value);
  fillSlider(rangeMin, rangeMax);
  toggleAccessibilty(rangeMax);
  if (min <= max) {
    rangeMax.value = max;
    textMax.innerText = humanize ? toStringHumanized(max) : max;
  } else {
    rangeMax.value = min;
    textMax.innerText = humanize ? toStringHumanized(min) : min;
  }
};

const fillSlider = (rangeMin, rangeMax) => {
  const rangeDistance = rangeMax.max - rangeMax.min;
  const minPosition = rangeMin.value - rangeMax.min;
  const maxPosition = rangeMax.value - rangeMax.min;
  rangeMax.style.background = `linear-gradient(
    to right,
    ${greyColor} 0%,
    ${greyColor} ${(minPosition / rangeDistance) * 100}%,
    ${celestialBlueColor} ${(minPosition / rangeDistance) * 100}%,
    ${celestialBlueColor} ${(maxPosition / rangeDistance) * 100}%, 
    ${greyColor} ${(maxPosition / rangeDistance) * 100}%, 
    ${greyColor} 100%)`;
};

const toggleAccessibilty = (range) => {
  if (Number(range.value) <= 0) {
    range.style.zIndex = 20;
  } else {
    range.style.zIndex = 0;
  }
};

const manageFilter = (
  rangeMin,
  rangeMax,
  textMin,
  textMax,
  humanize = true
) => {
  fillSlider(rangeMin, rangeMax);
  toggleAccessibilty(rangeMax);

  rangeMin.oninput = () => {
    controlMinRange(rangeMin, rangeMax, textMin, humanize);
    currentPage = 1;
    currentPageText.innerText = currentPage + ' / ' + maxPages;
    setFirstPage();
  }
  rangeMax.oninput = () => {
    controlMaxRange(rangeMin, rangeMax, textMax, humanize);
    setFirstPage();
  }
};

const manageFilters = () => {
  manageFilter(rangeMinPrice, rangeMaxPrice, textMinPrice, textMaxPrice);
  manageFilter(rangeMinYear, rangeMaxYear, textMinYear, textMaxYear, false);
  manageFilter(rangeMinKm, rangeMaxKm, textMinKm, textMaxKm);
};

//--------------------- BUTTON RESET FILTER ---------------------------//

const buttonResetFilter = document.getElementById("button-reset-filter");

const resetFilter = (
  rangeMin,
  rangeMax,
  textMin,
  textMax,
  vehicleMin,
  vehicleMax
) => {
  rangeMin.value = vehicleMin;
  rangeMax.value = vehicleMax;
  textMin.innerText = toStringHumanized(vehicleMin);
  textMax.innerText = toStringHumanized(vehicleMax);
  fillSlider(rangeMin, rangeMax);
};

const setResetButtonFilter = () => {
  buttonResetFilter.addEventListener("click", () => {
    resetFilter(
      rangeMinPrice,
      rangeMaxPrice,
      textMinPrice,
      textMaxPrice,
      minPrice,
      maxPrice
    );
    resetFilter(
      rangeMinYear,
      rangeMaxYear,
      textMinYear,
      textMaxYear,
      minYear,
      maxYear
    );
    resetFilter(
      rangeMinKm,
      rangeMaxKm,
      textMinKm,
      textMaxKm,
      minKm,
      maxKm
    );
  });
};

// -------------------- FILTERING VEHICLES ---------------------------//

const filterByPrice = (value) => {
  return (value.fields.price <= rangeMaxPrice.value && value.fields.price >= rangeMinPrice.value);
}
const filterByYear = (value) => {
  return (value.fields.year <= rangeMaxYear.value && value.fields.year >= rangeMinYear.value);
}
const filterByKm = (value) => {
  return (value.fields.km <= rangeMaxKm.value && value.fields.km >= rangeMinKm.value);
}

const removeAllVehicleCard = () => {
  vehiclesDiv.innerHTML = '';
}

// -------------------- PAGINATION ---------------------------//

let maxPages = undefined;
let currentPageText = document.getElementById('vehicles-current-page');
let nextPageLink = document.getElementById('vehicles-next-page');
let previousPageLink = document.getElementById('vehicles-previous-page');
nextPageLink.addEventListener('click', () => {
  setNextPage();
});
previousPageLink.addEventListener('click', () => {
  setPreviousPage();
});

const setPagination = (vehiclesObj) => {
  maxPages = getMaxPages(vehiclesObj);
  currentPageText.innerText = currentPage + ' / ' + maxPages;
}

const getMaxPages = (vehiclesObj) => {
  return Math.ceil(vehiclesObj.length / paginateBy);
}

const setFirstPage = () => {
  currentPage = 1;
  currentPageText.innerText = currentPage + ' / ' + maxPages;
  filterView(vehiclesObj, vehiclesPicsObj);
}

const setNextPage = () => {
  if ((currentPage*paginateBy) <= vehiclesObj.length) {
    currentPage++;
    currentPageText.innerText = currentPage + ' / ' + maxPages;
    filterView(vehiclesObj, vehiclesPicsObj);
  }
}

const setPreviousPage = () => {
  if ((currentPage*paginateBy) > paginateBy) {
    currentPage--;
    currentPageText.innerText = currentPage + ' / ' + maxPages;
    filterView(vehiclesObj, vehiclesPicsObj);
  }
}

const showPage = (vehiclesObj, picsObj) => {
  for (let i = (currentPage - 1) * paginateBy; i < (paginateBy * currentPage); i++) {
    if (i === vehiclesObj.length) {
      break;
    }
    const vehicle = vehiclesObj[i].fields;
    const vehicleId = vehiclesObj[i].pk;
    createVehicleCard(vehicle, vehicleId, picsObj);
  }
}

// -------------------- VEHICULES PICTURES FETCH XHR REQUEST ---------------------------//
const requestPicsUrl = "http://127.0.0.1:8000/vehicles-pics/";
let requestHeaders = new Headers();
requestHeaders.append("Content-Type", "application/json");

const requestInit = {
  method: "GET",
  headers: requestHeaders,
  mode: "same-origin",
  cache: "default",
}; 

let vehiclesPicsObj = [];

const getList = (jsonObj) => {
  let list = [];
  for (obj of jsonObj) {
    list.push(obj);
  }
  return list;
}

fetch(requestPicsUrl, requestInit)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
  })
  .then((data) => {
    vehiclesPicsObj = JSON.parse(data);
    fetchVehicles(vehiclesPicsObj);
  })
  .catch((error) => alert("Une erreur s'est produite : " + error));

// -------------------- VEHICULES FETCH XHR REQUEST ---------------------------//
const requestUrl = "http://127.0.0.1:8000/vehicles-list/";

let vehiclesObj = [];

fetchVehicles = (picsObj) => {
  fetch(requestUrl, requestInit)  
    .then((response) => {
      if (response.ok) {
        return response.json();
      }  
    })  
    .then((data) => {
      vehiclesObj = JSON.parse(data);
      initView(JSON.parse(data), picsObj);
    })  
    .catch((error) => alert("Une erreur s'est produite : " + error));
}

// -------------------- VIEW ---------------------------//

const initView = (vehiclesObj, picsObj) => {
  for (vehicleObj of vehiclesObj) {
    const vehicle = vehicleObj.fields;
    getMinMaxValues(vehicle);
  }
  setFilters();
  manageFilters();
  setResetButtonFilter();
  setPagination(vehiclesObj);
  showPage(vehiclesObj, picsObj);
}

const filterView = (vehiclesObj, picsObj) => {
  let vehiclesFilteredObj = vehiclesObj.filter(filterByPrice);
  vehiclesFilteredObj = vehiclesFilteredObj.filter(filterByYear);
  vehiclesFilteredObj = vehiclesFilteredObj.filter(filterByKm);
  removeAllVehicleCard();
  setPagination(vehiclesFilteredObj);
  showPage(vehiclesFilteredObj, picsObj);
}
