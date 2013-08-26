"use strict";
/*jshint browser:true */
/*jslint browser:true */


define('lib/messenger', ['dom', 'underscore'], function ($, _) {
	var $body = $(document.body);
	var template = '<div data-component="messenger" style="position:absolute; right: 10px; top: 10px; padding: 10px 30px 10px 10px; min-width: 200px; max-width: 400px; min-height: 50px; color: #f1f2f4; background: #333; border-radius: 10px;">'
		+ '<a data-component="messenger-close" href="javascript:void(0);" style="position:absolute; top: 3px; right: 3px; width: 20px; height: 20px; font-size: 14px; line-height: 20px; text-align:center; text-transform: uppercase;color: #fff; font-weight:bold; font-family:Arial, helvetica; text-decoration:none;background: #f33; border-radius: 10px;">X</a>'
		+ '<div data-component="messenger-container"></div>'
		+ '</div>';
	var errorTemplate = '<p style="color: #faa"></p>';
	var messageTemplate = '<p></p>';

	$body.on('click', '[data-component="messenger"] [data-component="messenger-close"]', function (event) {
		$(event.target).closest('[data-component="messenger"]').remove();
	});

	$body.on('messenger:removeMessage', function (event) {
		var $message = $(event.target),
			$container = $message.closest('[data-component="messenger-container"]');
		$message.remove();
		if (!$container.find('p').length) {
			$container.closest('[data-component="messenger"]').remove();
		}
	});

	$body.on('messenger:show', function (event, messageEntity) {
		var $container = $('[data-component="messenger"]'),
			$message = $(messageEntity.isError ? errorTemplate : messageTemplate).clone().html(messageEntity.text);

		if (!$container.length) {
			$container = $body.append($(template).clone());
		}
		$container
			.find('[data-component="messenger-container"]')
			.append($message);

		setTimeout(function () {
			$message.trigger('messenger:removeMessage');
		}, 2000);
	});
});