'use strict';

var _ = require('underscore');
/**
 * @see {AbstractEntity}
 * @mixes {AbstractEntity}
 */
var PayloadEntity = {

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

exports.Entity = PayloadEntity;
