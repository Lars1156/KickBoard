const express = require('express');
const router = express.Router();

const userServices = require('../services/userServices');

router.post('/register ' , userServices .register);
router.post('./login' , userServices.login)