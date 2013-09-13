"use strict";

define(
	'app/controllers/chat',
	[
		'dom', 'underscore', 'lib/app', 'lib/request', 'lib/messenger'
	],
	function ($, _, app, request, messenger) {


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
			console.log('event', event);
			var $element = $(event.target).closest('.app_controllers_chat-add'),
				type = Math.round(Math.random()) && messenger.TYPE_ERROR || messenger.TYPE_MESSAGE;


			$element.trigger('lib/messenger:show', [type, type]);
		}

		app.$root
			.on('submit', '.app_controllers_chat-add', onAddChatSubmit);
		console.log('123', 123);

		return actions;

	}
);