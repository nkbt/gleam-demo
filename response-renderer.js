'use strict';

var _ = require('underscore');


/**
 * @param {gleam} gleam
 * @returns {Function}
 */
module.exports = function (gleam) {


	/**
	 * @param {String|Error} message
	 * @returns {Object}
	 */
	function createMessage(message) {
		if (message instanceof Error) {
			return {
				'isError': true,
				'isMessage': false,
				'text': message.message
			};
		} else {
			return {
				'isError': false,
				'isMessage': true,
				'text': message
			};
		}
	}

	function gleamEntityCreator(entityName) {
		return function (data) {
			return gleam.entity(entityName, data);
		};
	}


	/**
	 * @param {ExpressServerResponse} res
	 * @param {Error} error
	 * @param {Object} data
	 */
	function responseRenderer(res, error, data) {

		var responseGleam = gleam.entity('response'),
			payloadGleam = gleam.entity('response/payload'),
			messages = _.map(_.map(data.messages || [], createMessage), gleamEntityCreator('response/message'));

		if (data.messages) {
			delete data.messages;
		}


		if (error) {
			if (!(error instanceof Error)) {
				error = new Error(error);
			}
			messages.unshift(gleam.entity('response/message', createMessage(error)));
		}

		payloadGleam.set({
			'data': data
		});

		responseGleam.set({
			'payload': [payloadGleam],
			'message': messages
		});

		return res.json(responseGleam);
	}

	return responseRenderer;
};