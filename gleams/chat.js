'use strict';

var _ = require('underscore');

/**
 * @mixes {AbstractEntity}
 */
var ChatEntity = {

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
		return !_.isEmpty(value) && _.isEqual(value, value.replace(/[^a-z_\-0-9]+/, ''));
	},

	getCreatedOn: function () {
		if (!this.createdOn) {
			return new Date();
		}
		return this.createdOn;
	}


};


exports.Entity = ChatEntity;
