'use strict';

var crud = require('../crud');

exports.index = crud.indexAction('chat/message');
exports.item = crud.itemAction('chat/message');
exports.add = crud.addAction('chat/message');
exports.del = crud.delAction('chat/message');