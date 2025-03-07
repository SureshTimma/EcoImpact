let travelDistance=document.getElementById("travel-distance");
let vehicalType=document.getElementsByName("vehical-type");
let vehicalMilage=document.getElementById("vehical-milage");
let electricityConsumption=document.getElementById("electricity-consumption");
let gasConsumption=document.getElementById("gas-consumption");
let foodConsumption=document.getElementsByName("food-consumption");
let submitButton=document.getElementById("submit-button");



submitButton.addEventListener("click",function(event){
    
    event.preventDefault();
    console.log("Travel Distance:",travelDistance.value);
    console.log("Vehical Milage:",vehicalMilage.value);
    console.log("Electricity Consumption:",electricityConsumption.value);
    console.log("Gas Consumption:",gasConsumption.value);


    //radio buttons
    for (let i=0;i<vehicalType.length;i++){
        if (vehicalType[i].checked){
            console.log("Vehical Type:",vehicalType[i].value);
            break;
        }
    }

    for (let i=0;i<foodConsumption.length;i++){
        if (foodConsumption[i].checked){
            console.log("Food Consumption:",foodConsumption[i].value);
            break;
        }
    }

});