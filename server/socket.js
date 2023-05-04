// socket.js

const { Server } = require('socket.io');

let io;

function configureSocket(server) {
  io = new Server(server);

  io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle custom events here
    // For example: socket.on('eventName', (data) => {});

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });

  return io;
}

function getIO() {
  return io;
}

module.exports = { configureSocket, getIO };
