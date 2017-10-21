var express = require('express');
var app = express();
var server = require('http').createServer(app);
// var io = require('socket.io')(server);
app.use(express.static(__dirname + '/'));
app.get('/exercise', function (req, res) {
  res.send('./nodeTest/js/myExercise.html');
})
server.listen(process.env.PORT || 8001);
