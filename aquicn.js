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

//Fetching Details of Cities
fetch(endPoint,aqicnConfig)

.then(function(responce){
    return responce.json();
})

.then(function(responce){

    const cityList = responce.data.map(cityDetails => cityDetails.station.name);
    console.log(cityList);


    for (let cityName of cityList){
        
    }

    // for(let cityDetails of responce.data){
    //     // console.log(cityDetails);
    //     let cityNameEl=document.createElement("p");
    //     cityNameEl.textContent=cityDetails.station.name;
    //     cityContainer.appendChild(cityNameEl);
    //     // console.log(cityDetails.station.name);

        
    // }

    // searchBar.addEventListener("keydown",function(event){
    //         console.log(event.target.value);


            
    //         if (event.target.value===""){
    //             let cityNameEl=document.createElement("p");
    //             cityNameEl.textContent=cityDetails.station.name;
    //             cityContainer.appendChild(cityNameEl);
    //         }


    //     })
})





;