var app = require('express')();
var http = require('http').Server(app);
var socketio = require('socket.io');

var io = socketio(http);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
      socket.on('clientSaid', function (message) { // event listener
          if (message.target === 'luke') {
              io.emit('serverSaid', message.msg); //
          } else {
              console.log('message: ' + message.msg);
          }

      });
      socket.on('chatted', function (ourSomeMessage) {
          console.log("we received:" + ourSomeMessage);
      });
});

http.listen(3000, function () { // event listener too
    console.log('listening on port 3000');
});
