requirejs.config({
	baseUrl: '/js',
	paths: {
		underscore: 'vendor/underscore',
		dom: 'vendor/jquery',
		plugin: 'vendor/require',
//		string: 'vendor/string',
		bootstrap: ['vendor/bootstrap', '//netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min.js']
	},
	shim: {
		async: {
			exports: 'async'
		},
		underscore: {
			exports: '_'
		},
//		string: {
//			exports: 'S'
//		},
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
	'lib/dispatcher',
	'lib/sidebar',
	'app/chat'
], function () {
	console.log('App loaded');
});