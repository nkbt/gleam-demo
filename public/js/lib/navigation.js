"use strict";

define('lib/navigation', ['module', 'dom', 'underscore', 'lib/app', 'lib/router'], function (module, $, _, app, router) {

	var config = _.defaults(module.config(), {
			active: 'active'
		}),
		templateLoaded = false,
		delegates = [];


	function auth(callback) {
		callback(null, {
			displayName: 'Guest'
		});
	}

	function checkUser() {
		return auth(function (error, user) {
			return handleUserMenu(user);
		});
	}

	function changeUrl(path) {
		var route = router.parse(router.route(path)),
			match = router.clean([route.controller, route.action].join('/'));
		return function () {
			app.$root.find(['.lib_navigation-item', config.active].join('.')).removeClass(config.active);
			console.log('match', match);
			return app.$root.find('.lib_navigation-item[data-lib_navigation-route="' + match + '"]').addClass(config.active);
		};
	}

	function onUrlChanged(event, path) {
		return templateLoaded && changeUrl(path)() || delegates.push(changeUrl(path));
	}

	function init(event) {
		var $element = $(event.target).closest('.lib_navigation');
		templateLoaded = true;
		_.each(delegates, function (delegate) {
			return delegate.call();
		});
		delegates = [];

		return checkUser($element);
	}


	function handleUserMenu(user) {
		app.$root.find('[data-lib_navigation-guest]').toggle(!user);
		app.$root.find('[data-lib_navigation-user]').toggle(!!user);
		return user && user.displayName && app.$root.find('[data-lib_navigation-user-name]').html(user.displayName);
	}


	function onLogin(event, user) {
		return handleUserMenu(user);
	}


	function onLogout() {
		return handleUserMenu();
	}

	app.$root
		.on('lib/dispatcher:urlChanged', onUrlChanged)
		.on('app/controllers/login:success', onLogin)
		.on('app/controllers/logout:success', onLogout)
		.one('lib/layout:render:done', '.lib_navigation', init);


	return {
	};

});