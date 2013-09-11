"use strict";
/*jshint browser:true */
/*jslint browser:true */

define('lib/router', ['module', 'underscore'], function (module, _) {

	var config = _.defaults(module.config(), {
		controllerName: 'index',
		actionName: 'index'
	});

	function parse(url) {
		var element = document.createElement("a");

		element.href = _.isString(url) && url || '/';

		return {
			protocol: element.protocol,
			hostname: element.hostname,
			pathname: ['/', element.pathname].join('/').replace(new RegExp('^\/+'), '/'),
			search: element.search
		};
	}

	function route(url) {
		var location = parse(url),
			params = location.pathname.split('/'),
			paramsSize = _.size(params);

		/**
		 * "/"
		 */
		if (paramsSize === 2 && !params[1].length) {
			return [config.controllerName, config.actionName].join('/');
		}


		/**
		 * "/controller"
		 */
		if (paramsSize === 2) {
			return [params[1] || config.controllerName, config.actionName].join('/');
		}


		/**
		 * "/controller/action"
		 */
		if (paramsSize === 3) {
			return [params[1] || config.controllerName, params[2] || config.actionName].join('/');
		}


		return [config.controllerName, config.actionName].join('/');
	}

	return {
		route: route,
		parse: parse,
		controllerName: config.controllerName,
		actionName: config.actionName
	};

});