"use strict";

define('lib/app', ['dom'], function ($) {

	var $element = $(document.body);


	function template(path, callback) {
		var templateModule = ['vendor/require/text!', path].join('');
		return path && require(
			[templateModule],
			callback,
			function (error) {
				console.warn('lib/app', templateModule, error.message, error.stack.split('\n'));
			}
		);
	}

	return {
		'$root': $element,
		template: template
	};

});