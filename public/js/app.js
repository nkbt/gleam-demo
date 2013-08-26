requirejs.config({
	baseUrl: '/js',
	paths: {
		underscore: 'vendor/underscore',
		dom: 'vendor/jquery',
		plugin: 'vendor/require'
	},
	shim: {
		async: {
			exports: 'async'
		},
		underscore: {
			exports: '_'
		},
		dom: {
			exports: 'jQuery'
		}
	},
	deps: ['dom', 'underscore', 'lib/messenger', 'app/test']
});