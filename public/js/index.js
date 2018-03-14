//initiates the socket io request
var socket = io();

socket.on('connect', function(){
  console.log('connected to server');
});

socket.on('disconnect', function(){
  console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
    //console.log(JSON.stringify(message, undefined, 3));
    var li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    $('#messages').append(li);
});

$('#message-form').on('submit', function(e) {
  //alert('here');
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'Matt',
    text: $('[name=message]').val()
  }, function(message){
  console.log(message);
});
});
