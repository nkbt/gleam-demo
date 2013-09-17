'use strict';

var _ = require('underscore');

/**
 * @mixes {AbstractEntity}
 */
var ChatMessageEntity = {

	/**
	 * @type {String}
	 */
	id: null,
	/**
	 * @type {String}
	 */
	chatId: null,
	/**
	 * @type {String}
	 */
	userId: null,
	/**
	 * @type {String}
	 */
	text: null,
	/**
	 * @type {UserEntity}
	 */
	user: null,
	/**
	 * @type {ChatEntity}
	 */
	chat: null,
	/**
	 * @type {Numeric}
	 */
	createdOn: null,
	/**
	 * @type {Date}
	 */
	createdOnReadable: null,


	/**
	 * @private
	 */
	validateText: function (value) {
		return !_.isEmpty(value);
	},


	/**
	 * @private
	 */
	validateChatId: function (value) {
		return !_.isEmpty(value);
	},


	/**
	 * @private
	 */
	validateUserId: function (value) {
		return !_.isEmpty(value);
	},

	/**
	 * @private
	 */
	getId: function () {
		if (!this.id) {
			return [this.chatId, this.get('createdOn')].join('-');
		}
		return this.createdOn;
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


exports.Entity = ChatMessageEntity;
