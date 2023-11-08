//--------------------- MODAL : VEHICLES CONTACT FORM  ---------------------------//

const modalVehicle = document.querySelector('#modal-vehicles');
const modalVehicleOpenBtn = document.querySelector('#modal-vehicles-open-btn')
const modalVehicleCloseBtn = document.querySelector('#modal-vehicles-close-btn');
const modalVehicleSubject = document.querySelector("#id_subject");
const vehicleName = document.querySelector('#vehicle-title').getAttribute('title');


const toggleModalVehicle = () => {
    modalVehicle.classList.toggle('hidden');
}

modalVehicleOpenBtn.addEventListener('click', () => {
   toggleModalVehicle();
   modalVehicleSubject.value = vehicleName;
});
modalVehicleCloseBtn.addEventListener('click', () => {
    toggleModalVehicle();
    modalVehicleSubject.value = "";
});