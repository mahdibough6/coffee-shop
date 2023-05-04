// some-other-file.js

const { getIO } = require('../socket');

function checkConnection(io) {
  // Use the socket.io instance as needed
  // For example: io.emit('eventName', data);
  io.emit('connection', ()=>{
    console.log('connected')
  })
}

module.exports = checkConnection;
