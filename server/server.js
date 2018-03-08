const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const app = express();
var server = http.createServer(app);
var io = socketIO(server);

const publicPath = path.join(__dirname, '..', 'public');
port = process.env.PORT || 3000;
app.use(express.static(publicPath));

io.on('connection', (socket) =>{
  console.log('New User Connected');

  socket.emit('newMessage', {
    from: 'Stan Lee',
    text: 'Do you draw in the comic books good coloring?'
  });

  socket.on('createMessage', (message) => {
    console.log(JSON.stringify(message, undefined, 3));
    console.log('help!!');
  });
}); //registers an event listener





console.log(__dirname + '\\..\\public');
console.log(publicPath);

server.listen(port, () => console.log('Example app listening on port 3000!'));
