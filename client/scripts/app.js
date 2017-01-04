var app = {};
var friends = [];
$('document').ready(function() {
  var roomArr = ['Create new room'];
  app.server = 'https://api.parse.com/1/classes/messages';

  app.fetch = function() {
    var room = arguments[0] || 'lobby';
    $.ajax({
      url: app.server,
      type: 'GET',
      dataType: 'json',
      data: {
        order: '-createdAt'
      },
      contentType: 'application/json',
      success: function (data) {
        $('.chats').empty();
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
         //app.clickHandlers(roomArr);
      },
      error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }  
    });
  };
  app.makeMenu = function(arr) {
    $('#dropdown').empty();
    for (var i = 0; i < arr.length; i++) {
      var item = '<option value =' + i + '>' + arr[i] + '</option>'; 
      $('#dropdown').append(item);
    }
  };

  $('.button2').on('click', function(e) {
    var roomSel = $('#dropdown :selected').text();
    if (roomSel === 'Create new room') {
      var newRoom = prompt('Enter room name');
      if (roomArr.indexOf(newRoom) === -1) {
        roomArr.push(newRoom);
        $('#dropdown').append(newRoom);
        app.renderRoom(newRoom);
      }
    }
    else {
      app.renderRoom(roomSel);
    }
  });
  app.handleSubmit = function() {
  };

  app.handleUsernameClick = function() {
  };

  app.init = function() {
    app.renderRoom();
    app.handleSubmit();
    app.handleUsernameClick();
  };


  app.clearMessages = function(div) {
    $('#chats').empty();
  };

  app.renderRoom = function(room) {
    app.fetch(room);
  };

  app.init("lobby");






  
  app.renderMessage = function (collection) {
    var badChars = ['&', '<', '>', '"', "'", '`', '@', '$', '%', '(', ')', '=', '+', '{', '}', '[', ']'];
    for(var i = 0; i < badChars.length; i++){

      if(collection.text === undefined || collection.username === undefined) {
        return;
      }
      if(collection.text.indexOf(badChars[i]) !== -1 || collection.username.indexOf(badChars[i]) !== -1){
        return;
      }
    }
    var $userName = ('<div class="username" id=' + collection.username + '>' + collection.username + '</div>');
    var $message = ('<div class="chat">' + collection.text + '</div>');
    $('#roomSelect').append('<div></div>');
    $('.chats').append($userName).append($message);
    $('#chats').append('<div></div>');
    $('#' + collection.username).on('click', function() {
    if (friends.indexOf(collection.username) === -1) {
      friends.push(collection.username);
    }
      $('#' + collection.username).addClass('friend');
    });
  };

  $('.button').on('click', function(e) {
    e.preventDefault();
    var msg = document.getElementById("sub").value;
    var room = $("#dropdown :selected").text();
    var user = window.location.search.slice(10);
    var obj = {
      username: user,
      text: msg,
      roomname: room}
    app.send(obj);
    document.getElementById("sub").value = "";
  });

  app.send = function(message) {
    $.ajax({
      url: 'https://api.parse.com/1/classes/messages',
      type: 'POST',
      data: JSON.stringify(message),
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






