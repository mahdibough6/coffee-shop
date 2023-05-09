const { Server } = require('socket.io');

function initSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: '*', // Adjust this to match your frontend domain
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Example: Set up a custom event handler
    socket.on('setEmployeeRole', (employeeRole) => {
      console.log(`User ${socket.id} has role ${employeeRole}.`);

      // Add the socket to the appropriate room based on the role
      if (employeeRole === 'staff') {
        socket.join('staffRoom');
      } else if (employeeRole === 'manager') {
        socket.join('managerRoom');
      }
    });

    // When the staff emits the 'newOrder' event, emit it to the manager room
    socket.on('newOrder', () => {
      console.log(`Staff ${socket.id} created a new order.`);
      io.to('managerRoom').emit('newOrder');
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
}

module.exports = initSocket;

