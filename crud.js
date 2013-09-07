'use strict';

var async = require('async');
var gleam = require('gleam');
var redis = require('redis');
var _ = require('underscore');
var client = redis.createClient();

function creator(entityName, callback) {
	return function (data) {
		return callback(null, gleam.entity(entityName, data));
	}
}

function getter(id, callback) {
	return client.get(['chat', id].join(':'), callback);
}

function saver(id, chatEntity, callback) {

	getter(id, function (error, chat) {
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

function mapper(func) {
	return function () {
		var args = _.toArray(arguments);
		return func.apply(null, args);
	}
}

function createRedisGetter(callback) {

}


function createAsyncMapper(itemMapper) {
	return function (items, next) {

		return async.map(
			items,
			itemMapper,
			next
		);

	}
}

function selectEntityList(entityName, callback) {
	async.waterfall(
		[

			client.keys.bind(client, [entityName, '*'].join(':')),

			createAsyncMapper(client.get.bind(client)),

			createAsyncMapper(function (itemJson, next) {
				return next(null, gleam.fromJson(itemJson));
			})

		],
		callback
	);
}
function selectEntity(entityName, id, callback) {
	return client.get([entityName, id].join(':'), creator(entityName, callback));
}
function deleteEntity(entityName, entity, callback) {
	return client.del([entityName, entity.get('id')].join(':'), callback);
}
function insertEntity(entityName, entity, callback) {
	return client.set([entityName, entity.get('id')].join(':'), entity, callback);
}
function updateEntity(entityName, entity, callback) {
	return client.set([entityName, entity.get('id')].join(':'), entity, callback);
}
exports.selectEntityList = selectEntityList;
exports.selectEntity = selectEntity;
exports.insertEntity = insertEntity;
exports.deleteEntity = deleteEntity;
exports.updateEntity = updateEntity;