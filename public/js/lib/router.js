"use strict";
/*jshint browser:true */
/*jslint browser:true */

define('lib/router', function () {

	function parse(url) {
		var element = document.createElement("a");

		element.href = url;

		return {
			protocol: element.protocol,
			hostname: element.hostname,
			pathname: element.pathname,
			search: element.search
		};
	}

	function route(url, defaultControllerName, defaultActionName) {
		var location = parse(url),
			params = location.pathname.split('/'),
			paramsSize = _.size(params),
			controllerName = defaultControllerName || 'index',
			actionName = defaultActionName || 'index';


		/**
		 * "/"
		 */
		if (paramsSize === 2 && !params[1].length) {
			return [controllerName, actionName].join('/');
		}


		/**
		 * "/controller"
		 */
		if (paramsSize === 2) {
			controllerName = params[1] || controllerName;
			return [controllerName, actionName].join('/');
		}


		/**
		 * "/controller/action"
		 */
		if (paramsSize === 3) {
			controllerName = params[1] || controllerName;
			actionName = params[2] || actionName;
			return [controllerName, actionName].join('/');
		}

		return [controllerName, actionName].join('/');
	}

	return {
		route: route,
		parse: parse
	};

});