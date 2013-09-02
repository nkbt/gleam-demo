'use strict';

/**
 * @mixes {AbstractEntity}
 */
var ResponseEntity = {

	redirect: null,

	/**
	 * @type {ResponseMessageEntity[]}
	 */
	message: [],

	/**
	 * @type {ResponsePayloadEntity[]}
	 */
	payload: []
};

exports.Entity = ResponseEntity;
