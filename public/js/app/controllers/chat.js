"use strict";

define(
	'app/controllers/chat',
	[
		'dom', 'underscore',
		'lib/app', 'lib/router', 'lib/request', 'lib/messenger', 'lib/dom/form',
		'entity/chat'
	],
	function ($, _, app, router, request, messenger, form, ChatEntity) {


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


		function destroy() {
		}


		app.$root.on('lib/dispatcher:run', null, function (event, controller, action) {
			if (controller === 'chat') {
				app.view(controller, action, actions[action]);
			} else {
				destroy();
			}
		});


		function onAddChatSubmit(event) {
			event.preventDefault();
			var $form = $(event.target).closest('.app_controllers_chat-add-form'),
				chatEntity = new ChatEntity();

			try {
				chatEntity.set(form.values($form));
			} catch (error) {
				return $form.trigger('lib/messenger:show', [messenger.TYPE_ERROR, error.message]);
			}

			form.disable($form);

			return request(request.METHOD_POST, $form.attr('action'), chatEntity, function (error) {
				if (!error) {
					form.clear($form);
				}
				form.enable($form);
			});
		}

		app.$root
			.on('submit', '.app_controllers_chat-add .app_controllers_chat-add-form', onAddChatSubmit);


		function onIndexReady(event) {

			var $element = $(event.target).closest('.app_controllers_chat-index'),
				$container = $element.find('.app_controllers_chat-index-container');

			return request(request.METHOD_GET, '/chat/index', {}, function (error, payload) {
				$container.empty();

				return _.each(payload.get('data'), function (chat) {
					return app.viewTemplate('chat', 'index', 'item', function (template) {
						console.warn('template', template);
						return $(template).appendTo($container)
							.find('.app_controllers_chat-index-item-link')
							.attr('href', ['#!/chat/item', chat.get('id')].join('!'))
							.html(chat.get('name'));
					});
				});
			});


		}

		app.$root
			.on('lib/layout:renderBlock:done', '.app_controllers_chat-index', onIndexReady);


		function messageRenderer($element) {
			return function (messageEntity) {
				app.viewTemplate('chat', 'item', 'message', function (template) {
					var $template = $(template).prependTo($element);
					return app.fill($template, 'data-app_controllers_chat-message', messageEntity.get());
				});
			};
		}

		function fillMessages($element, chatEntity) {
			return request(request.METHOD_GET, '/chat-message', {}, function (error, payload) {
				var messages = payload.get('data');
				return _.each(messages, messageRenderer($element));
			});

		}

		function onItemReady(event) {

			var $element = $(event.target).closest('.app_controllers_chat-item'),
				id = router.parse(router.getRouteFromHash()).query;
			return request(request.METHOD_GET, '/chat/item', {id: id}, function (error, payload) {
				var chatEntity = payload.get('data');
				app.fill($element, 'data-app_controllers_chat-item', chatEntity.get());

				return fillMessages($element.find('.app_controllers_chat-item-messages'), chatEntity);
			});

		}

		app.$root
			.on('lib/layout:renderBlock:done', '.app_controllers_chat-item', onItemReady);


		return actions;

	}
);