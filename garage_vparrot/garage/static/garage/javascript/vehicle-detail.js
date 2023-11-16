const mainPicture = document.querySelector('#vehicle-main-picture');
const thumbnails = document.querySelectorAll('.vehicle-thumbnail-picture');

const modifyPicture = (thumbnail) => {
    const url = thumbnail.getAttribute('id');
    const alt = thumbnail.firstElementChild.getAttribute('alt');

    mainPicture.innerHTML = `<img class="object-cover md:h-96 rounded-md" src="/${url}" alt="${alt}"/>`;
}

thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener('click', () => {
        modifyPicture(thumbnail);
    });
});