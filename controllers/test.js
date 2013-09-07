'use strict';

var gleam = require('gleam');
var dispatcher = require('dispatcher');
var crud = require('../crud');

exports.index = function (req, callback) {

	var count = Math.round(Math.random() * 30), i, list = [];
	for (i = 0; i < count; i = i + 1) {
		list.push(gleam.entity('test', {
			name: "Item # " + Math.round(Math.random() * 1000),
			value: Math.round(Math.random() * 100),
			createdOn: new Date()
		}));
	}

	callback(null, list);
};

exports.fail = function (req, callback) {
	callback(new Error('AAAA! Something happened. Cannot get anything!'));
};

exports.message = function (req, callback) {
	callback(null, {}, 'Everything is OK!');
};

exports.sample = function (req, callback) {
	callback(null, {success: true}, 'Success');
};



exports.chat = function(req, callback) {


	if (dispatcher.http.isGet(req)) {
		crud.selectEntityList('chat', callback);
	}
	
	
	
};