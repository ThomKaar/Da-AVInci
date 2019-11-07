var express = require('express');
let ItemController = require('../controllers/items');
var itemRouter = express.Router();

/* Item Routes */
itemRouter.get('/:id', ItemController.getItemByIdReq);
itemRouter.get('/top/title', ItemController.getItemTitle);

module.exports = itemRouter;