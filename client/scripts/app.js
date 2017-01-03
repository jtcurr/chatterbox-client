var app = {};
$('document').ready(function() {
    app.server = 'https://api.parse.com/1/classes/messages';
 // setInterval (function() {
    app = $.ajax({
  // This is the url you should use to communicate with the parse API server.
      url: app.server,
      type: 'GET',
     // data: '/calendar/getData.php',
      dataType: 'json',
      data: {
        order: '-createdAt'
      },
      contentType: 'application/json',
      success: function (data) {
        var message = data.results;
        console.log('chatterbox: Message received');
        $('.chats').empty();
        for (var i = message.length - 1; i >= 0; i--) {
          renMessage(message[i]);
        }
      },
      error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });

    app.init = function() {
      app.fetch();
    };


    var renMessage = function (collection) {
      var $userName = ('<div class="username">' + collection.username + '</div>');
      var $message = ('<div class="chat">' + collection.text + '</div>');
      $('.chats').append($userName).append($message);
    };
    $('.button').on('click', function(e) {
      e.preventDefault();
      app.send(document.getElementById("sub").value);
    });

    app.send = function(msg) {
    $.ajax({
    // This is the url you should use to communicate with the parse API server.
      url: 'https://api.parse.com/1/classes/messages',
      type: 'POST',
      data: JSON.stringify({
        username: window.location.search.slice(10),
        text: msg,
        roomname: null
      }),
      contentType: 'application/json',
      success: function (data) {
        console.log(data);
        console.log('chatterbox: Message POSTED');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
};
  });
app.init();






