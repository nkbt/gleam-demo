'use strict';

/**
 * @mixes {AbstractEntity}
 */
var MessageEntity = {

	/**
	 * @type {Boolean}
	 */
	isError: false,

	/**
	 * @type {Boolean}
	 */
	isMessage: false,

	/**
	 * @type {String}
	 */
	text: ''
};

exports.Entity = MessageEntity;
