"use strict";

define('app/widgets/sidebar', ['dom', 'underscore', 'lib/app', 'lib/request'], function ($, _, app, request) {


	function onChatsReady(event) {
		var $element = $(event.target).closest('.app_widgets_sidebar-chats'),
			$container = $element.find('.app_widgets_sidebar-chats-container');

		return request(request.METHOD_GET, '/chat/index', {}, function (error, payload) {
			return _.each(payload.get('data'), function (chat) {
				return app.template('widgets/sidebar/chats/item', function (template) {
					return $(template).appendTo($container)
						.find('.app_widgets_sidebar-chats-item-link')
						.attr('href', ['#!/chat/item', chat.get('id')].join('!'))
						.html(chat.get('name'));
				});
			});
		});
	}

	app.$root
		.on('lib/layout:render:done', '.app_widgets_sidebar-chats', onChatsReady);

});