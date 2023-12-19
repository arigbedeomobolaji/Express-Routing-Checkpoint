//jshint esversion: 9

const hamburger = document.querySelector(".hamburger");
const navbar = document.querySelector("#navbar");

hamburger.addEventListener("click", () => {
 navbar.classList.toggle("resp");
});