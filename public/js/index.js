//jshint esversion: 9

const address = document.querySelector(".address");
const submit = document.querySelector(".submit");
const weatherForecast = document.querySelector(".weather-data");

submit.addEventListener("click", async (e) => {
 e.preventDefault();
 weatherForecast.innerHTML = "<h2>Loading...</h2>";
 const location = encodeURI(address.value).trim();
 const url = `/weather?location=${location}`;

 const response = await fetch(url);
 const data = await response.json();
 if (!data.error) {
  weatherForecast.innerHTML = `<h1>Here is your weather report</h1> <p>${data.weatherDesc}<p>`;
 } else {
  weatherForecast.innerHTML = `<h1 style="font-size:16px;color:red;background:rgba(255,255,255,.4);margin-top:10px">Oops Weather information not found for location</h1>`;
 }
 address.value = "";
});
