//initiates the socket io request
var socket = io();

scrollToBottom = function(){
  let messages =  $("#messages");
  let scrollTop = messages.scrollTop();
  let clientHeight = messages.prop('clientHeight');
  let scrollHeight = messages.prop('scrollHeight');
  let newMessage = messages.children('li:last-child');
  let newMessageHeight = newMessage.innerHeight();
  let lastMessageHeight = newMessage.prev().innerHeight();
  let clientLocation = newMessageHeight + lastMessageHeight + scrollTop + clientHeight;

  if(clientLocation >= scrollHeight){
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function(){
  console.log('connected to server');
});

socket.on('disconnect', function(){
  console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = $('#message-template').html();
    var html = Mustache.render(template, {
      from : message.from,
      text: message.text,
      createdAt: formattedTime
    });

    $('#messages').append(html);
    scrollToBottom();
    //console.log(JSON.stringify(message, undefined, 3));
    // var li = $('<li></li>');
    // li.text(`${message.from}: ${message.text} ${moment(message.createdAt).format('h:mm a')}`);
    //
    // $('#messages').append(li);
});

socket.on('newLocationMessage', function(message){
  var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = $('#location-message-template').html();
    var html = Mustache.render(template, {
      from : message.from,
      url: message.url,
      createdAt: formattedTime
    });
  $('#messages').append(html);
});

$('#message-form').on('submit', function(e) {
  //alert('here');
  e.preventDefault();
  var messageTextbox = $('[name=message]');
  socket.emit('createMessage', {
      from: 'Matts',
      text: messageTextbox.val()
    }, function(){
    //console.log('fuck!!!');
    messageTextbox.val('');
    messageTextbox.focus();
  }
  );
});

var locationButton = $('#send-location');
locationButton.on('click', function(e){
  if(!navigator.geolocation){
    return alert("Browser doesn't support geolocation.");
  };

  locationButton.attr('disabled', 'disabled').text('Sending location');

  navigator.geolocation.getCurrentPosition(function(position){
    //console.log(position);
    locationButton.removeAttr('disabled').text('Send location');
    var messageTextbox = $('[name=message]');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    }, function(){
      messageTextbox.focus();
    });
  }, function(){
    locationButton.removeAttr('disabled').text('Send location');
    //alert("Unable to fetch geolocation.");
    alert("Unable to fetch geolocation.");
  });

});
