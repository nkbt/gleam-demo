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
	 * @type {ChatMessageEntity[]}
	 */
	messages: [],
	/**
	 * @type {Date}
	 */
	createdOn: null,

	/**
	 * @private
	 */
	validateName: function (value) {
		return !_.isEmpty(value) && _.isEqual(value, value.replace(/[^a-z_\-0-9]+/i, ''));
	},

	getId: function () {
		if (!this.id) {
			return this.get('name');
		}
		return this.id;
	},

	getCreatedOn: function () {
		if (!this.createdOn) {
			var now = new Date();
			return now.getTime();
		}
		return this.createdOn;
	}


};


exports.Entity = ChatEntity;
