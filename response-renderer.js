'use strict';

/**
 * @param {gleam} gleam
 * @returns {Function}
 */
module.exports = function (gleam) {

	/**
	 * @param {ExpressServerResponse} res
	 * @param {Error} error
	 * @param {Object} data
	 */
	function responseRenderer(res, error, data) {

		var response = gleam.entity('response'),
			message = gleam.entity('response/message'),
			payload = gleam.entity('response/payload');

		message.set({
			'isError': error !== null,
			'isMessage': error === null,
			'text': error && error.message || 'OK'
		});

		payload.set({
			'data': data
		});

		response.set({
			'payload': [payload],
			'message': [message]
		});

		return res.json(response);
	}

	return responseRenderer;
};