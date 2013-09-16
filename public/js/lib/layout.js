"use strict";

define('lib/layout', ['dom', 'underscore', 'lib/app'], function ($, _, app) {

	var triggerRenderingDone = _.debounce(function ($context) {
		$context.trigger('lib/layout:render:finished');
	}, 500);

	function initTemplate(element) {
		console.log('lib/layout', "initTemplate", element);
		var $element = $(element),
			templateName = $element.data('lib_layout-template');

		$element.attr('data-lib_layout-rendered', true);

		return app.template(templateName, function (content) {
			var $content = $($.parseHTML(content.trim()));
			$element.html($content);
			$content.trigger('lib/layout:render:done', [templateName]);
		});
	}


	function render(element) {
		var $element = $(element).length && $(element) || app.$root;
		_.each($element.find('.lib_layout[data-lib_layout-template]:not([data-lib_layout-rendered])'), initTemplate);
	}


	function onRender(event) {
		return render($(event.target));
	}


	function onRenderBlock(event, blockName, content) {
		var $element = $(event.target).closest('.lib_layout'),
			$content = $($.parseHTML(content.trim()));

		$element.attr('data-lib_layout-rendered', null);
		$element.find('.lib_layout[data-lib_layout-block="' + blockName + '"]').html($content);
		_.defer(function () {
			$content.trigger('lib/layout:renderBlock:done', [blockName]);
		});
	}


	function onRenderDone(event) {
		var $context = $(event.target);
		triggerRenderingDone($context);
		console.log("lib/layout", 'onRenderDone', $context);
		return render($context);
	}


	app.$root
		.on('lib/layout:render', null, onRender)
		.on('lib/layout:render:done', null, onRenderDone)
		.on('lib/layout:renderBlock', null, onRenderBlock)
		.on('lib/layout:renderBlock:done', null, onRenderDone);


	return {
		render: render
	};

});