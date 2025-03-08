//Tokens
const AQICN_TOKEN="767fca068f0ce0abe1d43de53952dab5e31678be";

//Defined Variables
let cityContainer=document.getElementById("city-container")
let searchBar=document.getElementById("city-search");



            

//End Point URL of AQUICN
let endPoint="https://api.waqi.info/map/bounds/?token="+AQICN_TOKEN+ "&latlng=6.0,68.0,38.0,98.0";

//AQUICN config
let aqicnConfig={
    method:"GET"
}


searchBar.addEventListener("keydown",function(event){
    if (event.key==="Enter"){
        let searchWord=event.target.value;
        console.log(searchWord);

        // Clear previous results so that every new search displays fresh results
        cityContainer.innerHTML = "";
    

        //Fetching Details of Cities
        fetch(endPoint,aqicnConfig)

        .then(function(responce){
            return responce.json();
        })

        .then(function(responce){
            
            console.log(responce.data);

            

            const cityList = responce.data.map(cityDetails => cityDetails.station.name);
            


            for (let cityName of cityList) {
                    if (cityName.toLowerCase().includes(searchWord.toLowerCase())) {
                        
                        let cityCard = document.createElement("div");
                        cityCard.classList.add("card", "mb-3");
                        cityCard.style.width = "18rem";

                        let cardBody = document.createElement("div");
                        cardBody.classList.add("card-body");

                        for (city of responce.data){
                            let cityNameList=city.station.name;
                        }

                        let cityNameEl = document.createElement("p");
                        cityNameEl.classList.add("card-text");
                        cityNameEl.textContent = cityName;

                        cardBody.appendChild(cityNameEl);
                        cityCard.appendChild(cardBody);
                        cityContainer.appendChild(cityCard);



                        





                    }
                }
            }
            


                    
            )
        }

        }
    );