let geminiSearchInput=document.getElementById("gemini-search");
let geminiSearchButton=document.getElementById("gemini-search-button");

const websiteContext = `
EcoImpact is dedicated to tracking and reducing environmental impact by monitoring air quality, pollution levels, and providing eco-friendly tips. 
We calculate your carbon footprint, offer sustainability advice, and help you make informed decisions about environmental health.
`;

const systemPrompt = `
You are an expert assistant for EcoImpact. When a user asks a question, provide a detailed answer using your environmental knowledge and EcoImpact's content.
If the user's query is directly related to environmental topics, pollution, or sustainability, answer it normally.
If the question is irrelevant or off-topic (i.e. not related to environmental issues or EcoImpact's mission), then respond with:
"EcoImpact is dedicated to tracking and reducing environmental impact through monitoring air quality, pollution levels, and offering sustainable living tips. Please ask an environmental-related question for more information."
`;

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
                "parts":[{"text": websiteContext + "\n" + systemPrompt + "\nUser Query: " + geminiSearchPrompt}]
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
                response=marked.parse(response);

                

                document.getElementById("gemini-reslut-text").innerHTML =response;
            });

        
})