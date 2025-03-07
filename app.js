let travelDistance=document.getElementById("travel-distance");
let submitButton=document.getElementById("submit-button");
let vehicalType=document.getElementById("vehical-type")



submitButton.addEventListener("click",function(event){
    
    event.preventDefault();
    console.log(travelDistance.value);
});