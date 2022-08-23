const express = require('express');
const router = express.Router();

const { getHomePage, getSignUpPage, getLoginPage, createAccount, Login, Logout } = require('../controllers/authController');

router.route('/').get(getHomePage);

router.route('/signup').get(getSignUpPage);
router.route('/signup').post(createAccount);

router.route('/login').get(getLoginPage);
router.route('/login').post(Login);

router.route('/logout').get(Logout);

module.exports = router;