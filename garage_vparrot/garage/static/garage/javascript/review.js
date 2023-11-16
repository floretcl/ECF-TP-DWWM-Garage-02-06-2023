const reviews = document.querySelectorAll('.review');
const reviewFull = document.querySelector('#review-full');
const reviewFullCloseBtn = document.querySelector('#review-full-close-btn');

const toggleReviewCard = () => {
    reviewFull.classList.toggle('hidden');
}

reviews.forEach((review) => {
    review.addEventListener('click', () => {
        toggleReviewCard();
    });
});

reviewFullCloseBtn.addEventListener('click', () => {
    toggleReviewCard();
});