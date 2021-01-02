const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const router = require('./config/express');
const mongoose = require('./config/mongoose');

const hostname = '103.15.50.89';

const port = 4000;
const app = express();

mongoose.connect();
let online = 0
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
});
const io = socketio(server, {
  cors: {
    origin: '*',
  }
});
app.use(router)


server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
    
});

io.on('connection', (socket) => {
  console.log('co nguoi ket nói ' , socket.id)
  online++;
  io.emit("numberOnlineServe", online);
  socket.on('disconnect', function () {
    online--;
    console.log('co ngat nguoi ket nói ' , socket.id)
    io.emit("numberOnlineServe", online);
  });
})