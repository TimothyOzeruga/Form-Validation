"use strict";

window.addEventListener('scroll', function () {
  if (this.scrollY > 100) {
    document.querySelector('.header').classList.add('fixed');
  } else {
    document.querySelector(".header").classList.remove('fixed');
  }
});
wow = new WOW({
  boxClass: 'wow',
  animateClass: 'animate__animated',
  offset: 20,
  mobile: true,
  live: true
});
wow.init();