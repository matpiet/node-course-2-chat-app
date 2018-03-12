const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

var {generateMessage} = require('./utils/message');
const app = express();
var server = http.createServer(app);
var io = socketIO(server);

const publicPath = path.join(__dirname, '..', 'public');
port = process.env.PORT || 3000;
app.use(express.static(publicPath));

io.on('connection', (socket) =>{
  console.log('New User Connected');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat App.'));
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'A new user joined the chat.'));

  socket.on('createMessage', (message, callback) => {
    console.log(JSON.stringify(message, undefined, 3));

    io.emit('newMessage', generateMessage(message.from, message.text));
    callback("This is from the server");
    });
  //});
}); //registers an event listener





console.log(__dirname + '\\..\\public');
console.log(publicPath);

server.listen(port, () => console.log('Example app listening on port 3000!'));
