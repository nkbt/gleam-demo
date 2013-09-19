'use strict';

var _ = require('underscore');

/**
 * @mixes {AbstractEntity}
 */
var ChatEntity = {

	/**
	 * @type {String}
	 */
	id: null,
	/**
	 * @type {String}
	 */
	name: null,
	/**
	 * @type {Date}
	 */
	createdOn: null,

	/**
	 * @type {Date}
	 */
	createdOnReadable: null,

	/**
	 * @private
	 */
	validateId: function (value) {
		return !_.isEmpty(value) && _.isEqual(value, value.replace(/[^a-z_\-0-9]+/, ''));
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
	},

	/**
	 * @private
	 */
	getCreatedOnReadable: function () {
		if (!this.createdOnReadable) {
			var date = new Date(parseInt(this.get('createdOn'), 10));
			return [
				[date.getFullYear(), date.getMonth() + 1, date.getDate()].join('.'),
				[date.getHours(), date.getMinutes(), date.getSeconds()].join(':'),
			].join(' ');
		}
		return this.createdOnReadable;
	}
};


exports.Entity = ChatEntity;
