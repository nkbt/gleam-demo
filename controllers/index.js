
/*
 * GET home page.
 */

exports.index = function (req, next) {
	next(null, {'index': 'index'});
};