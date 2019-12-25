var express = require('express');
let ImageController = require('../controllers/image');
var imageRouter = express.Router();

/* Image Routes */
imageRouter.get('/collection/:ids', ImageController.getImagesById); 
imageRouter.get('/default', ImageController.getDefaultImages);
imageRouter.get('/all', ImageController.getAllImages);
imageRouter.post('/upload', ImageController.uploadImage);

module.exports = imageRouter;