const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const app = express();
var server = http.createServer(app);
var io = socketIO(server);

const {generateMessage, generateLocationMessage} = require('./utils/message')

const publicPath = path.join(__dirname, '..', 'public');
port = process.env.PORT || 3000;
app.use(express.static(publicPath));

io.on('connection', (socket) =>{
  console.log('New User Connected');

  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the chat App'
  });
  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'New user joined the chat'
  });

  socket.on('createMessage', (message, callback) => {
    console.log(JSON.stringify(message, undefined, 3));
    console.log(JSON.stringify(generateMessage(message.from, message.text), undefined, 2));
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback();
  });

  socket.on('createLocationMessage', (coords, callback)=>{
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    callback();
  });
}); //registers an event listener





console.log(__dirname + '\\..\\public');
console.log(publicPath);

server.listen(port, () => console.log('Example app listening on port 3000!'));
