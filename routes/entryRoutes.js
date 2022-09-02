const express = require('express');
const router = express.Router();

const {getEntry, addEntry, updateEntry, deleteEntry, onClickLike, onClickDislike, reportEntry, deleteReport}=require('../controllers/entryController');
const isAuthenticated=require('../middlewares/isAuthenticated');
const isAuthorized=require('../middlewares/isAuthorized');

router.route('/').post(isAuthenticated,addEntry);
router.route('/:id').get(getEntry);
router.route('/:id').put(isAuthenticated,updateEntry);
router.route('/:id').delete(isAuthenticated,deleteEntry);

router.route('/:id/like/:username').get(isAuthenticated,onClickLike);
router.route('/:id/dislike/:username').get(isAuthenticated,onClickDislike);

router.route('/:id/report').post(isAuthenticated,reportEntry);
router.route('/:id/report').delete(isAuthenticated,isAuthorized,deleteReport);

module.exports = router;