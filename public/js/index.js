//initiates the socket io request
var socket = io();

socket.on('connect', function(){
  console.log('connected to server');

  socket.emit('createMessage', {
    to: 'Jim Acosta',
    text: 'Whats going on with all the Russia stuff?'
  });
});

socket.on('disconnect', function(){
  console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
    console.log(JSON.stringify(message, undefined, 3));
});
