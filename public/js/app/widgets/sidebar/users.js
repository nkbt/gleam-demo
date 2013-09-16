"use strict";

define('app/widgets/sidebar/users', ['dom', 'underscore', 'lib/app', 'lib/request'], function ($, _, app, request) {


	function onChatsReady(event) {
		var $element = $(event.target).closest('.app_widgets_sidebar_users'),
			$container = $element.find('.app_widgets_sidebar_users-container');

		return request(request.METHOD_GET, '/user/index', {}, function (error, payload) {
			$container.empty();

			return _.each(payload.get('data'), function (chat) {
				return app.template('widgets/sidebar/users/item', function (template) {
					return $(template).appendTo($container)
						.find('.app_widgets_sidebar_users-item-link')
						.attr('href', ['#!/user/item', chat.get('id')].join('!'))
						.html(chat.get('name'));
				});
			});
		});
	}

	app.$root
		.on('lib/layout:render:done', '.app_widgets_sidebar_users', onChatsReady);

});