//--------------------- MODAL : VEHCILES CONTACT FORM  ---------------------------//

const modalVehicles = document.getElementById('modal-vehicles');
const modalVehiclesOpenBtns = document.getElementsByClassName('modal-vehicles-open-btn');
const modalVehiclesCloseBtn = document.getElementById('modal-vehicles-close-btn');

for (const button of modalVehiclesOpenBtns) {
  button.addEventListener('click', () => {
    modalVehicles.classList.remove('hidden');
  });
}

modalVehiclesCloseBtn.addEventListener('click', () => {
  modalVehicles.classList.add('hidden');
});