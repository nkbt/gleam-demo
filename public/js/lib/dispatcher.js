"use strict";

define(
	'lib/dispatcher',
	[
		'module', 'dom', 'underscore', 'history', 'lib/app', 'lib/router',
		'lib/layout',
		'lib/navigation'
	],
	/**
	 * @param {Module} module
	 * @param {jQuery} $
	 * @param {underscore} _
	 * @param {History} history
	 * @param {lib/app} app
	 * @param {lib/router} router
	 * @returns {{dispatch: Function}}
	 */
		function (module, $, _, history, app, router) {

		var config = _.defaults(module.config(), {
				basePath: 'app/controllers'
			}),
			routeCleaner = new RegExp(
				[
					["^", router.controllerName, "\/", router.actionName, "$"].join(''),
					["\/", router.actionName, "$"].join(''),
					["^", router.controllerName, "$"].join('')
				].join('|')
			);


		function run(route) {
			var routeParts = route.split('/'),
				controllerName = routeParts.shift(),
				actionName = routeParts.shift(),
				controllerModule = [config.basePath, controllerName].join('/');

			require(
				[controllerModule],
				function controllerModuleLoaded() {
					console.log('lib/dispatcher', 'trigger', 'lib/dispatcher:run', controllerName, actionName);
					return app.$root.trigger('lib/dispatcher:run', [controllerName, actionName]);
				},
				function (error) {
					console.warn('lib/dispatcher', controllerModule, error.message, error.stack.split('\n'));
				}
			);
		}


		/**
		 * @param {String} route
		 * @param {String} title
		 * @returns {*}
		 */
		function updateUrl(route, title) {
			var path = ['/', route.replace(routeCleaner, '')].join('');
			history.pushState(null, title, path);
			console.log('lib/dispatcher', 'trigger', 'lib/dispatcher:urlChanged', path, title);
			return app.$root.trigger('lib/dispatcher:urlChanged', [path, title]);
		}


		/**
		 * @param {String} route
		 * @param {String} title
		 * @returns {*}
		 */
		function dispatch(route, title) {
			route = router.route(route);
			updateUrl(route, title);
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
			return dispatch($link.attr('href'), $link.data('lib_dispatcher-title') || $link.text());
		}

		app.$root
			.on('lib/dispatcher:dispatch', null, onDispatch)
			.on('click', '.lib_dispatcher-link', onClick);

		/**
		 * Restoring current page
		 */
		function restoreState() {
			var state = history.getState();
			console.log('lib/dispatcher', 'restoreState', state, state.hash, state.title);
			return dispatch(state.hash, state.title);
		}

		history.Adapter.bind(window, 'statechange', restoreState);

		$(restoreState);

		return {
			dispatch: dispatch
		};

	}
);