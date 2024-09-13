// script.js

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');

  const navbar = document.querySelector('.navbar');
  navbar.classList.replace('navbar-light', 'navbar-dark');
  navbar.classList.replace('bg-light', 'bg-dark');
}

function esegui() {
  const espressione = document.querySelector('#expression').value;
  const res = calcola(espressione);
  const result = document.querySelector('#result');
  const steps = document.querySelector('#steps');
  steps.innerHTML = '<br>';
  const expression = document.querySelector('#normal-expression');
  result.innerHTML = res.stack[0];
  res.operazioni.forEach((el) => {
    steps.innerHTML += `${el} <br>`;
  });

  expression.innerHTML = res.espressione[0];
}
