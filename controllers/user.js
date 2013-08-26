/*
 * GET users listing.
 */

exports.index = function (req, next) {
	next(null, {'user': 'index'});
};