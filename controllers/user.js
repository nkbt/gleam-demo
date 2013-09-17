'use strict';

var crud = require('../crud');
var dispatcher = require('dispatcher');
var gleam = require('gleam');

exports.index = crud.indexAction('user');
exports.item = crud.itemAction('user');
exports.add = crud.addAction('user');
exports.del = crud.delAction('user');

exports.me = function (req, callback) {
	if (req.user instanceof gleam.entityConstructor('user')) {
		return callback(null, req.user);
	}
	return callback(null);
};

exports.logout = function (req, callback) {
	req.session = null;
	callback(null, {}, "Successfully logged out");
};

