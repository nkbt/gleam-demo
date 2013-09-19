"use strict";

define('app/widgets/sidebar/chats', ['dom', 'underscore', 'lib/app', 'lib/request'], function ($, _, app, request) {


	function onChatsReady(event) {
		var $element = $(event.target).closest('.app_widgets_sidebar_chats'),
			$container = $element.find('.app_widgets_sidebar_chats-container');

		return request(request.METHOD_GET, '/chat/index', {}, function (error, payload) {
			$container.empty();

			return _.each(payload.get('data'), function (chat) {
				return app.template('widgets/sidebar/chats/item', function (template) {
					var $template = $(template);
					$template
						.find('.app_widgets_sidebar_chats-item-link')
						.attr('href', ['#!/chat/item', chat.get('id')].join('!'));
					app.fill($template, 'data-app_widgets_sidebar_chats-item', chat.get());
					return $template.appendTo($container);
				});
			});
		});
	}

	app.$root
		.on('lib/layout:render:done', '.app_widgets_sidebar_chats', onChatsReady);

});