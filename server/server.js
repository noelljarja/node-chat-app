var path = require('path');
var publicpath = path.join(__dirname, '../public');
var port = process.env.PORT || 3000;
var express = require('express');
var app = express();
app.use(express.static(publicpath));
app.listen(port, function () {
    console.log('Server is up on port ' + port);
})