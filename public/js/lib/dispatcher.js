"use strict";
/*jshint browser:true */
/*jslint browser:true */

define('lib/dispatcher', ['dom', 'underscore', 'lib/router'], function ($, _, router) {

	var $body = $(document.body);

	function initController(element) {
		console.log('lib/dispatcher', "initController", element);
		var $element = $(element),
			controllerModule = $element.data('dispatcher-controller');
		$element.attr('data-dispatcher-processed', true);

		require([controllerModule], function () {
			console.log([controllerModule, 'init'].join(':'));
			$element.trigger([controllerModule, 'init'].join(':'));
		});
	}

	function initTemplate(element) {
		console.log('lib/dispatcher', "initTemplate", element);
		var $element = $(element),
			templateName = $element.data('dispatcher-template');

		$element.attr('data-dispatcher-processed', true);

		require([['plugin/text', templateName].join('!')], function (template) {
			console.log([templateName, 'init'].join(':'));
			$element
				.html(template)
				.trigger('lib/dispatcher:init');
		});
	}

	function initPage(page, title) {
		var path = ['/', page].join(''),
			state = {
				page: page,
				title: title,
				path: path
			};
		return window.history.pushState(state, title, path);
	}


	function init() {
		_.each($('.jsDispatcher[data-dispatcher-controller]:not([data-dispatcher-processed])'), initController);
		_.each($('.jsDispatcher[data-dispatcher-template]:not([data-dispatcher-processed])'), initTemplate);
	}

	function dispatch(controller) {

	}


	$body.on('lib/dispatcher:init', init);
	$body.on('click', '.jsDispatcher-link', function (event) {
		event.preventDefault();
		var $link = $(event.target).closest('.jsDispatcher-link'),
			currentRoute = router.route(document.location.pathname),
			newRoute = router.route($link.attr('href'));

		return currentRoute !== newRoute && initPage(newRoute, $link.text());
	});


	$(function () {
		$body.trigger('lib/dispatcher:init');
		initPage(router.route(document.location.pathname));
	});

	return {
		init: init,
		dispatch: dispatch
	};

});