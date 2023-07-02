//--------------------- MODAL : VEHCILES CONTACT FORM  ---------------------------//

const modalVehicles = document.getElementById('modal-vehicles');
const modalVehiclesOpenBtns = document.getElementsByClassName('modal-vehicles-open-btn');
const modalVehiclesCloseBtn = document.getElementById('modal-vehicles-close-btn');

for (const button of modalVehiclesOpenBtns) {
  button.addEventListener('click', () => {
    modalVehicles.className = '';
  });
}

modalVehiclesCloseBtn.addEventListener('click', () => {
  modalVehicles.className = 'hidden';
});