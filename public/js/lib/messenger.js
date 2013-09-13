"use strict";
/*jshint browser:true */
/*jslint browser:true */


define('lib/messenger', ['module', 'dom', 'underscore', 'lib/app'], function (module, $, _, app) {

	var config = _.defaults(module.config(), {
		hideTimeout: 2000,
		types: {
			TYPE_ERROR: 'error',
			TYPE_MESSAGE: 'message'
		}
	});

	function show(type, text) {
		if (!_.findWhere(config.types, type)) {
			return console.warn('lib/messenger', 'unknown type', type);
		}

		return app.template('lib/messenger/template', function (template) {
			var $element = app.$root.find('.lib_messenger');
			if (!$element.length) {
				$element = $(template);
				$element.appendTo(app.$root);
			}

			return app.template(['lib/messenger', type].join('/'), function (messageTemplate) {
				var $message = $(messageTemplate);
				$message.find('.lib_messenger-text').html(text);
				return $message
					.prependTo($element)
					.trigger('lib/messenger:show:done', [type, text])
					.trigger('lib/messenger:hideDelayed');
			});

		});
	}


	function onShow(event, type, text) {
		return show(type, text);
	}


	function clearTimer(message) {
		var $message = $(message),
			timer = $message.data('lib_messenger-hideTimer');
		if (timer) {
			window.clearTimeout(timer);
			timer = null;
		}
		$message.data('lib_messenger-hideTimer', timer);
	}


	function hide(message) {
		if (_.isEmpty(message)) {
			return _.each(app.$root.find('.lib_messenger-message'), hider);
		}

		var $message = $(message).closest('.lib_messenger-message');
		clearTimer($message);
		return $message.remove();
	}

	function hider(message) {
		return function () {
			hide(message);
		};
	}

	function onHideDelayed(event) {
		var $message = $(event.target).closest('.lib_messenger-message'),
			hideTimeout = parseInt(parseInt($message.data('lib_messenger-autohide'), 10) || config.hideTimeout, 10);
		clearTimer($message);
		return $message.data('lib_messenger-hideTimeout', window.setTimeout(hider($message), hideTimeout));
	}

	function onClick(event) {
		var $message = $(event.target).closest('.lib_messenger-message');
		clearTimer($message);
		return hide($message);
	}

	function onMouseover(event) {
		var $message = $(event.target).closest('.lib_messenger-message');
		return clearTimer($message);
	}

	app.$root
		.on('lib/messenger:show', null, onShow)
		.on('click', '.lib_messenger .lib_messenger-message', onClick)
		.on(
			'mouseover',
			'.lib_messenger .lib_messenger-message[data-lib_messenger-autohide]',
			onMouseover
		)
		.on(
			'mouseout',
			'.lib_messenger .lib_messenger-message[data-lib_messenger-autohide]',
			onHideDelayed
		)
		.on(
			'lib/messenger:hideDelayed',
			'.lib_messenger .lib_messenger-message[data-lib_messenger-autohide]',
			onHideDelayed
		);


	return config.types;
});
