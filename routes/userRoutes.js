const express = require('express');
const router = express.Router();

const { getUserPage, getEntriesByUser, updateUser, deleteUser } = require('../controllers/userController');

router.route('/').get();

router.route('/:username').get(getUserPage);
router.route('/:username').put(updateUser);
router.route('/:username').delete(deleteUser);

router.route('/:username/entries').get(getEntriesByUser);

module.exports = router;