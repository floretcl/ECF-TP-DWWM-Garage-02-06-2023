//--------------------- MODAL : MESSAGES  ---------------------------//

const modalMessages = document.querySelector('#modal-messages');
const modalMessagesCloseBtn = document.querySelector('#modal-messages-close-btn');

modalMessagesCloseBtn.addEventListener('click', () => {
  modalMessages.classList.add('hidden');
});
