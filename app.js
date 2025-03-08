let travelDistance=document.getElementById("travel-distance");
let vehicalType=document.getElementsByName("vehical-type");
let vehicalMilage=document.getElementById("vehical-milage");
let electricityConsumption=document.getElementById("electricity-consumption");
let gasConsumption=document.getElementById("gas-consumption");
let foodConsumption=document.getElementsByName("food-consumption");
let submitButton=document.getElementById("submit-button");

let pollutionResultsContainer=document.getElementById("pollution-result");

let vehicalCarbonEmission=0;

let emissionPerKmElectricity=0.4;
let emissionPerLtrPetrol=2.31;
let emissionPerLtrDiesel=2.68;

let carbonImpactEl=document.getElementById("carbon-impact-value");
let co2LevelEl=document.getElementById("co2-level");
const baselineEmission = 50;



submitButton.addEventListener("click",function(event){
    
    event.preventDefault();
    
    
    for (let i=0;i<foodConsumption.length;i++){
        if (foodConsumption[i].checked){
            console.log("Food Consumption:",foodConsumption[i].value);
            break;
        }
    }



    for (let i=0;i<vehicalType.length;i++){
        if (vehicalType[i].checked){
            if (vehicalType[i].value==="Electric Vehicle"){
                vehicalCarbonEmission=(parseInt(travelDistance.value)/parseInt(vehicalMilage.value))*emissionPerKmElectricity;
            }
            else if (vehicalType[i].value==="Petrol Vehicle"){
                vehicalCarbonEmission=(parseInt(travelDistance.value)/parseInt(vehicalMilage.value))*emissionPerLtrPetrol;
            }
            else if (vehicalType[i].value==="Diesel Vehicle"){
                vehicalCarbonEmission=(parseInt(travelDistance.value)/parseInt(vehicalMilage.value))*emissionPerLtrDiesel;
            }
        }
    }

    carbonImpactEl.textContent="You have generated " + (vehicalCarbonEmission/baselineEmission)*100 + "% of carbon dioxide today.";

    if ((vehicalCarbonEmission/baselineEmission)*100<=100){
        co2LevelEl.textContent="You are saving Enviornment.";
    }
    else{
        co2LevelEl.textContent="Please Reduce your Carbon Footprint.";
    }    

        pollutionResultsContainer.classList.remove("d-none");
        pollutionResult.scrollIntoView({ behavior: "smooth" });



    


});


    
    
