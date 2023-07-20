//--------------------- PAGE PRELOAD : PREVENT ANIMATION ON LOADING ---------------------------//

setTimeout(() => {
  document.body.classList.remove('preload');
},500);

//--------------------- MENU (NAV) MOBILE ---------------------------//
const buttonMenuMobile = document.getElementById('btn-menu-mobile');
const menuMobile = document.getElementById('menu-mobile');
const menuMobileLine1 = document.getElementById('btn-menu-mobile-line1');
const menuMobileLine2 = document.getElementById('btn-menu-mobile-line2');
const menuMobileLine3 = document.getElementById('btn-menu-mobile-line3');

const toggleMenuMobile = () => {
  menuMobile.classList.toggle('menu-mobile-active');
};

const toggleButtonMenuMobile = () => {
  menuMobileLine2.classList.toggle('opacity-0');
  menuMobileLine1.classList.toggle('rotate-45');
  menuMobileLine3.classList.toggle('-rotate-45');
  menuMobileLine1.classList.toggle('translate-y-2.5');
  menuMobileLine3.classList.toggle('-translate-y-2');
};

buttonMenuMobile.addEventListener('click', () => {
  toggleMenuMobile();
  toggleButtonMenuMobile();
});
