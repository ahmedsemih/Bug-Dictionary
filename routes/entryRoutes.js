const express = require('express');
const router = express.Router();

const {getEntry, addEntry, updateEntry, deleteEntry, onClickLike, onClickDislike}=require('../controllers/entryController');

router.route('/').post(addEntry);
router.route('/:id').get(getEntry);
router.route('/:id').put(updateEntry);
router.route('/:id').delete(deleteEntry);

router.route('/:id/like/:username').get(onClickLike);
router.route('/:id/dislike/:username').get(onClickDislike);

module.exports = router;