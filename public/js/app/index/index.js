"use strict";
/*jshint browser:true */
/*jslint browser:true */

define('app/index/index', ['dom', 'underscore', 'plugin/text!/templates/index/index.html'], function ($, _, template) {
	var $body = $(document.body);


	function init($element, callback) {
		$element.html(template);
		_.isFunction(callback) && callback($element);
		$element.trigger('lib/dispatcher:init')
	}

	function onInit(event) {
		var $element = $(event.target).closest('.jsDispatcher');
		return init($element);
	}

	$body.on('app/index/index:init', '.jsDispatcher', onInit);

	return {
		init: init
	}

});