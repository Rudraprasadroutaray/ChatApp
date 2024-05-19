const socket = io('http://localhost:8000');
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');

const appendMessage = (message, position,duration=5000) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);




    if (position === 'center' || position === 'top-center') {
        messageElement.style.textAlign = 'center';
        messageElement.style.margin = '0 auto';
        messageElement.style.width='180px'
    }

    if (position === 'center' || position === 'top-center') {
        setTimeout(() => {
            messageElement.remove();
        }, duration);
    }

}



const name = prompt("Enter your name to join");

socket.emit('user-joined', name);

socket.on('user-joined', name => {
    
    appendMessage(`${name} joined the chat`, 'center',5000);
});

socket.on('receive', data => {
    if (data.name !== name) { // Only append message to UI if it's not sent by the current user
        appendMessage(`${data.name}: ${data.message}`, 'left');
    }
});


socket.on('left', name => {
    append(`${name} left the chat`,'left')
});



form.addEventListener('submit', event => {
    event.preventDefault(); // Prevent default form submission behavior
    const message = messageInput.value.trim(); // Get the message from the input field
    if (message !== '') { // Check if the message is not empty
        appendMessage(`You: ${message}`, 'right');
        socket.emit('send', { message: message }); // Emit the 'send' event to the server with the message
        messageInput.value = ''; // Clear the input field
    }
});
