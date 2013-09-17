'use strict';

var crud = require('../crud');

exports.index = crud.indexAction('user');
exports.item = crud.itemAction('user');
exports.add = crud.addAction('user');
exports.del = crud.delAction('user');