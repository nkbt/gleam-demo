'use strict';

requirejs.config({
	baseUrl: '/js',
	paths: {
		underscore: 'vendor/underscore',
		dom: 'vendor/jquery',
		plugin: 'vendor/require',
		template: 'vendor/require/text',
		string: 'vendor/string',
		bootstrap: ['vendor/bootstrap', '//netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min.js']
	},
	shim: {
		async: {
			exports: 'async'
		},
		underscore: {
			exports: '_'
		},
		string: {
			exports: 'S'
		},
		dom: {
			exports: 'jQuery'
		},
		bootstrap: ['dom']
	},
	deps: [
		'bootstrap'
	]
});


// Start the main app logic.
requirejs([
	'dom',
	'lib/app',
	'lib/layout',
	'lib/dispatcher',
	'lib/sidebar'
], function ($, app) {
	console.log('App loaded');

	$(function () {
		app.trigger('lib/layout:render');
	});
});