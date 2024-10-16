const express = require('express');
const cors = require('cors'); // Import CORS
const { Server } = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = process.env.PORT || 5000; // Use the default port

// Serve the Socket.IO client library
app.get('/socket.io/socket.io.js', (req, res) => {
    res.sendFile(require.resolve('socket.io/client-dist/socket.io.js'));
});

// Use CORS middleware
app.use(cors({
    origin: 'https://conshachat.vercel.app/', // Replace with your client URL
    methods: ['GET', 'POST'],
    credentials: true // Allow credentials if needed
}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    socket.on('send name', (username) => {
        io.emit('send name', username);
    });

    socket.on('send message', (chat) => {
        io.emit('send message', chat);
    });
});

// Added code block to apply changes from colleague's message
let socket = io();

socket.on('connect', () => {
    console.log('Connected to Socket.IO server');
});

server.listen(port, () => {
    console.log(`Server is listening at the port: ${port}`);
});
