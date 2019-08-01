'use strict';

function main () {
  const burger = document.querySelector('.burger-menu');
  const navbar = document.querySelector('.navbar');

  burger.addEventListener('click', (e) => {
    console.log(e);
    navbar.classList.toggle('visible');
  });
}

window.addEventListener('load', main);
