var path = require('path');
var http = require('http');
var publicpath = path.join(__dirname, '../public');
var socketIO = require('socket.io');
var port = process.env.PORT || 3000;
var express = require('express');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var { generateMessage, generateLocationMessage } = require('./utils/message');
app.use(express.static(publicpath));
io.on('connection', function (socket) {
    console.log('New user connected');
    socket.emit('newMessage', generateMessage('Admin', 'Welcome Aboard'));
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user aboard'));
    
    socket.on('createMessage', function (newMessage,callback) {

        console.log('createmessage', generateMessage(newMessage.from, newMessage.text));
        io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));

                     /*   socket.broadcast.emit('newMessage', {
                            from:newMessage.from,
                            text: newMessage.text,
                            createdAt: new Date().getTime()
                        })  */
        callback();
    })
    socket.on('createLocationMessage', function (coords) {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude,coords.longitude));
    })
    socket.on('disconnect', function () {
        console.log('Disconnected from client');
    })  
})
server.listen(port, function () {
    console.log('Server is up on port ' + port);
})