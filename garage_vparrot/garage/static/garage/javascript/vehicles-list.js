// PAGINATION HTML ELEMENTS
const buttonStartPage = document.querySelector('#vehicles-start-page');
const buttonPreviousPage = document.querySelector('#vehicles-previous-page');
const elemCurrentPage = document.querySelector('#vehicles-current-page');
const buttonNextPage = document.querySelector('#vehicles-next-page');
const buttonEndPage = document.querySelector('#vehicles-end-page');

const rangePriceMin = document.querySelector("#range-price-min");
const rangePriceMax = document.querySelector("#range-price-max");
const spanPriceMin = document.querySelector("#text-price-min");
const spanPriceMax = document.querySelector("#text-price-max");

const rangeYearMin = document.querySelector("#range-year-min");
const rangeYearMax = document.querySelector("#range-year-max");
const spanYearMin = document.querySelector("#text-year-min");
const spanYearMax = document.querySelector("#text-year-max");

const rangeKmMin = document.querySelector("#range-km-min");
const rangeKmMax = document.querySelector("#range-km-max");
const spanKmMin = document.querySelector("#text-km-min");
const spanKmMax = document.querySelector("#text-km-max");

const divVehiclesFilters = document.querySelector("#vehicles-filters");
const divVehicles = document.querySelector("#vehicles-content");

const buttonResetFilters = document.querySelector("#button-reset-filters");

// PAGINATION VARIABLES
let paginateBy = 6;
let currentPage = 1;
let numPages = 1;

// FILTERING VARIABLES
let priceMin = "";
let priceMax = "";
let yearMin = "";
let yearMax = "";
let kmMin = "";
let kmMax = "";

// SORTING VARIABLE
let sort_by = "";

// -------------------- UTILITY -----------------------//

/** Convert an integer to a string with thousands separations,
 * e.g. 1234567 -> 1 234 567.
 * num is an integer number.
 * arr is an empty array, only for recursive.
 * Return a string
 */
const withThousandsSpace = (num, arr = []) => {
    if (parseInt(num) !== 0) {
        const str = num.toString();
        const len = str.length;
        const subStr = str.substring(len - 3, len);
        arr.unshift(subStr);
        return withThousandsSpace((num - subStr) / 1000, arr);
    } else {
        return arr.join(" ");
    }
}

// -------------------- SET SLIDERS ---------------------------//

const limitMinSlider = (rangeMin, rangeMax) => {
    const min = rangeMin.valueAsNumber;
    const max = rangeMax.valueAsNumber;
    if (min > max) {
        rangeMin.value = max;
    }
};

const limitMaxSlider = (rangeMin, rangeMax) => {
    const min = rangeMin.valueAsNumber;
    const max = rangeMax.valueAsNumber;
    if (max < min) {
        rangeMax.value = min;
    }
};

const fillSlider = (rangeMin, rangeMax) => {
    const celestialBlueColor = "#007CBB";
    const greyColor = "#C3C3C3";
    const rangeDistance = rangeMax.max - rangeMin.min;
    const minPosition = rangeMin.value - rangeMin.min;
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

const toggleSlider = (rangeMax) => {
    if (rangeMax.valueAsNumber <= 0) {
        rangeMax.style.zIndex = "20";
    } else {
        rangeMax.style.zIndex = "0";
    }
};

const setTextSlider = (rangeMin, rangeMax, textMin, textMax) => {
    textMin.innerHTML = withThousandsSpace(rangeMin.value);
    textMax.innerHTML = withThousandsSpace(rangeMax.value);
}

const setSlider = (rangeMin, rangeMax, textMin, textMax) => {
    setTextSlider(rangeMin, rangeMax, textMin, textMax);
    fillSlider(rangeMin, rangeMax);
    toggleSlider(rangeMax);
};

const setSliders = () => {
    setSlider(
        rangePriceMin,
        rangePriceMax,
        spanPriceMin,
        spanPriceMax
    );
    setSlider(
        rangeYearMin,
        rangeYearMax,
        spanYearMin,
        spanYearMax
    );
    setSlider(
        rangeKmMin,
        rangeKmMax,
        spanKmMin,
        spanKmMax
    );
};

//--------------------- RESET SLIDERS ---------------------------//

const resetSliders = () => {
    rangePriceMin.value = rangePriceMin.min;
    rangePriceMax.value = rangePriceMax.max;
    rangeYearMin.value = rangeYearMin.min;
    rangeYearMax.value = rangeYearMax.max;
    rangeKmMin.value = rangeKmMin.min;
    rangeKmMax.value = rangeKmMax.max;
    setSliders();
}

buttonResetFilters.addEventListener("click", () => {
    resetSliders();
    setFilters();
    fetchRequest(1);
});

// -------------------- FILTERING -----------------------//

const setFilters = () => {
    priceMin = rangePriceMin.value;
    priceMax = rangePriceMax.value;
    yearMin = rangeYearMin.value;
    yearMax = rangeYearMax.value;
    kmMin = rangeKmMin.value;
    kmMax = rangeKmMax.value;
}

const manageSlider = (
    rangeMin,
    rangeMax
) => {
    rangeMin.oninput = () => {
        limitMinSlider(rangeMin, rangeMax);
        setSliders()
        setFilters();
        fetchRequest(1);
    }
    rangeMax.oninput = () => {
        limitMaxSlider(rangeMin, rangeMax);
        setSliders()
        setFilters();
        fetchRequest(1);
    }
};

const manageSliders = () => {
    manageSlider(rangePriceMin, rangePriceMax);
    manageSlider(rangeYearMin, rangeYearMax);
    manageSlider(rangeKmMin, rangeKmMax);
};

// -------------------- PAGINATION ---------------------------//

buttonStartPage.addEventListener('click', () => {
    fetchRequest(1);
    divVehiclesFilters.scrollIntoView(true);
})
buttonPreviousPage.addEventListener('click', () => {
    fetchRequest(currentPage - 1);
    divVehiclesFilters.scrollIntoView(true);
});

buttonNextPage.addEventListener('click', () => {
    fetchRequest(currentPage + 1);
    divVehiclesFilters.scrollIntoView(true);
});
buttonEndPage.addEventListener('click', () => {
    fetchRequest(numPages);
    divVehiclesFilters.scrollIntoView(true);
})

const setPagination = (page, hasPrevious, hasNext) => {
    buttonPreviousPage.innerHTML = `${page - 1}`;
    elemCurrentPage.innerText = `${page}`;
    buttonNextPage.innerText = `${page + 1}`;
    if (hasPrevious) {
        buttonStartPage.style.visibility = "visible";
        buttonPreviousPage.style.visibility = "visible";
    } else {
        buttonStartPage.style.visibility = "hidden";
        buttonPreviousPage.style.visibility = "hidden";

    }
    if (hasNext) {
        buttonNextPage.style.visibility = "visible";
        buttonEndPage.style.visibility = "visible";
    } else {
        buttonNextPage.style.visibility = "hidden";
        buttonEndPage.style.visibility = "hidden";
    }
}

// -------------------- CREATE VEHICLE LIST ---------------------------//

const addVehicleCard = (vehicle) => {
    const vehicleId = vehicle['id'];
    const vehicleName = vehicle['name'];
    const vehiclePrice = vehicle['price'];
    const vehicleYear = vehicle['year'];
    const vehicleKm = vehicle['km'];
    const vehicleEnergy = vehicle['energy']
    const vehiclePictures = vehicle['pictures'];

    let vehicleCard = document.createElement('div');
    vehicleCard.innerHTML = `
        <div class="shadow-lg rounded-md">
            <div>
                <a href="/vehicles/${vehicleId}/">
                    <div class="overflow-hidden h-auto rounded-t-md">
                        <img class="object-cover max-h-64 hover:scale-105 hover:brightness-110 transition"
                             src="../${vehiclePictures[0]}" alt="${vehicleName}"/>
                    </div>
                </a>
            </div>
            <div class="flex flex-col flex-nowrap justify-center items-start px-4 sm:px-5 xl:px-6 py-2 sm:py-3 xl:py-4">
                <h3 title="${vehicleName}" class="w-full font-rokkitt font-bold text-2xl text-onyx uppercase truncate mb-2">
                    ${vehicleName}
                </h3>
                <ul class="list-disc list-inside text-slate-500 mb-3 lg:mb-4 xl:mb-5">
                    <li>Année: <span>${vehicleYear}</span></li>
                    <li>Kilométrage: <span>${withThousandsSpace(vehicleKm)}</span> km</li>
                    <li>Énergie: <span>${vehicleEnergy}</span></li>
                </ul>
                <p class="font-bold text-lg text-onyx my-4">
                    ${withThousandsSpace(vehiclePrice)}<span> €</span>
                </p>
                <div class="self-center">
                    <div class="flex flex-row flex-nowrap justify-center items-center my-2">
                        <a href="/vehicles/${vehicleId}/"
                            class="font-regular text-whiteTeal uppercase bg-celestialBlue active:bg-darkBlue btn-gradient-animation pt-3 pb-2 px-4 drop-shadow-md rounded">
                            Voir la fiche
                        </a>
                    </div>
                </div>
            </div>
        </div>
        `;
    divVehicles.appendChild(vehicleCard);
};

const removeAllVehicleCard = () => {
    divVehicles.innerHTML = '';
}

const setContent = (vehicles) => {
    removeAllVehicleCard();
    for (let i = 0; i < Object.entries(vehicles).length; i++) {
        addVehicleCard(Object.entries(vehicles)[i][1]);
    }
}

// -------------------- VEHICLES FETCH XHR REQUEST ---------------------------//

const fetchRequest = (page) => {
    const requestUrl = `http://127.0.0.1:8000/api/get/vehicles?page=${page}&sort_by=${sort_by}&limit=${paginateBy}&price_min=${priceMin}&price_max=${priceMax}&year_min=${yearMin}&year_max=${yearMax}&km_min=${kmMin}&km_max=${kmMax}`;

    let requestHeaders = new Headers();
    requestHeaders.append("Content-Type", "application/json");

    const requestInit = {
        method: "GET",
        headers: requestHeaders,
        mode: "same-origin",
        cache: "default",
    };

    fetch(requestUrl, requestInit)
        .then(response => response.json())
        .then(data => {
            currentPage = parseInt(data['pagination']['page']);
            paginateBy = parseInt(data['pagination']['paginate_by']);
            numPages = parseInt(data['pagination']['num_pages']);
            setPagination(currentPage, data['pagination']['has_previous'], data['pagination']['has_next']);
            setContent(data['vehicles']);
        })
        .catch((error) => alert("Une erreur s'est produite : " + error));
}

// On page load, reset sliders state
resetSliders();
// first request of vehicles list
fetchRequest(1);
// start to manage (range) sliders
manageSliders();