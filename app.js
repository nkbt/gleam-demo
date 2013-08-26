/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var bootstrap = require('static-bootstrap');


var dispatcher = require('dispatcher');
dispatcher.setRoot(path.join(__dirname, 'controllers'));


var gleam = require('gleam');
gleam.setRoot(path.join(__dirname, 'gleams'));

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/js/entity', gleam.serveEntity);
app.use(express.favicon());

app.use(bootstrap(path.join(__dirname, 'public'), 'index.html'));

app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('qwerty1234'));
app.use(express.session());
app.use(app.router);

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

app.get('/', dispatcher.route('index', 'index'));
app.get('/users', dispatcher.route('user', 'index'));

http.createServer(app).listen(app.get('port'), function () {
	console.log('Express server listening on port ' + app.get('port'));
});
