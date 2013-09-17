'use strict';

var _ = require('underscore');

/**
 * @mixes {AbstractEntity}
 */
var UserEntity = {

	/**
	 * @type {String}
	 */
	id: null,

	/**
	 * @type {String}
	 */
	name: null,

	/**
	 * @type {String}
	 */
	avatar: null,

	/**
	 * @type {Date}
	 */
	createdOn: null,


	/**
	 * @private
	 */
	validateId: function (value) {
		return !_.isEmpty(value) &&
			_.isEqual(value, value.replace(/[^0-9]+/, ''));
	},


	/**
	 * @private
	 */
	validateName: function (value) {
		return !_.isEmpty(value);
	},


	/**
	 * @private
	 */
	getCreatedOn: function () {
		if (!this.createdOn) {
			var now = new Date();
			return now.getTime();
		}
		return this.createdOn;
	}

};


exports.Entity = UserEntity;
