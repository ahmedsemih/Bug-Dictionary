const express = require('express');
const router = express.Router();

const { getUserPage, getEntriesByUser, updateUser, getAdminPanel, getReportsPage } = require('../controllers/userController');
const isAuthenticated = require('../middlewares/isAuthenticated');
const isAuthorized = require('../middlewares/isAuthorized');

router.route('/').get();

router.route('/:username').get(getUserPage);
router.route('/:username').put(isAuthenticated,isAuthorized,updateUser);

router.route('/:username/admin').get(isAuthenticated,isAuthorized,getAdminPanel);
router.route('/:username/reports').get(isAuthenticated,isAuthorized,getReportsPage);

router.route('/:username/entries').get(getEntriesByUser);

module.exports = router;