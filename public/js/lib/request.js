"use strict";
/*jshint browser:true */
/*jslint browser:true */


define('lib/request', ['dom', 'underscore', 'entity/from-json', 'entity/response/message'], function ($, _, fromJson, MessageEntity) {

	var $body = $(document.body),
		successHandler,
		errorHandler,
		veryBadErrorHandler;

	successHandler = function (responseEntity, callback) {
		_(responseEntity.get('message')).each(function (messageEntity) {
			$body.trigger('messenger:show', [messageEntity]);
		});
		// For now we use only one payloadEntity per response
		return callback(responseEntity.get('payload')[0]);
	};

	errorHandler = function (response, callback) {
		if (!response.responseText) {
			return veryBadErrorHandler();
		}
		return fromJson(response.responseText, function (error, responseEntity) {
			if (error === null) {
				successHandler(responseEntity, callback);
			} else {
				veryBadErrorHandler(error);
			}
		});
	};

	veryBadErrorHandler = function (error) {
		var text;
		if (!_.isEmpty(error)) {
			// TODO: log this error to log-server
			text = error instanceof Error ? error.message : error;
			console.log(text);
		}
		$body.trigger('messenger:show', [new MessageEntity({
			isMessage: true,
			text: "OMFG!!!!!11 Very bad error happened, report was sent, developers will be punished."
		})]);
	};

	return {
		get: function (url, data, callback) {
			data = data || {};
			data.json = 1;
			$.ajax({
				url: url,
				type: 'GET',
				data: data,
				dataType: 'text',
				success: function (json) {
					return fromJson(json, function (error, responseEntity) {
						if (error === null) {
							successHandler(responseEntity, callback);
						} else {
							veryBadErrorHandler(error);
						}
					});
				},
				error: function (responseText) {
					return errorHandler(responseText, callback);
				}
			});
		}
	};

});