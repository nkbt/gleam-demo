"use strict";
/*global define: false, google: false */
/*jshint browser:true */
/*jslint browser:true */


define(
	'lib/map',
	[
		'module', 'dom', 'underscore', 'lib/cookie', 'geo', 'lib/app',
		'vendor/require/async!http://maps.googleapis.com/maps/api/js?sensor=true!callback'
	],
	function (module, $, _, cookie, geo, app) {


		var config = _.defaults(module.config(), {
				lat: 0,
				lng: 0,
				zoom: 10
			}),
			globalGoogleMap = null,
			loading = false,
			delegates = [];

		function initMap($element, lat, lng) {


			var zoom = parseInt(cookie.get('zoom') || 10, 10),
				mapOptions = {
					zoom: zoom,
					center: new google.maps.LatLng(lat, lng),
					mapTypeId: google.maps.MapTypeId.ROADMAP
				};

			globalGoogleMap = new google.maps.Map($element.get(0), mapOptions);

			$element.trigger('lib/map:init:done', [globalGoogleMap]);


		}


		function init(element) {
			var $element = $(element),
				lat = parseFloat(cookie.get('lat') || 0),
				lng = parseFloat(cookie.get('lng') || 0);

			if (lat && lng || !geo.init()) {
				return initMap($element, lat, lng);
			}

			return geo.getCurrentPosition(function (position) {
				lat = position && position.coords && position.coords.latitude || 0;
				lng = position && position.coords && position.coords.longitude || 0;
				return initMap($element, lat, lng);
			}, function () {
				return initMap($element, lat, lng);
			});
		}

		function onInit(event) {
			var $element = $(event.target);
			return init($element);
		}

		function onInitDone(event, googleMap) {
			var $element = $(event.target);
			delegates.forEach(function (delegate) {
				return delegate.call(null, googleMap);
			});
			delegates = [];
			return $element;
		}

		function mapReady(callback) {
			if (globalGoogleMap) {
				return callback && callback.call(null, globalGoogleMap);
			}
			if (callback) {
				delegates.push(callback);
			}
			return loading;
		}


		app.$root
			.on('lib/map:init', null, onInit)
			.on('lib/map:init:done', null, onInitDone)
		;

		return mapReady;
	}
);

