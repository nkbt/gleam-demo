"use strict";

define('lib/app', ['dom'], function ($) {

	var $element = $(document.body);


	function template(path, callback) {
		var templateModule = ['template!', path].join('');
		return path && require(
			[templateModule],
			callback,
			function (error) {
				console.warn('lib/app', templateModule, error.message, error.stack.split('\n'));
			}
		);
	}

	return {
		element: $element,
		on: $element.on.bind($element),
		trigger: $element.trigger.bind($element),
		template: template
	};

});