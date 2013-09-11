"use strict";

define('app/controllers/index', ['dom', 'underscore', 'lib/app', 'lib/request', 'lib/messenger'], function ($, _, app, request) {


	var actions = {};

	actions.index = function (template) {
		app.$root.trigger('lib/layout:renderBlock', ['content', template]);
	};

	function destroy() {

	}


	app.$root.on('lib/dispatcher:run', null, function (event, controller, action) {
		if (controller === 'index') {
			app.view(controller, action, actions[action]);
		} else {
			destroy();
		}
	});


	return actions;


});