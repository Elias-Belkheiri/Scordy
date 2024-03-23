const chatContainer = document.getElementById('chat-container');
const messageInput = document.getElementById('message-input');
const chatForm = document.getElementById('chat-form');

let ws; // Declare a variable to store the WebSocket connection

function connectToServer() {
  ws = new WebSocket('ws://localhost:8080'); // Adjust URL for your server address

  ws.onopen = function() {
    console.log('Connected to server');
  };

  ws.onmessage = function(event) {
    const message = event.data;
    // Display the received message (replace with actual UI updates)
    const newMessage = document.createElement('p');
    newMessage.textContent = message;
    newMessage.classList.add('received-message'); // Add a class for styling
    chatContainer.appendChild(newMessage);
    chatContainer.scrollTop = chatContainer.scrollHeight;
  };

  ws.onclose = function() {
    console.log('Disconnected from server');
    // Handle disconnection (e.g., reconnect attempts)
  };
}

connectToServer(); // Call the connectToServer function on page load

chatForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const message = {
    sender: 'zeroone',
    content: messageInput.value.trim(),
    channel: 1,
    date: new Date()
  };

  if (message && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(message));
    console.log(message);
    messageInput.value = '';
  }
});
