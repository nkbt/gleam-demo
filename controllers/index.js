/*
 * GET home page.
 */

function noCircularReplacer(obj) {
	var cache = [];

	function noCircular(key, value) {
		if (typeof value === 'object' && value !== null) {
			if (cache.indexOf(value) !== -1) {
				// Circular reference found
				return '[*RECURSION*]';
			}
			// Store value in our collection
			cache.push(value);
		}
		return value;
	}

	return JSON.parse(JSON.stringify(obj, noCircular));
}

var dispatcher = require('dispatcher');


function postIndex(req, next) {
	next(null, {'index': 'index', 'this': 'is POST!'});
}

function patchIndex(req, next) {
	next(null, {'index': 'index', 'this': 'is PATCH!'});
}

exports.index = function (req, next) {
	
	if (dispatcher.http.isPost(req)) {
		return postIndex(req, next);
	}

	if (dispatcher.http.isPatch(req)) {
		return patchIndex(req, next);
	}

	return next(null, {'index': 'index', 'req': noCircularReplacer(req)});
};