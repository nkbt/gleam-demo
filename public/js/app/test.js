"use strict";
/*jshint browser:true */
/*jslint browser:true */


define('app/test', ['dom', 'underscore', 'lib/request'], function ($, _, request) {

	var table = '<table data-component="test-table" style="width: 100%;" border="1">'
		+ '<thead><tr><th>Name</th><th>Value</th><th>Created On</th></tr></thead>'
		+ '<tbody></tbody>'
		+ '</table>';

	var tableRow = '<tr>'
		+ '<td data-bind="name"></td>'
		+ '<td data-bind="value"></td>'
		+ '<td data-bind="createdOn"></td>'
		+ '</tr>';


	var $body = $(document.body),
		runClickHandler,
		runFailClickHandler,
		runMessageClickHandler,
		run404ClickHandler;

	runClickHandler = function (event) {
		var $element = $(event.target).closest('[data-component="test"]');
		console.log("$element", $element);
		request.get('/test', {}, function (payloadEntity) {
			if (_.isUndefined(payloadEntity)) {
				return;
			}
			var $table = $(table).clone(),
				$tbody = $table.find('tbody');
			_(payloadEntity.get('data')).each(function (adEntity) {
				var $tableRow = $(tableRow).clone();
				_(adEntity.get()).each(function (value, property) {
					$tableRow.find('[data-bind="' + property + '"]').html(value);
				});
				$tableRow.appendTo($tbody); //.attr('data-bind', "test:" + adEntity.get('id'));
			});

			$element.find('[data-component="test-table-container"]').html($table);

		});
	};

	runFailClickHandler = function () {
		request.get('/test/fail', {}, function () {
		});
	};

	run404ClickHandler = function () {
		request.get('/test/404', {}, function () {
		});
	};

	runMessageClickHandler = function () {
		request.get('/test/message', {}, function () {
		});
	};

	$body.on('click', '[data-component="test-run"]', runClickHandler);
	$body.on('click', '[data-component="test-run-fail"]', runFailClickHandler);
	$body.on('click', '[data-component="test-run-404"]', run404ClickHandler);
	$body.on('click', '[data-component="test-run-message"]', runMessageClickHandler);
});