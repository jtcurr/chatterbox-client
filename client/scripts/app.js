var app = {};
$('document').ready(function() {
  app.server = 'https://api.parse.com/1/classes/messages';
  app.fetch = function() {
    $.ajax({
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
        $('.chats').empty();
        var message = data.results;
        console.log('chatterbox: Message received');
        var roomArr = [];
        for (var i = 0; i < 40; i++) {
          if (roomArr.indexOf(message[i].roomname) === -1) {
            roomArr.push(message[i].roomname);
          }
          app.renderMessage(message[i]);
        }
        app.makeMenu(roomArr);
      },
      error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }  
    });
  };
  app.makeMenu = function(arr) {
    $('myDropdown').empty();
  console.log(arr);
    for (var i = 0; i < arr.length; i++) {
      var item = '<a class ="room" id = "i">' + arr[i] + '</a>'; 
      $('#myDropdown').append(item);
    }
  };
  app.init = function() {};

  app.clearMessages = function() {
    $('.chats').empty();
  };

  app.renderRoom = function() {
    app.fetch();
  };
  app.renderRoom();
  
  app.renderMessage = function (collection) {
    var $userName = ('<div class="username">' + collection.username + '</div>');
    var $message = ('<div class="chat">' + collection.text + '</div>');
    $('.chats').append($userName).append($message);
  };
  $('.button').on('click', function(e) {
    e.preventDefault();
    app.send(document.getElementById("sub").value);
    document.getElementById("sub").value = "";
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
        console.log('chatterbox: Message POSTED');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  };

});






