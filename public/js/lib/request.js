"use strict";
/*jshint browser:true */
/*jslint browser:true */


define(
	'lib/request',
	[
		'dom', 'underscore', 'lib/app', 'lib/messenger', 'entity/from-json'
	],
	function ($, _, app, messenger, fromJson) {


		function successHandler(responseEntity, callback) {
			var error = _(responseEntity.get('message')).reduce(function (result, messageEntity) {
				var type = messageEntity.isError && messenger.TYPE_ERROR || messenger.TYPE_MESSAGE;
				app.$root.trigger('lib/messenger:show', [type, messageEntity.text]);
				return result === null && messageEntity.isError && messageEntity.text || null;
			}, null);


			// For now we use only one payloadEntity per response
			return callback(error && new Error(error) || null, responseEntity.get('payload').shift());
		}


		function parseResponse(text, callback) {
			return fromJson(text, function (error, responseEntity) {
				if (error === null) {
					successHandler(responseEntity, callback);
				} else {
					veryBadErrorHandler(error, callback);
				}
			});
		}


		function errorHandler(response, callback) {
			if (!response.responseText) {
				return veryBadErrorHandler(new Error("OMFG!!!!!11 Very bad error happened, report was sent, developers will be punished."), callback);
			}
			return parseResponse(response.responseText, callback);
		}


		function veryBadErrorHandler(error, callback) {
			app.$root.trigger('lib/messenger:show', [messenger.TYPE_ERROR, error.message]);
			return callback(error);
		}


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
						return parseResponse(json, callback);
					},
					error: function (responseText) {
						return errorHandler(responseText, callback);
					}
				});
			}
		};

	}
);