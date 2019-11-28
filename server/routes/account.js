var express = require('express');
let AccountController = require('../controllers/account');
var accountRouter = express.Router();

/* Account Routes */
accountRouter.get('/username=:username', AccountController.getAccountByUser);
accountRouter.get('/id:=id', AccountController.getAccountById);

module.exports = router;



// Sweet

// Sweet are her hands
// For her fingertips curl into threads and cords of silk
// For her knuckles have been grazed with technicolor spots
// For her palms in the cool of morning lay open inviting mine
