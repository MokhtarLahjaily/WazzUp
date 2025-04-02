const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Store connected users
const users = {};

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('New user connected');
  
  // Handle user joining
  socket.on('join', (username) => {
    users[socket.id] = username;
    socket.broadcast.emit('message', {
      user: 'System',
      text: `${username} has joined the chat`
    });
    
    // Send users list to all clients
    io.emit('userList', Object.values(users));
  });
  
  // Handle incoming messages
  socket.on('sendMessage', (message) => {
    io.emit('message', {
      user: users[socket.id],
      text: message
    });
  });
  
  // Handle user typing
  socket.on('typing', () => {
    socket.broadcast.emit('typing', users[socket.id]);
  });
  
  socket.on('stopTyping', () => {
    socket.broadcast.emit('stopTyping');
  });
  
  // Handle disconnection
  socket.on('disconnect', () => {
    if (users[socket.id]) {
      io.emit('message', {
        user: 'System',
        text: `${users[socket.id]} has left the chat`
      });
      delete users[socket.id];
      io.emit('userList', Object.values(users));
    }
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
