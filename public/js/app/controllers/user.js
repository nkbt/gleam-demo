"use strict";

define('app/controllers/user', ['dom', 'underscore', 'lib/app', 'lib/request', 'lib/messenger'], function ($, _, app, request) {


	var actions = {};


	actions.index = function (template) {
		app.$root.trigger('lib/layout:renderBlock', ['content', template]);
	};


	actions.item = function (template) {
		app.$root.trigger('lib/layout:renderBlock', ['content', template]);
	};


	actions.add = function (template) {
		app.$root.trigger('lib/layout:renderBlock', ['content', template]);
	};


	actions.edit = function (template) {
		app.$root.trigger('lib/layout:renderBlock', ['content', template]);
	};


	actions.del = function (template) {
		app.$root.trigger('lib/layout:renderBlock', ['content', template]);
	};


	actions.logout = function () {
		return request(request.METHOD_GET, '/user/logout', {}, function () {
			app.$root
				.trigger('lib/dispatcher:dispatch', ['/'])
				.trigger('app/controllers/user:logout');
		});
	};


	function destroy() {
	}


	app.$root.on('lib/dispatcher:run', null, function (event, controller, action) {
		if (controller === 'user' && action === 'logout') {
			actions[action].call();
		} else if (controller === 'user') {
			app.view(controller, action, actions[action]);
		} else {
			destroy();
		}
	});


	function onIndexReady(event) {

		var $element = $(event.target).closest('.app_controllers_user-index'),
			$container = $element.find('.app_controllers_user-index-container');

		return request(request.METHOD_GET, '/user/index', {}, function (error, payload) {
			$container.empty();

			return _.each(payload.get('data'), function (user) {
				return app.viewTemplate('user', 'index', 'item', function (template) {
					console.warn('template', template);
					return $(template).appendTo($container)
						.find('.app_controllers_user-index-item-link')
						.attr('href', ['#!/user/item', user.get('id')].join('!'))
						.html(user.get('name'));
				});
			});
		});

	}

	app.$root
		.on('lib/layout:renderBlock:done', '.app_controllers_user-index', onIndexReady);


	return actions;

});