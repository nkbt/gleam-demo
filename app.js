'use strict';

var express = require('express');
var http = require('http');
var path = require('path');
var bootstrap = require('static-bootstrap');
var passport = require('./passport').passport;

var responseRenderer = require('./response-renderer');
var errorHandler = require('./error-handler');

var gleam = require('gleam');
gleam.setRoot(path.join(__dirname, 'gleams'));

var dispatcher = require('dispatcher');
dispatcher.setRoot(path.join(__dirname, 'controllers'));
dispatcher.setResponseRenderer(responseRenderer(gleam));

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/js/entity', gleam.serveEntity);
app.use(express.favicon());

app.use(bootstrap(path.join(__dirname, 'public'), undefined, undefined, [
	'/auth/twitter',
	'/auth/twitter/callback'
]));

app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('qwerty1234'));
app.use(express.session({secret: 'qwerty1234'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(errorHandler(dispatcher));

app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback', passport.authenticate('twitter', {successRedirect: '/', failureRedirect: '/'}));

app.get('/users', dispatcher.route('user', 'index'));
app.get('/chats', dispatcher.route('chat', 'index'));
app.all('*', dispatcher.defaultRoute());

http.createServer(app).listen(app.get('port'), function () {
	console.log('Express server listening on port ' + app.get('port'));
});
