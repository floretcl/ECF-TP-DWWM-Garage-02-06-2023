const buttonMobileMenu = document.querySelector('#btn-mobile-menu');
const mobileMenu = document.querySelector('#mobile-menu');
const mobileMenuLine1 = document.querySelector('#btn-mobile-menu-line1');
const mobileMenuLine2 = document.querySelector('#btn-mobile-menu-line2');
const mobileMenuLine3 = document.querySelector('#btn-mobile-menu-line3');

const toggleMobileMenu = () => {
  mobileMenu.classList.toggle('mobile-menu-active');
};

const toggleTransitionButtonMobileMenu = () => {
  mobileMenuLine2.classList.toggle('opacity-0');
  mobileMenuLine1.classList.toggle('rotate-45');
  mobileMenuLine3.classList.toggle('-rotate-45');
  mobileMenuLine1.classList.toggle('translate-y-2.5');
  mobileMenuLine3.classList.toggle('-translate-y-2');
};

buttonMobileMenu.addEventListener('click', () => {
  toggleMobileMenu();
  toggleTransitionButtonMobileMenu();
});
