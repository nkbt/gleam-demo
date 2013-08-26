'use strict';

/**
 * @param {dispatcher} dispatcher
 * @returns {Function}
 */
module.exports = function (dispatcher) {

	/**
	 * @param {Error} error
	 * @param {ExpressServerRequest} req
	 * @param {ExpressServerResponse} res
	 * @param {Function} next
	 */
	function errorHandler(error, req, res, next) {
		var notFoundError = dispatcher.errors.NotFoundError();
		notFoundError.error = error;
		req.error = notFoundError;
		dispatcher.route('error', 'index')(req, res);
	}

	return errorHandler;
};