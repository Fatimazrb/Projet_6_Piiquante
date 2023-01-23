const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const checkPassword = require('../middleware/check_password');
const checkEmail = require('../middleware/check_email');

router.post('/signup',checkPassword,checkEmail,userCtrl.signUp);
router.post('/login', userCtrl.login);

module.exports = router;

