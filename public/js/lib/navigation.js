"use strict";

define('lib/navigation', ['module', 'dom', 'underscore', 'lib/app', 'lib/router', 'lib/request'], function (module, $, _, app, router, request) {

	var config = _.defaults(module.config(), {
			active: 'active'
		}),
		templateLoaded = false,
		delegates = [];


	function auth(callback) {
		request(request.METHOD_GET, '/user/me', {}, function (error, payload) {
			if (error) {
				return callback(error);
			}
			return callback(null, payload && payload.get('data'));
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

		var isGuest = _.isEmpty(user);
		app.$root.find('[data-lib_navigation-guest]').toggle(isGuest);
		app.$root.find('[data-lib_navigation-user]').toggle(!isGuest);
		if (!isGuest) {
			app.fill(app.$root, 'data-lib_navigation-user', user.get());
		}
	}


	function onLogout() {
		return handleUserMenu();
	}

	app.$root
		.on('lib/dispatcher:urlChanged', onUrlChanged)
		.on('app/controllers/user:logout', onLogout)
		.one('lib/layout:render:done', '.lib_navigation', init);


	return {
	};

});