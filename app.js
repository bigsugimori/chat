
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , ejs = require('ejs');

var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

server.listen(3000);

app.get('/', routes.index);

io.sockets.on('connection', function(socket) {
    socket.emit('news', {hello: 'world'});
    socket.on('my other event', function(data) {
	console.log(data);
    });
});
