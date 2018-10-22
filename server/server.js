var path = require('path');
var http = require('http');
var express = require('express');
var socketIO = require("socket.io");

const {generateMessage} = require('./utils/message');

var port = process.env.PORT || 3000;

publicDir = path.join(__dirname,'../public');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicDir))

io.on('connection', (socket) => {
    console.log('New user connected');
  
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
  
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));
  
    socket.on('createMessage', (message, callback) => {
      console.log('createMessage', message);
      io.emit('newMessage', generateMessage(message.from, message.text));
      callback('This is from the server.');
      // socket.broadcast.emit('newMessage', {
      //   from: message.from,
      //   text: message.text,
      //   createdAt: new Date().getTime()
      // });
    });
  
    socket.on('disconnect', () => {
      console.log('User was disconnected');
    });
  });

server.listen(port, () => {
    console.log("Server is listening on port " + port.toString());
});
module.exports = app;
