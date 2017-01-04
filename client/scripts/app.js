var app = {};
var friends = [];
$('document').ready(function() {
  var roomArr = ["Create new room"];
  app.server = 'https://api.parse.com/1/classes/messages';
  app.fetch = function() {
    var room = arguments[0] || "null";
    $.ajax({
      url: app.server,
      type: 'GET',
      dataType: 'json',
      data: {
        order: '-createdAt'
      },
      contentType: 'application/json',
      success: function (data) {
        app.clearMessages();
        var message = data.results;
        console.log('chatterbox: Message received');
        for (var i = 0; i < 40; i++) {
          if (roomArr.indexOf(message[i].roomname) == -1) {
            roomArr.push(message[i].roomname);
          }
          if (message[i].roomname === room) {
            app.renderMessage(message[i]);
          }
        }
        $('.roomName').empty();
        $('.roomName').append(room);
         app.makeMenu(roomArr);
         app.clickHandlers(roomArr);
      },
      error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }  
    });
  };

  console.log(roomArr);
  app.makeMenu = function(arr) {
    $('#dropdown').empty();
    for (var i = 0; i < arr.length; i++) {
      var item = '<option value =' + i + '>' + arr[i] + '</option>'; 
      $('#dropdown').append(item);
    }
  };

  app.clickHandlers = function(rooms) {
    $(".button2").on('click', function(e) {
      var roomSel = $("#dropdown :selected").text();
      if (roomSel === "Create new room") {
        var newRoom = prompt("Enter room name");
        if (rooms.indexOf(newRoom) === -1) {
          rooms.push(newRoom);
          $('#dropdown').append(newRoom);
          app.clearMessages();
          app.renderRoom(newRoom);
        }
      }
      else {
      app.clearMessages();
      app.renderRoom(roomSel);
      }
    });
  };

  app.init = function() {
    app.renderRoom();
  };


  app.clearMessages = function() {
    $('.chats').empty();
  };

  app.renderRoom = function(room) {
    app.fetch(room);
  };
  app.init("lobby");

  
  app.renderMessage = function (collection) {
    var $userName = ('<div class="username" id=' + collection.username + '>' + collection.username + '</div>');
    var $message = ('<div class="chat">' + collection.text + '</div>');
    $('.chats').append($userName).append($message);
    $('#' + collection.username).on('click', function() {
    if (friends.indexOf(collection.username) === -1) {
      friends.push(collection.username);
      $('#' + collection.username).addClass('friend');
      console.log(friends);
    }
    
    });
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






