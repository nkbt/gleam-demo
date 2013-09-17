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


	function viewTemplate(controller, action, name, callback) {
		return text([config.views, '/', controller, '/', action, '/', name, '.html'].join(''), callback);
	}


	function view(controller, action, callback) {
		return text([config.views, '/', controller, '/', action, '.html'].join(''), callback);
	}


	function fill($element, prefix, data) {
		return _.each(data, function (value, key) {
			return _.each($element.find(['[', prefix, '-', key, ']'].join('')), function (item) {
				var $item = $(item),
					target = $item.attr([prefix, '-', key].join(''));
				if (target) {
					$item.attr(target, value);
				} else {
					$item.html(value);
				}
				return $item;
			});
		});
	}

	return {
		'$root': $element,
		template: template,
		viewTemplate: viewTemplate,
		view: view,
		fill: fill
	};

});