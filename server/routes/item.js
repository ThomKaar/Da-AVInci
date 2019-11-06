var express = require('express');
let ItemController = require('../controllers/items');
var categoryRouter = express.Router();

/* Category Routes */
categoryRouter.get('/:id', ItemController.getItemByIdReq);

module.exports = categoryRouter;