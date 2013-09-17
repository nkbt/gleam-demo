'use strict';

var crud = require('../crud');

exports.index = crud.index('chat');
exports.item = crud.item('chat');
exports.add = crud.add('chat');
exports.del = crud.del('chat');