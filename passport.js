'use strict';

var passport = require('passport'),
	TwitterStrategy = require('passport-twitter').Strategy;

passport.use(new TwitterStrategy({
		consumerKey: 'RCDJZrPGmkJoBBfncHddeQ',
		consumerSecret: 'V45ZUJXpAWboLdCk0blA80hZqomIZbCehLu2BC6BVn0',
		callbackURL: "http://gleam.butenko.me/auth/twitter/callback"
	},
	function (token, tokenSecret, profile, done) {
		console.log('token, tokenSecret, profile', token, tokenSecret, profile);
		done(null, profile);
//		User.findOrCreate(..., function (err, user) {
//			if (err) {
//				return done(err);
//			}
//			done(null, user);
//		});
	}
));

passport.serializeUser(function (user, done) {
	return done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	done(null, {
		id: id,
		name: 'test'
	});
	
//	User.findById(id, function (err, user) {
//		done(err, user);
//	});
});

exports.passport = passport;