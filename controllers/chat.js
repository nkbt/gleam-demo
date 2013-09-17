'use strict';

var crud = require('../crud');

exports.index = crud.indexAction('chat');
exports.item = crud.itemAction('chat');
exports.add = crud.addAction('chat');
exports.del = crud.delAction('chat');