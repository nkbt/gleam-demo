'use strict';

var _ = require('underscore');
/**
 * @see {AbstractEntity}
 * @mixes {AbstractEntity}
 */
var PayloadEntity = {

	/**
	 * @type {String}
	 */
	id: '',

	/**
	 * @type {Object|Array}
	 */
	data: null,

	/**
	 * @type {String}
	 */
	type: '',

	/**
	 * @private
	 */
	validateData: function (value) {
		return _.isObject(value) || _.isArray(value);
	},

	setData: function (value) {
		if (_.isArray(value) && !_.isEmpty(value) && !_.isUndefined(value[0].namespace)) {
			this.set({type: value[0].namespace});
		} else if (!_.isUndefined(value.namespace)) {
			this.set({type: value.namespace});
		}

		this.data = value;
	}
};

exports.Entity = PayloadEntity;
