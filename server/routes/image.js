var express = require('express');
let ImageController = require('../controllers/image');
var imageRouter = express.Router();

/* Item Routes */
imageRouter.get('/collection/:ids', ImageController.getImagesById); 

module.exports = imageRouter;