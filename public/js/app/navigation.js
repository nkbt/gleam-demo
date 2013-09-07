"use strict";
/*jshint browser:true */
/*jslint browser:true */

define('app/navigation', ['dom', 'underscore', 'plugin/text!/templates/navigation.html'], function ($, _, template) {
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

	$body.on('app/navigation:init', '.jsDispatcher', onInit);
//	$body.on('popstate', function(event) {
//		console.log(event);
//	});

	return {
		init: init
	}

});