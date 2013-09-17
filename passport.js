'use strict';

var crud = require('./crud'),
	gleam = require('gleam'),
	passport = require('passport'),
	TwitterStrategy = require('passport-twitter').Strategy;

passport.use(new TwitterStrategy({
		consumerKey: 'RCDJZrPGmkJoBBfncHddeQ',
		consumerSecret: 'V45ZUJXpAWboLdCk0blA80hZqomIZbCehLu2BC6BVn0',
		callbackURL: "http://gleam.butenko.me/auth/twitter/callback"
	},
	function (token, tokenSecret, profile, done) {
		crud.item('user', profile.id, function (error, user) {
			if (!error && user) {
				return done(null, user);
			}

			var photo = profile.photos.shift(),
				userData = {
				id: profile.id,
				name: profile.displayName,
				avatar: photo && photo.value
			};

			return crud.add('user', userData, done);
		});
	}
));

passport.serializeUser(function (user, done) {
	console.log('serializeUser', 'user', typeof(user), user);
	return done(null, JSON.stringify(user));
});

passport.deserializeUser(function (json, done) {
	console.log('deserializeUser', 'json', typeof(json), gleam.fromJson(json));
	done(null, gleam.fromJson(json));
});

exports.passport = passport;
