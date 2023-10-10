//--------------------- MODAL : REVIEWS/TESIMONIES FORM ---------------------------//

const modalReview = document.querySelector('#modal-review');
const modalReviewOpenBtn = document.querySelector('#modal-review-open-btn');
const modalReviewCloseBtn = document.querySelector('#modal-review-close-btn');

modalReviewOpenBtn.addEventListener('click', () => {
  modalReview.className = '';
});

modalReviewCloseBtn.addEventListener('click', () => {
  modalReview.className = 'hidden';
});
