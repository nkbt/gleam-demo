"use strict";
/*jshint browser:true */
/*jslint browser:true */

define('lib/sidebar', ['dom'], function ($) {
	var $body = $(document.body);
	
	
	function toggleOffcanvas(event) {
		var $element = $(event.target).closest('.jsSidebar');
		$element.toggleClass('active');
	}
	$body.on('click', '.jsSidebar .jsSidebar-toggle', toggleOffcanvas);
});