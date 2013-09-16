"use strict";

define('lib/cookie', ['lib/app'], function (app) {

	function cookieSet(name, value, days, domain, path) {

		var cookieData = [[name, value].join('=')], date;

		if (days) {
			date = new Date();
			date.setTime(date.getTime() + (days * 86400000)); // 24 * 60 * 60 * 1000
			cookieData.push(["expires", date.toGMTString()].join('='));
		}
		if (domain) {
			cookieData.push(["domain", domain].join('='));
		}
		if (!path) {
			path = '/';
		}
		cookieData.push(["path", path].join('='));
		document.cookie = cookieData.join(';');
	}

	function cookieGet(name) {

		var nameMatch = name + "=",
			cookies = document.cookie.split(';'),
			cookie,
			i;

		for (i = 0; i < cookies.length; i = i + 1) {
			cookie = cookies[i];
			while (cookie.charAt(0) === ' ') {
				cookie = cookie.substring(1, cookie.length);
			}
			if (cookie.indexOf(nameMatch) === 0) {
				return cookie.substring(nameMatch.length, cookie.length);
			}
		}
		return null;
	}

	function cookieDelete(name, domain, path) {

		cookieSet(name, "", -1, domain, path);
	}

	app.$root
		.on('util/cookie:set', function (event, name, value, days, domain, path) {
			cookieSet(name, value, days, domain, path);
		})
		.on('util/cookie:get', function (event, name, callback) {
			callback(cookieGet(name));
		})
		.on('util/cookie:delete', function (event, name) {
			cookieDelete(name);
		});

	return {
		set: cookieSet,
		get: cookieGet,
		delete: cookieDelete
	};
});