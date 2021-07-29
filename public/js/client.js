const addPhotoForm = document.forms.addphoto;
const itemsContainer = document.querySelector(".itemsContainer");
const weather = document.querySelector(".weather");
// addPhotoForm?.addEventListener("submit", async (event) => {
//   event.preventDefault();
//   const formData = new FormData(event.target);
//   console.log(event.target);
//   const response = await fetch("/upload", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(formData),
//   });
// });

// const info = document.querySelector("[data-button]");

itemsContainer.addEventListener("click", async (e) => {
  const itemWr = e.target.closest("[data-place]");
  const itemPlace = itemWr?.dataset.place;
  // const response = await fetch(`/allitems/${itemId}`);
  console.log("itemPlace--->>>", itemPlace);
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${itemPlace}&appid=60d93a16786a5a364a186d815f182855`
  );
  const res = await response.json();
  console.log(res);
  weather.innerHTML = `<b>City:</b>${res.name}<b><br>Weather:</b>${
    res.weather[0].main
  }<br><img src="https://openweathermap.org/img/w/${
    res.weather[0].icon
  }.png"> <br>
  <b>Temperature:</b> ${Math.round(
    res.main.temp - 273
  )}&#176<br><b>Feels like:</b> ${Math.round(res.main.feels_like - 273)}&#176<br><b>Humidity:</b> ${
    res.main.humidity
  }%<br>`;
});
