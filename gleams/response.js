'use strict';

/**
 * @mixes {AbstractEntity}
 */
var ResponseEntity = {

	redirect: null,

	/**
	 * @type {MessageEntity[]}
	 */
	message: [],

	/**
	 * @type {PayloadEntity[]}
	 */
	payload: []
};

exports.Entity = ResponseEntity;
