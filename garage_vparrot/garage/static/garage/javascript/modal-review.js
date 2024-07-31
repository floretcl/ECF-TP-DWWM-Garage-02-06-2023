//--------------------- MODAL : REVIEW FORM ---------------------------//

const modalReview = document.querySelector('#modal-review');
const modalReviewOpenBtn = document.querySelector('#modal-review-open-btn');
const modalReviewCloseBtn = document.querySelector('#modal-review-close-btn');

const toggleModalReview = () => {
    modalReview.classList.toggle('hidden');
}

modalReviewOpenBtn.addEventListener('click', () => {
    toggleModalReview()
});

modalReviewCloseBtn.addEventListener('click', () => {
    toggleModalReview()
});
