var express = require('express');
let ItemController = require('../controllers/items');
var itemRouter = express.Router();

/* Item Routes */
itemRouter.get('/:id', ItemController.getItemByIdReq);
itemRouter.get('/top/title', ItemController.getItemTitle);
itemRouter.get('/art/:content', ItemController.getItemByContent);
itemRouter.get('/art/:content/:label', ItemController.getItemByContentAndLabel);
itemRouter.post('/create', ItemController.createItem);
itemRouter.put('/:id', ItemController.updateItemById);
itemRouter.delete('/:id', ItemController.deleteItem);


module.exports = itemRouter;