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

var locationButton = $('#send-location');
locationButton.on('click', function(e){
  if(!navigator.geolocation){
    return alert("Browser doesn't support geolocation.");
  };

  navigator.geolocation.getCurrentPosition(function(position){
    console.log(position);
  }, function(){
    alert("Unable to fetch geolocation.");
  });

});
