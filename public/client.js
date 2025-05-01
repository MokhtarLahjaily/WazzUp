document.addEventListener('DOMContentLoaded', () => {
    const socket = io();
    
    // DOM elements
    const joinContainer = document.getElementById('joinContainer');
    const chatBox = document.getElementById('chatBox');
    const usernameInput = document.getElementById('username');
    const joinBtn = document.getElementById('joinBtn');
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');
    const messagesContainer = document.getElementById('messages');
    const typingIndicator = document.getElementById('typingIndicator');
    const usersList = document.getElementById('usersList');
    const userCount = document.getElementById('userCount');
    
    let username = '';
    let typingTimeout;
    
    // Join chat when button is clicked
    joinBtn.addEventListener('click', () => {
      if (usernameInput.value.trim() !== '') {
        username = usernameInput.value.trim();
        socket.emit('join', username);
        joinContainer.style.display = 'none';
        chatBox.style.display = 'flex';
        
        
        addMessage('System', `Welcome to the chat, ${username}!`, 'system');
      }
    });
    
    // Also join chat when Enter key is pressed in username input
    usernameInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        joinBtn.click();
      }
    });
    
    // Send message when button is clicked
    sendBtn.addEventListener('click', sendMessage);
    
    // Send message when Enter key is pressed in message input
    messageInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendMessage();
      }
      
      // Handle typing indicator
      socket.emit('typing');
      
      clearTimeout(typingTimeout);
      typingTimeout = setTimeout(() => {
        socket.emit('stopTyping');
      }, 1000);
    });
    
    // Function to send a message
    function sendMessage() {
      const message = messageInput.value.trim();
      if (message !== '') {
        socket.emit('sendMessage', message);
        addMessage(username, message, 'outgoing');
        messageInput.value = '';
        socket.emit('stopTyping');
      }
    }
    
    // Function to add a message to the chat
    function addMessage(user, text, messageType) {
      const messageElement = document.createElement('div');
      messageElement.classList.add('message', messageType);
      
      const userElement = document.createElement('div');
      userElement.classList.add('message-user');
      userElement.textContent = user;
      
      const textElement = document.createElement('div');
      textElement.classList.add('message-text');
      textElement.textContent = text;
      
      messageElement.appendChild(userElement);
      messageElement.appendChild(textElement);
      
      messagesContainer.appendChild(messageElement);
      
      // Scroll to the bottom of the messages container
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    // Function to update the users list
    function updateUsersList(users) {
      usersList.innerHTML = '';
      userCount.textContent = users.length;
      
      users.forEach(user => {
        const li = document.createElement('li');
        li.textContent = user;
        if (user === username) {
          li.textContent += ' (You)';
          li.style.fontWeight = 'bold';
        }
        usersList.appendChild(li);
      });
    }
    
    // Socket event listeners
    socket.on('message', (data) => {
      if (data.user !== username) {
        addMessage(data.user, data.text, data.user === 'System' ? 'system' : 'incoming');
      }
    });
    
    socket.on('userList', (users) => {
      updateUsersList(users);
    });
    
    socket.on('typing', (user) => {
      typingIndicator.textContent = `${user} is typing...`;
    });
    
    socket.on('stopTyping', () => {
      typingIndicator.textContent = '';
    });
  });
