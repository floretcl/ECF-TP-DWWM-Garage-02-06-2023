//--------------------- MODAL : VEHICLES CONTACT FORM  ---------------------------//

const modalVehicles = document.querySelector('#modal-vehicles');
const modalVehiclesCloseBtn = document.querySelector('#modal-vehicles-close-btn');

modalVehiclesCloseBtn.addEventListener('click', () => {
    modalVehicles.classList.add('hidden');
    modalFormInputSubject.value = "";
});