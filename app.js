const chatForm = document.getElementById('chat-form');
    const chatWindow = document.getElementById('chat');
    const userInput = document.getElementById('user-input');

    chatForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const message = userInput.value;
      appendMessage('user', message);
      userInput.value = '';

      // Use the free Gemini model: gemini-1.5-flash.
      const apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyB9Fj3F7v61yoDhnRapKmbKCD7rJzNHkY8';

      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{ text: message }]
            }],
            generationConfig: {
              maxOutputTokens: 100  // Adjust this value as needed
            }
          })
        });

        const data = await response.json();
        const botReply = data.candidates &&
                         data.candidates[0] &&
                         data.candidates[0].content &&
                         data.candidates[0].content.parts &&
                         data.candidates[0].content.parts[0].text
                         ? data.candidates[0].content.parts[0].text
                         : "Sorry, no response received.";
        appendMessage('bot', botReply);
      } catch (error) {
        console.error('Error:', error);
        appendMessage('bot', 'Error: ' + error.message);
      }
    });

    function appendMessage(sender, text) {
      const messageDiv = document.createElement('div');
      messageDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
      messageDiv.innerHTML = `<strong>${sender === 'user' ? 'You' : 'Bot'}:</strong> ${text}`;
      chatWindow.appendChild(messageDiv);
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }