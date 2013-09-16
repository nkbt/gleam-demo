'use strict';

var gleam = require('gleam');
var _ = require('underscore');
var async = require('async');
var redis = require('redis');
var client = redis.createClient();

//var crypto = require('crypto');
//var sha = crypto.createHash('sha1');
//crypto.createHash('md5').update(name).digest("hex")

function chatCreator(data) {
	return gleam.entity('chat', data);
}

function getChat(id, callback) {
	return client.get(['chat', id].join(':'), callback);
}

function saveChat(id, chatEntity, callback) {

	getChat(id, function (error, chat) {
		if (error) {
			return callback(error);
		}
		if (chat) {
			return callback(new Error(["Chat with name '", id, "' already exists"].join('')));
		}
		return client.set(['chat', id].join(':'), JSON.stringify(chatEntity), function (error) {
			return callback(error, chatEntity, ["Chat with name '", id, "' created"].join(''));
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
		redisKeysGetter('chat:*'),
		asyncMapper(redisGet),
		asyncMapper(entityRestorer())
	], callback);
};


/**
 * @param {ExpressServerRequest} req
 * @param {Function} callback
 */
exports.item = function (req, callback) {
	return async.waterfall([
		async.apply(getChat, req.param('id')),
		entityRestorer()
	], callback);
};


/**
 * @param {ExpressServerRequest} req
 * @param {Function} callback
 */
exports.add = function (req, callback) {

	/**
	 * @type {ChatEntity}
	 */
	var chatEntity = chatCreator(req.body);
	return saveChat(chatEntity.name, chatEntity, callback);
};


/**
 * @param {ExpressServerRequest} req
 * @param {Function} callback
 */
exports.edit = function (req, callback) {

	callback(null, {});
};


/**
 * @param {ExpressServerRequest} req
 * @param {Function} callback
 */
exports.del = function (req, callback) {
	client.del(['chat', req.param('id')].join(':'), redis.print);

	callback(null, {});
};
