const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const signupRoute = require('./routes/singup'); // Corrected the import path
const profileRoute = require('./routes/profile');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Use the signup route
app.use('/api/signup', signupRoute);
app.use('/api/profile', profileRoute); 

// Ruta para la raíz
app.get('/', (req, res) => {
  res.send('Servidor corriendo correctamente');
});

// Socket.io setup
io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/realtime-chat', {
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));