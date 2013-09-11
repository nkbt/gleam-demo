"use strict";

define('lib/navigation', ['module', 'dom', 'underscore', 'lib/app'], function (module, $, _, app) {

	var config = _.defaults(module.config(), {
		active: 'active'
	});


	var templateLoaded = false, delegates = [];


	function changeUrl(path) {
		return function () {
			app.$root.find(['.lib_navigation-item', config.active].join('.')).removeClass(config.active);
			return app.$root.find('.lib_navigation-item[data-lib_navigation-match="' + path + '"]').addClass(config.active);
		};
	}

	function onUrlChanged(event, path) {
		return templateLoaded && changeUrl(path)() || delegates.push(changeUrl(path));
	}

	function init() {
		templateLoaded = true;
		_.each(delegates, function (delegate) {
			return delegate.call();
		});
		delegates = [];
	}

	app.$root.on('lib/dispatcher:urlChanged', null, onUrlChanged);
	app.$root.one('lib/layout:render:done', '.lib_navigation', init);


	return {
	};

});