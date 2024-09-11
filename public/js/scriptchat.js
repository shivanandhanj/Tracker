const socket = io();

const messagesDiv = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

// Listen for chat messages from the server
socket.on('chat message', (msg) => {
    const messageElement = document.createElement('div');
    messageElement.textContent = msg;
    messageElement.classList.add('message', 'received');
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // Scroll to the bottom
});

// Send chat message when the button is clicked
sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    if (message.trim() !== "") {
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        messageElement.classList.add('message', 'sent');
        messagesDiv.appendChild(messageElement);
        messagesDiv.scrollTop = messagesDiv.scrollHeight; // Scroll to the bottom
        
        socket.emit('chat message', message); // Send the message to the server
        messageInput.value = ''; // Clear the input after sending
    }
});







