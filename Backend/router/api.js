const express = require('express');
const router = express.Router();
const userController = require('../controller/userController')

// UserAuthentication Router 
router.post('/registerUser' , userController.registerUser);
router.post('/loginUser' , userController.loginUser);


module.exports = router;