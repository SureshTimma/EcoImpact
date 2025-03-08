let geminiSearchInput=document.getElementById("gemini-search");
let geminiSearchButton=document.getElementById("gemini-search-button");

geminiSearchButton.addEventListener("click",function(){
    
        let geminiSearchPrompt=geminiSearchInput.value;
        console.log(geminiSearchPrompt);
    


        let options={
            method:"POST",
            headers:{
                'Content-Type': "application/json",
                Accept: "application/json"
            },

            body: JSON.stringify({
                "contents": [{
                "parts":[{"text": geminiSearchPrompt}]
                }]
                })
        };

        let GEMINI_API_KEY="AIzaSyB9Fj3F7v61yoDhnRapKmbKCD7rJzNHkY8"

        let url="https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key="+GEMINI_API_KEY;

        fetch(url,options)
            .then(function(response){
                return response.json()
                
                
            })
            
            .then(function(response){
                response=response.candidates[0];
                response=response.content.parts[0]
                response=response.text;
                console.log(response);
                response=marked.parse(response);

                

                document.getElementById("gemini-reslut-text").innerHTML =response;
            });

        
})