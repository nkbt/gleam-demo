'use strict';

var gleam = require('gleam');
var _ = require('underscore');
var async = require('async');
var redis = require('redis');
var client = redis.createClient();

function userCreator(data) {
	console.log("data", data);
	return gleam.entity('user', data);
}

function getUser(id, callback) {
	return client.get(['user', id].join(':'), callback);
}

function saveUser(id, userEntity, callback) {

	getUser(id, function (error, user) {
		if (error) {
			return callback(error);
		}
		if (user) {
			return callback(new Error(["User with name '", id, "' already exists"].join('')));
		}
		return client.set(['user', id].join(':'), JSON.stringify(userEntity), function (error) {
			return callback(error, userEntity, ["User with name '", id, "' created"].join(''));
		});
	});
}

function redisGet(key, callback) {
	return client.get(key, callback);
}

function redisKeysGetter(condition) {
	return function (callback) {
		return client.keys(condition, callback);
	};
}

function asyncMapper(mapFunction) {
	return function (collection, callback) {
		return async.map(collection, mapFunction, callback);
	};
}

function entityRestorer() {
	return function (data, callback) {
		try {
			return callback(null, gleam.fromJson(data));
		} catch (error) {
			return callback(error);
		}
	};
}


/**
 * @param {ExpressServerRequest} req
 * @param {Function} callback
 */
exports.index = function (req, callback) {


	return async.waterfall([
		redisKeysGetter('user:*'),
		asyncMapper(redisGet),
		asyncMapper(entityRestorer())
	], callback);
};


/**
 * @param {ExpressServerRequest} req
 * @param {Function} callback
 */
exports.item = function (req, callback) {
	return getUser(req.param('id'), callback);
};

