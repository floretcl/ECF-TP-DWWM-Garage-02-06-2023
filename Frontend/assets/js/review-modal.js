//--------------------- MODAL : REVIEWS/TESIMONIES FORM ---------------------------//

const modalReview = document.getElementById('modal-review');
const modalReviewOpenBtn = document.getElementById('modal-review-open-btn');
const modalReviewCloseBtn = document.getElementById('modal-review-close-btn');

modalReviewOpenBtn.addEventListener('click', () => {
  modalReview.className = '';
});

modalReviewCloseBtn.addEventListener('click', () => {
  modalReview.className = 'hidden';
});
