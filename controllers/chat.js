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
	console.log("data", data);
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
			return callback(new Error(["Chat with name", id, "already exists"].join(' ')));
		}

		return client.set(['chat', id].join(':'), JSON.stringify(chatEntity), function (error) {
			console.log("chatEntity", chatEntity);
			callback(error, chatEntity);
		});
	});
}


/**
 * @param {ExpressServerRequest} req
 * @param {Function} callback
 */
exports.index = function (req, callback) {

	async.waterfall([
		client.keys.bind(client, 'chat:*'),
		client.get.bind(client, 'chat:*')
	]);

	client.keys('chat:*', function (error, keys) {
		if (error) {
			return callback(error);
		}

		return async.map(keys, client.get.bind(client), function (error, chats) {

			if (error) {
				return callback(error);
			}
			console.log("chats", chats);
			return callback(error, !error && _(chats).chain()
				.toArray()
				.map(chatCreator)
				.value() || []);
		})
	});
};


/**
 * @param {ExpressServerRequest} req
 * @param {Function} callback
 */
exports.item = function (req, callback) {
	return getChat(req.param('id'), callback);
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
	saveChat(chatEntity.name, chatEntity, callback);
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