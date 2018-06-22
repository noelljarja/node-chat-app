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
    socket.on('disconnect', function () {
        console.log('Disconnected from client');
    })  
})
server.listen(port, function () {
    console.log('Server is up on port ' + port);
})