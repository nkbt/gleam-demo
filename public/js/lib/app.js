"use strict";

define('lib/app', ['module', 'dom', 'underscore'], function (module, $, _) {
	var config = _.defaults(module.config(), {
			baseUrl: '/',
			templates: 'templates',
			views: 'views'
		}),
		$element = $(document.body);


	function text(path, callback) {
		var templateModule = ['vendor/require/text!', config.baseUrl, path].join('');
		return path && require(
			[templateModule],
			callback,
			function (error) {
				console.warn('lib/app', templateModule, error.message, error.stack.split('\n'));
			}
		);
	}


	function template(name, callback) {
		return text([config.templates, '/', name, '.html'].join(''), callback);
	}


	function view(controller, action, callback) {
		return text([config.views, '/', controller, '/', action, '.html'].join(''), callback);
	}


	return {
		'$root': $element,
		template: template,
		view: view
	};

});