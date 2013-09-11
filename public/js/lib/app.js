"use strict";

define('lib/app', ['dom'], function ($) {

	var $element = $(document.body);


	function text(path, callback) {
		var templateModule = ['vendor/require/text!', path].join('');
		return path && require(
			[templateModule],
			callback,
			function (error) {
				console.warn('lib/app', templateModule, error.message, error.stack.split('\n'));
			}
		);
	}


	function template(name, callback) {
		return text(['/templates/', name, '.html'].join(''), callback);
	}


	function view(controller, action, callback) {
		return text(['/views/', controller, '/', action, '.html'].join(''), callback);
	}

	
	return {
		'$root': $element,
		template: template,
		view: view
	};

});