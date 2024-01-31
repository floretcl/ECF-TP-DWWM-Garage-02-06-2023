const buttonMobileMenu = document.querySelector('#btn-mobile-menu');
const mobileMenu = document.querySelector('#mobile-menu');
const mobileMenuLine1 = document.querySelector('#btn-mobile-menu-line1');
const mobileMenuLine2 = document.querySelector('#btn-mobile-menu-line2');
const mobileMenuLine3 = document.querySelector('#btn-mobile-menu-line3');

const toggleMobileMenu = () => {
    mobileMenu.classList.toggle('mobile-menu-active');
};

const toggleTransitionButtonMobileMenu = () => {
    mobileMenuLine1.classList.toggle('transform-mobile-menu-line1');
    mobileMenuLine2.classList.toggle('transform-mobile-menu-line2');
    mobileMenuLine3.classList.toggle('transform-mobile-menu-line3');
};

buttonMobileMenu.addEventListener('click', () => {
    toggleMobileMenu();
    toggleTransitionButtonMobileMenu();
});
