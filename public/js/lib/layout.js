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
				.trigger('lib/layout:render');
		});
	}


	function render(element) {
		var $element = $(element).length && $(element) || app.element;
		_.each($element.find('.lib_layout[data-lib_layout-template]:not([data-lib_layout-rendered])'), initTemplate);
	}


	function onRender(event) {
		return render($(event.target).closest('.lib_layout'));
	}


	function onRenderBlock(event, blockName, content) {
		var $element = $(event.target).closest('.lib_layout');
		$element.find('.lib_layout[data-lib_layout-block="' + blockName + '"]')
			.clean()
			.append(content)
			.trigger('lib/layout:renderBlock:done', [blockName]);
	}

	app
		.on('lib/layout:render', null, onRender)
		.on('lib/layout:renderBlock', null, onRenderBlock);


	return {
		render: render
	};

});