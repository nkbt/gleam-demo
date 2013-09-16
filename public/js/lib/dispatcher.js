"use strict";

define(
	'lib/dispatcher',
	[
		'module', 'dom', 'underscore', 'lib/app', 'lib/router',
		'lib/layout',
		'lib/navigation'
	],
	/**
	 * @param {Module} module
	 * @param {jQuery} $
	 * @param {underscore} _
	 * @param {lib/app} app
	 * @param {lib/router} router
	 * @returns {{dispatch: Function}}
	 */
		function (module, $, _, app, router) {


		var config = _.defaults(module.config(), {
				basePath: 'app/controllers'
			}),
			currentHash = router.getRouteFromHash();


		function run(route) {
			var routeParsed = router.parse(route),
				controllerModule = [config.basePath, routeParsed.controller].join('/');

			require(
				[controllerModule],
				function controllerModuleLoaded() {
					console.log('lib/dispatcher', 'trigger', 'lib/dispatcher:run',
						'[controller]', routeParsed.controller, '[action]', routeParsed.action, '[query]', routeParsed.query);
					return app.$root.trigger('lib/dispatcher:run', [routeParsed.controller, routeParsed.action, routeParsed.query]);
				},
				function (error) {
					console.warn('lib/dispatcher', controllerModule, error.message, error.stack.split('\n'));
				}
			);
		}


		/**
		 * @param {String} route
		 * @returns {*}
		 */
		function updateUrl(route) {
			var path = ['/', router.clean(route)].join('');
			currentHash = path;
			document.location.hash = ['!', path].join('');
			console.log('lib/dispatcher', 'trigger', 'lib/dispatcher:urlChanged', path);
			return app.$root.trigger('lib/dispatcher:urlChanged', [path]);
		}


		/**
		 * @param {String} route
		 * @returns {*}
		 */
		function dispatch(route) {
			route = router.route(route);
			updateUrl(route);
			return run(route);
		}


		/**
		 * @param {Event} event
		 * @param {String} route
		 * @returns {*}
		 */
		function onDispatch(event, route) {
			return _.isString(route) && dispatch(route);
		}


		/**
		 * @param {Event} event
		 * @returns {*}
		 */
		function onClick(event) {
			event.preventDefault();
			var $link = $(event.target).closest('.lib_dispatcher-link');
			return dispatch($link.attr('href'));
		}

		app.$root
			.on('lib/dispatcher:dispatch', null, onDispatch)
			.on('click', '.lib_dispatcher-link', onClick);


		/**
		 * Restoring current page
		 */
		function restoreState() {
			console.log('lib/dispatcher', 'restoreState', currentHash);
			return dispatch(currentHash);
		}


		$(window).on('hashchange', function () {
			var route = router.getRouteFromHash();
			if (route !== currentHash) { // will happen only on browser's "back" or "forward"
				currentHash = route;
				dispatch(currentHash);
			}
		});
		$(restoreState);

		return {
			dispatch: dispatch
		};

	}
);