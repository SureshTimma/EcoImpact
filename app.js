// Get HTML elements from our webpage
let chatFormElement = document.getElementById('chat-form');    // Form that contains the input and button
let chatWindowElement = document.getElementById('chat');       // Div where messages will display
let userInputElement = document.getElementById('user-input');  // Text input where user types

// This runs when user clicks Send
function handleSubmit(event) {
  // Stop form from refreshing page
  event.preventDefault();
  
  // Get text from input box
  let userMessageText = userInputElement.value;
  
  // Don't send empty messages
  if (userMessageText === '') {
    return;
  }
  
  // Show user message in chat
  addMessageToChat('user', userMessageText);
  
  // Empty the input field
  userInputElement.value = '';
  
  // Show loading message
  let loadingMessageElement = addMessageToChat('bot', 'Thinking...');
  
  // API info for Gemini
  let geminiApiKey = 'AIzaSyB9Fj3F7v61yoDhnRapKmbKCD7rJzNHkY8';
  let geminiApiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + geminiApiKey;
  
  // Create HTTP request
  let httpRequest = new XMLHttpRequest();
  
  // What to do when we get a response
  httpRequest.onreadystatechange = function() {
    // Check if request is finished
    if (httpRequest.readyState === 4) {
      // Remove loading message
      if (loadingMessageElement && loadingMessageElement.parentNode) {
        loadingMessageElement.parentNode.removeChild(loadingMessageElement);
      }
      
      // If request was successful
      if (httpRequest.status === 200) {
        // Convert response text to object
        let responseObject = JSON.parse(httpRequest.responseText);
        
        // Default error message
        let botResponseText = "Sorry, I couldn't understand that.";
        
        // Get bot response from API result if available
        if (responseObject.candidates && 
            responseObject.candidates[0] && 
            responseObject.candidates[0].content && 
            responseObject.candidates[0].content.parts && 
            responseObject.candidates[0].content.parts[0].text) {
          
          botResponseText = responseObject.candidates[0].content.parts[0].text;
        }
        
        // Show bot's response
        addMessageToChat('bot', botResponseText);
      } else {
        // Show error message
        addMessageToChat('bot', 'Sorry, I had a problem connecting to the AI service.');
      }
    }
  };
  
  // Set up the request
  httpRequest.open('POST', geminiApiUrl, true);
  httpRequest.setRequestHeader('Content-Type', 'application/json');
  
  // Create data to send
  let requestDataObject = {
    contents: [{
      parts: [{ text: userMessageText }]
    }],
    generationConfig: {
      maxOutputTokens: 100
    }
  };
  
  // Convert data to JSON string
  let requestDataString = JSON.stringify(requestDataObject);
  
  // Send the request
  httpRequest.send(requestDataString);
}

// Connect form submit event to our function
chatFormElement.addEventListener('submit', handleSubmit);

// Adds a new message to the chat
function addMessageToChat(senderType, messageText) {
  // Create new div for message
  let messageElement = document.createElement('div');
  
  // Style based on who sent it
  if (senderType === 'user') {
    messageElement.className = 'user-message';
    messageElement.innerHTML = '<strong>You:</strong> ' + messageText;
  } else {
    messageElement.className = 'bot-message';
    messageElement.innerHTML = '<strong>Bot:</strong> ' + messageText;
  }
  
  // Add to chat window
  chatWindowElement.appendChild(messageElement);
  
  // Scroll to see new message
  chatWindowElement.scrollTop = chatWindowElement.scrollHeight;
  
  // Return so we can remove it later if needed
  return messageElement;
}