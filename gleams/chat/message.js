'use strict';

/**
 * @mixes {AbstractEntity}
 */
var ChatMessageEntity = {

	/**
	 * @type {String}
	 */
	text: null,
	/**
	 * @type {UserEntity}
	 */
	user: null,
	/**
	 * @type {Date}
	 */
	createdOn: null

};


exports.Entity = ChatMessageEntity;
