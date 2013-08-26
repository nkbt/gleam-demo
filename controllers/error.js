
var dispatcher = require('dispatcher');

exports.index = function (req, next) {
	next(req.error || new dispatcher.errors.NotFoundError('Not found'));
};