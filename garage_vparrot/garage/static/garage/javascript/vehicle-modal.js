//--------------------- MODAL : VEHICLES CONTACT FORM  ---------------------------//

const modalVehicles = document.getElementById('modal-vehicles');
const modalVehiclesCloseBtn = document.getElementById('modal-vehicles-close-btn');

modalVehiclesCloseBtn.addEventListener('click', () => {
  modalVehicles.classList.add('hidden');
  modalFormInputSubject.value = "";
});