'use strict';

var _ = require('underscore');
/**
 * @mixes {AbstractEntity}
 */
var ResponsePayloadEntity = {

	/**
	 * @type {String}
	 */
	id: '',

	/**
	 * @type {Object|Array}
	 */
	data: null,

	/**
	 * @private
	 */
	validateData: function (value) {
		return _.isObject(value) || _.isArray(value);
	}
};

exports.Entity = ResponsePayloadEntity;
