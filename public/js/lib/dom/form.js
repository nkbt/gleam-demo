"use strict";


define('lib/dom/form', ['module', 'dom', 'underscore'], function (module, $, _) {
	var config = _.defaults(module.config(), {
		disabledClass: 'disabled',
		elementsSelector: 'input, textarea, select'
	});

	function values(form) {
		var $form = $(form),
			data = $form.serializeArray();
		return _.object(_.pluck(data, 'name'), _.pluck(data, 'value'));
	}

	function clear(form) {
		var $form = $(form);
		$form.find(config.elementsSelector).val(null);
		return $form;
	}

	function disable(form) {
		var $form = $(form);
		$form.addClass(config.disabledClass)
			.attr('data-lib_dom_form-disabled', true)
			.find(config.elementsSelector).prop('disabled', true);
		return $form;
	}

	function enable(form) {
		var $form = $(form);
		$form.removeClass(config.disabledClass)
			.attr('data-lib_dom_form-disabled', null)
			.find(config.elementsSelector).prop('disabled', false);
		return $form;
	}


	return {
		values: values,
		clear: clear,
		disable: disable,
		enable: enable
	};

});