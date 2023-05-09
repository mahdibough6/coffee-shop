import { io } from 'socket.io-client';

const socketUrl = import.meta.env.VITE_API_URL; // Replace with your server URL

const socket = io(socketUrl, {
  reconnection: true,
  //reconnectionDelay: 5000,
  reconnectionAttempts: Infinity,
});
socket.on('connect', () => {
  console.log('Socket connected');
});

socket.on('disconnect', () => {
  console.log('Socket disconnected');
});

export default socket;
