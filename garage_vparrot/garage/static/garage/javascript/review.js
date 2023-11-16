const reviews = document.querySelectorAll('.review');
const reviewFullCloseButtons = document.querySelectorAll('.review-full-close-btn');

const getElementReviewFull = (element) => {
    const id = element.getAttribute('id');
    return document.querySelector(`#review-full-${id}`);
}

const toggleReviewFull = (review) => {
    review.classList.toggle('hidden');
}

reviews.forEach((review) => {
    review.addEventListener('click', () => {
        const reviewFull = getElementReviewFull(review);
        toggleReviewFull(reviewFull);
    });
});

reviewFullCloseButtons.forEach((closeBtn) => {
    closeBtn.addEventListener('click', () => {
        const reviewFull = getElementReviewFull(closeBtn);
        toggleReviewFull(reviewFull);
    })
})