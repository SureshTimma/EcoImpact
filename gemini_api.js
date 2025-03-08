let options={
    method:"POST",
    headers:{
        'Content-Type': "application/json",
        Accept: "application/json"
    },

    body: JSON.stringify({
        "contents": [{
          "parts":[{"text": "Explain how AI works"}]
          }]
         })
};

let GEMINI_API_KEY="AIzaSyB9Fj3F7v61yoDhnRapKmbKCD7rJzNHkY8"

let url="https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key="+GEMINI_API_KEY;

fetch(url,options)
    .then(function(response){
        console.log(response.json());
    });