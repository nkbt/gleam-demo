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


	function destroy() {
	}


	app.$root.on('lib/dispatcher:run', null, function (event, controller, action) {
		if (controller === 'user') {
			app.view(controller, action, actions[action]);
		} else {
			destroy();
		}
	});


	return actions;

});