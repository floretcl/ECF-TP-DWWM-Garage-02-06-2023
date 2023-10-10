//--------------------- INPUT RANGE 5 STAR ---------------------------//

const reviewRating = document.querySelector('#id_rating');

const setValueReviewRating = (rating) => {
    reviewRating.style.setProperty('--value', rating.value);
};

reviewRating.oninput = () => setValueReviewRating(reviewRating);