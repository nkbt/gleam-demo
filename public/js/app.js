'use strict';

requirejs.config({
	baseUrl: '/js',
	paths: {
		underscore: 'vendor/underscore',
		dom: 'vendor/jquery',
		string: 'vendor/string',
		bootstrap: ['vendor/bootstrap', '//netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min.js'],
		history: 'vendor/history/html5'
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
		history: {
			exports: 'History'
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
	'lib/sidebar',
	'vendor/require/css!/css/bootstrap.css',
	'vendor/require/css!/css/bootstrap-theme.css',
	'vendor/require/css!/css/font-awesome.css',
	'vendor/require/css!/css/style.css'
], function ($, app) {
	console.log('App loaded');

	$(function () {
		app.$root.trigger('lib/layout:render');
	});
});