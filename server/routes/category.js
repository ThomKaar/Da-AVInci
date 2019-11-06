var express = require('express');
let CategoryController = require('../controllers/category');
var categoryRouter = express.Router();

/* Category Routes */
categoryRouter.get('/all', CategoryController.getAllCategoryItems);

module.exports = categoryRouter;