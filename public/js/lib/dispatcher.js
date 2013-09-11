"use strict";

define('lib/dispatcher', ['module', 'dom', 'underscore', 'lib/app', 'lib/router', 'lib/navigation'], function (module, $, _, app, router) {

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


	function loadController(route) {
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
	 * @returns {*}
	 */
	function updateUrl(route) {
		var path = ['/', route.replace(routeCleaner, '')].join(''),
			state = {
				page: route,
				path: path
			};
		window.history.pushState(state, null, path);
		console.log('lib/dispatcher', 'trigger', 'lib/dispatcher:urlChanged', path);
		return app.$root.trigger('lib/dispatcher:urlChanged', [path]);
	}


	/**
	 * @param {String} route
	 * @returns {*}
	 */
	function run(route) {
		updateUrl(route);
		return loadController(route);
	}


	/**
	 * @param {String} route
	 * @returns {*}
	 */
	function dispatch(route) {
		var currentRoute = router.route(document.location.pathname);
		console.log("currentRoute", currentRoute);
		route = router.route(route);
		console.log("route", route);

		return route !== currentRoute && run(route);
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
		return dispatch($(event.target).closest('.lib_dispatcher-link').attr('href'));
	}


	app.$root
		.on('lib/dispatcher:dispatch', null, onDispatch)
		.on('click', '.lib_dispatcher-link', onClick);


	/**
	 * Restoring current page
	 */
	$(function () {
		var route = router.route(document.location.pathname);
		run(route);
	});

	return {
		dispatch: dispatch
	};

});