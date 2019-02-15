const express = require('express');
const socket = require('socket.io');

const app = express();

// Allowing CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static('public'));

// Server setup
const hostname = "localhost";
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log(`Server started on ${hostname}:${port}`);
});

// Socket.IO setup
const io = socket(server);
io.on('connection', (socket) => {
    console.log(`New socket connection made: ${socket.id}`);

    socket.on('chat', (data) => {
        io.sockets.emit('chat', data);
    });

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);
    })
});