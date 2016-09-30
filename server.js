var port = 8000;
var http = require('http');
var server = http.createServer((req, res) => {
  res.end();
});
server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});
server.listen(port);
socketServer = new (require('websocket').server)({
  httpServer: server,
  autoAcceptConnections: true // XXX: fix this.
});
var state = {}; // TODO: store in database
var connections = [];
socketServer.on('connect', function(connection) {
  connections.push(connection);
  console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' connected.');
  for (var key in state) {
    // TODO: only send what a user is allowed to access.
    if (state.hasOwnProperty(key)) {
      connection.sendUTF(JSON.stringify([key, state[key]]));
    }
  }
  connection.on('message', function(message) {
    var json = JSON.parse(message.utf8Data);
    console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' sent ' + message.utf8Data);
    // Save the new value. // TODO: check if user is allowed to change.
    state[json[0]] = json[1];
    
    for (var i = 0; i < connections.length; i++) {
      var otherCon = connections[i];
      if (otherCon == connection) continue;
      otherCon.sendUTF(message.utf8Data);
      // otherCon.sendUTF(JSON.stringify(['message','derp']))
    }
  });
  connection.on('close', function(reasonCode, description) {
    if (connections.indexOf(connection) != -1) connections.splice(connections.indexOf(connection), 1);
    console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
  });
});
console.log('Qurate Server running on port ' + port);
