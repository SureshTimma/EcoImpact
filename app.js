let chatFormElement = document.getElementById('chat-form');
let chatWindowElement = document.getElementById('chat');
let userInputElement = document.getElementById('user-input');

function handleSubmit(event) {
  event.preventDefault();
  let userMessageText = userInputElement.value;
  if (userMessageText === '') {
    return;
  }
  addMessageToChat('user', userMessageText);
  userInputElement.value = '';
  let loadingMessageElement = addMessageToChat('bot', 'Thinking...');
  let geminiApiKey = 'AIzaSyB9Fj3F7v61yoDhnRapKmbKCD7rJzNHkY8';
  let geminiApiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + geminiApiKey;
  let httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState === 4) {
      if (loadingMessageElement && loadingMessageElement.parentNode) {
        loadingMessageElement.parentNode.removeChild(loadingMessageElement);
      }
      if (httpRequest.status === 200) {
        let responseObject = JSON.parse(httpRequest.responseText);
        let botResponseText = "Sorry, I couldn't understand that.";
        if (responseObject.candidates && 
            responseObject.candidates[0] && 
            responseObject.candidates[0].content && 
            responseObject.candidates[0].content.parts && 
            responseObject.candidates[0].content.parts[0].text) {
          botResponseText = responseObject.candidates[0].content.parts[0].text;
        }
        addMessageToChat('bot', botResponseText);
      } else {
        addMessageToChat('bot', 'Sorry, I had a problem connecting to the AI service.');
      }
    }
  };
  httpRequest.open('POST', geminiApiUrl, true);
  httpRequest.setRequestHeader('Content-Type', 'application/json');
  let requestDataObject = {
    contents: [{
      parts: [{ text: userMessageText }]
    }],
    generationConfig: {
      maxOutputTokens: 100
    }
  };
  let requestDataString = JSON.stringify(requestDataObject);
  httpRequest.send(requestDataString);
}

chatFormElement.addEventListener('submit', handleSubmit);

function addMessageToChat(senderType, messageText) {
  let messageElement = document.createElement('div');
  if (senderType === 'user') {
    messageElement.className = 'user-message';
    messageElement.innerHTML = '<strong>You:</strong> ' + messageText;
  } else {
    messageElement.className = 'bot-message';
    messageElement.innerHTML = '<strong>Bot:</strong> ' + messageText;
  }
  chatWindowElement.appendChild(messageElement);
  chatWindowElement.scrollTop = chatWindowElement.scrollHeight;
  return messageElement;
}
