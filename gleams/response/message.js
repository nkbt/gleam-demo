'use strict';

/**
 * @mixes {AbstractEntity}
 */
var ResponseMessageEntity = {

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

exports.Entity = ResponseMessageEntity;
