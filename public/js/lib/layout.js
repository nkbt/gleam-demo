"use strict";

define('lib/layout', ['dom', 'underscore', 'lib/app'], function ($, _, app) {

	function initTemplate(element) {
		console.log('lib/layout', "initTemplate", element);
		var $element = $(element),
			templateName = $element.data('lib_layout-template');

		$element.attr('data-lib_layout-rendered', true);
		
		return app.template(templateName, function (template) {
			$element
				.html(template)
				.trigger('lib/layout:render', templateName);
		});
	}


	function render(element) {
		var $element = $(element).length && $(element) || app.$root;
		_.each($element.find('.lib_layout[data-lib_layout-template]:not([data-lib_layout-rendered])'), initTemplate);
	}


	function onRender(event) {
		return render($(event.target).closest('.lib_layout'));
	}


	function onRenderBlock(event, blockName, content) {
		var $element = $(event.target).closest('.lib_layout'),
			$content = $($.parseHTML(content.trim()));

		$element.attr('data-lib_layout-rendered', null);
		$element.find('.lib_layout[data-lib_layout-block="' + blockName + '"]').html($content);
		$content.trigger('lib/layout:renderBlock:done', [blockName]);
	}

	app.$root
		.on('lib/layout:render', null, onRender)
		.on('lib/layout:renderBlock', null, onRenderBlock)
		.on('lib/layout:renderBlock:done', '.lib_layout:not([data-lib_layout-rendered])', onRender);
	


	return {
		render: render
	};

});