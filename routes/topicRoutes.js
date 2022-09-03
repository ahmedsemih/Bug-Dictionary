const express = require('express');
const router = express.Router();

const {getAllTopics, getTopicById, addTopic, updateTopic} = require('../controllers/topicController');
const isAuthenticated=require('../middlewares/isAuthenticated');
const isAuthorized=require('../middlewares/isAuthorized');

router.route('/').get(getAllTopics);
router.route('/').post(isAuthenticated,addTopic);

router.route('/:id').get(getTopicById);
router.route('/:id').put(isAuthenticated,isAuthorized,updateTopic);

module.exports = router;