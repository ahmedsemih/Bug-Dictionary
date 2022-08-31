const express = require('express');
const router = express.Router();

const {getEntry, addEntry, updateEntry, deleteEntry, onClickLike, onClickDislike, reportEntry, deleteReport}=require('../controllers/entryController');

router.route('/').post(addEntry);
router.route('/:id').get(getEntry);
router.route('/:id').put(updateEntry);
router.route('/:id').delete(deleteEntry);

router.route('/:id/like/:username').get(onClickLike);
router.route('/:id/dislike/:username').get(onClickDislike);

router.route('/:id/report').post(reportEntry);
router.route('/:id/report').delete(deleteReport);

module.exports = router;