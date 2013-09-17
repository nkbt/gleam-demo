'use strict';

var crud = require('../crud');

exports.index = crud.index('user');
exports.item = crud.item('user');
exports.add = crud.add('user');
exports.del = crud.del('user');