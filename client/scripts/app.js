$('document').ready(function() {
  var request = $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/messages',
    type: 'GET',
  //data: JSON.stringify(message),
    dataType: 'json',
    contentType: 'application/json',
    success: function (data) {
      var message = data.results;
      console.log('chatterbox: Message received');
      for (var i = 0; i < message.length; i++) {
        renMessage(message[i]);
      }
    },
    error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });

  var renMessage = function (collection) {
    var $userName = ('<div class="username">' + collection.username + '</div>');
    var $message = ('<div class="chat">' + collection.text + '</div>');
    $('.chats').append($userName).append($message);
  };
});
