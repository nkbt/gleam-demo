"use strict";

define(
	'app/controllers/chat',
	[
		'dom', 'underscore',
		'lib/app', 'lib/request', 'lib/messenger', 'lib/dom/form',
		'entity/chat'
	],
	function ($, _, app, request, messenger, form, ChatEntity) {


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

		return actions;

	}
);