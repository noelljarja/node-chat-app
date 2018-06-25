var path = require('path');
var http = require('http');
var publicpath = path.join(__dirname, '../public');
var socketIO = require('socket.io');
var port = process.env.PORT || 3000;
var express = require('express');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicpath));
io.on('connection', function (socket) {
    console.log('New user connected');
    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to the chat app',
        createdAt: new Date().getTime()
    })
    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New user joined',
        createdAt: new Date().getTime()
    })

    socket.on('createMessage', function ( newMessage) {
        console.log('createmessage', newMessage)
        io.emit('newMessage', {
            from: newMessage.from,
            text: newMessage.text,
            createdAt: new Date().getTime()
        }) 
     /*   socket.broadcast.emit('newMessage', {
            from:newMessage.from,
            text: newMessage.text,
            createdAt: new Date().getTime()
        })  */
    })
    socket.on('disconnect', function () {
        console.log('Disconnected from client');
    })  
})
server.listen(port, function () {
    console.log('Server is up on port ' + port);
})