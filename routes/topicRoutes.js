const express = require('express');
const router = express.Router();

const {getAllTopics, getTopicById, addTopic, updateTopic, deleteTopic} = require('../controllers/topicController');

router.route('/').get(getAllTopics);
router.route('/').post(addTopic);

router.route('/:id').get(getTopicById);
router.route('/:id').put(updateTopic);
router.route('/:id').delete(deleteTopic);

module.exports = router;