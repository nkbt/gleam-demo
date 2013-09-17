'use strict';

var gleam = require('gleam');
var async = require('async');
var redis = require('redis');
var client = redis.createClient();


function rowGetter(entityName) {
	return function getRow(id, callback) {
		return client.get([entityName, id].join(':'), callback);
	};
}

function rowSaver(entityName) {
	return function saveRow(entity, callback) {
		var id = entity.get('id');

		rowGetter(entityName)(id, function (error, chat) {
			if (error) {
				return callback(error);
			}
			if (chat) {
				return callback(new Error(['[', entityName, '] with id "', id, '" already exists'].join('')));
			}
			return client.set([entityName, id].join(':'), JSON.stringify(entity), function (error) {
				return callback(error, entity, ['[', entityName, '] with id "', id, '" successfully created'].join(''));
			});
		});
	};
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


exports.index = function (entityName, callback) {
	return async.waterfall([
		redisKeysGetter([entityName, '*'].join(':')),
		asyncMapper(redisGet),
		asyncMapper(entityRestorer())
	], callback);
};


exports.item = function (entityName, id, callback) {
	return async.waterfall([
		async.apply(rowGetter(entityName), id),
		entityRestorer()
	], callback);
};


exports.add = function (entityName, data, callback) {
	return rowSaver(entityName)(gleam.entity(entityName, data), callback);
};


exports.edit = function (entityName, data, callback) {
	return rowSaver(entityName)(gleam.entity(entityName, data), callback);
};


exports.del = function (entityName, id, callback) {
	return client.del([entityName, id].join(':'), callback);
};


exports.indexAction = function (entityName) {
	/**
	 * @param {ExpressServerRequest} req
	 * @param {Function} callback
	 */
	return function index(req, callback) {
		return exports.index(entityName, callback);
	};
};


exports.itemAction = function (entityName) {
	/**
	 * @param {ExpressServerRequest} req
	 * @param {Function} callback
	 */
	return function item(req, callback) {
		return exports.item(entityName, req.param('id'), callback);
	};
};


exports.addAction = function (entityName) {
	/**
	 * @param {ExpressServerRequest} req
	 * @param {Function} callback
	 */
	return function add(req, callback) {
		return exports.add(entityName, req.body, callback);
	};
};


exports.editAction = function (entityName) {
	/**
	 * @param {ExpressServerRequest} req
	 * @param {Function} callback
	 */
	return function edit(req, callback) {
		return exports.add(entityName, req.body, callback);
	};
};


exports.delAction = function (entityName) {
	/**
	 * @param {ExpressServerRequest} req
	 * @param {Function} callback
	 */
	return function del(req, callback) {
		return exports.del(entityName, req.param('id'), callback);
	};
};
