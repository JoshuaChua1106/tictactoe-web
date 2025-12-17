import io from 'socket.io-client';

// In Docker production, connect through nginx proxy at same origin
// In development, connect directly to backend
const socketUrl = import.meta.env.MODE === 'production' ? '/' : (import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000');

export const socket = io(socketUrl);

socket.on('connect', () => {
    console.log('Connected to server:', socket.id);
  });

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});