//Tokens
const AQICN_TOKEN = "767fca068f0ce0abe1d43de53952dab5e31678be";

//Defined Variables
let cityContainer = document.getElementById("city-container");
let searchBar = document.getElementById("city-search");

//End Point URL of AQUICN
let endPoint = "https://api.waqi.info/map/bounds/?token=" + AQICN_TOKEN + "&latlng=6.0,68.0,38.0,98.0";

//AQUICN config
let aqicnConfig = {
  method: "GET"
};

searchBar.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    let searchWord = event.target.value;
    console.log(searchWord);

    // Clear previous results so that every new search displays fresh results
    cityContainer.innerHTML = "";

    //Fetching Details of Cities
    fetch(endPoint, aqicnConfig)
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        // Map the response to get an array of city names
        const cityList = response.data.map(function(cityDetails) {
          return cityDetails.station.name;
        });

        // Loop through the list and display matching cities
        for (let cityName of cityList) {
          if (cityName.toLowerCase().includes(searchWord.toLowerCase())) {
            // Create a Bootstrap card for each matching city
            let cityCard = document.createElement("div");
            cityCard.classList.add("card", "mb-3");
            cityCard.style.width = "18rem";

            let cardBody = document.createElement("div");
            cardBody.classList.add("card-body");

            // Create an element for the city name
            let cityNameEl = document.createElement("p");
            cityNameEl.classList.add("card-text");
            cityNameEl.textContent = cityName;

            // Find the corresponding AQI value for this city
            let aqiValue = "";
            for (let city of response.data) {
              if (city.station.name === cityName) {
                aqiValue = city.aqi;
                break; // Found the matching city, exit the loop.
              }
            }

            // Create an element for the AQI value
            let cityAQIEl = document.createElement("p");
            cityAQIEl.classList.add("card-text");
            cityAQIEl.textContent = "AQI: " + aqiValue;

            // Append the city name and AQI elements to the card body
            cardBody.appendChild(cityNameEl);
            cardBody.appendChild(cityAQIEl);

            // Append the card body to the card, and the card to the container
            cityCard.appendChild(cardBody);
            cityContainer.appendChild(cityCard);
          }
        }
      });
  }
});
