var express = require('express');
let CategoryController = require('../controllers/category');
var categoryRouter = express.Router();

/* Category Routes */
categoryRouter.get('/all', CategoryController.getAllCategoryItems);

categoryRouter.put('/', CategoryController.updateCategory);

categoryRouter.delete('/:name', CategoryController.deleteCategory);


module.exports = categoryRouter;