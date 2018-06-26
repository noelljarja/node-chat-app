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
var { isRealString } = require('./utils/validation')
var { Users } = require('./utils/users');
var users = new Users();
app.use(express.static(publicpath));
io.on('connection', function (socket) {
    console.log('New user connected');
    socket.on('join', function (params, callback) {
        if (!isRealString(params.name) || !isRealString(params.room)) {
           return callback('Name and room are required');
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUsers(socket.id, params.name, params.room);
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        socket.emit('newMessage', generateMessage('Admin', 'Welcome Aboard'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', params.name + ' is aboard'));
        callback();
    })
    socket.on('createMessage', function (newMessage,callback) {

        var user = users.getUser(socket.id);
        if (user && isRealString(newMessage.text)){
            io.to(user.room).emit('newMessage', generateMessage(user.name, newMessage.text));
        }
        

                     /*   socket.broadcast.emit('newMessage', {
                            from:newMessage.from,
                            text: newMessage.text,
                            createdAt: new Date().getTime()
                        })  */
        callback();
    })
    socket.on('createLocationMessage', function (coords) {
        var user = users.getUser(socket.id);
        if (user) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }
    })
    socket.on('disconnect', function () {
        console.log('Disconnected from client');
        var user = users.removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin',user.name + ' has left'));
        }
    })  
})
server.listen(port, function () {
    console.log('Server is up on port ' + port);
})