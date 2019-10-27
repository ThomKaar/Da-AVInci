var express = require('express');
let AccountController = require('../controllers/account');
var accountRouter = express.Router();

/* Account Routes */
accountRouter.get('/username=:username', AccountController.getAccountByUser);
accountRouter.get('/id:=id', AccountController.getAccountById);

module.exports = router;