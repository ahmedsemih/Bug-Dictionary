const Topic = require('../models/Topic');
const Entry = require('../models/Entry');

exports.getAllTopics = (req, res) => {

};

exports.getTopicById = (req, res) => {
    if (req.params.id !== 'favicon.ico' && req.query.page !== 'favicon.ico') {
        const page = req.query.page - 1 || 0;
        Topic.findByPk(req.params.id)
            .then((topic) => {
                Entry.findAndCountAll({ offset: 10 * page, limit: 10, where: { TopicId: req.params.id }, order: [['like', 'DESC']] })
                    .then((result) => {
                        return res.render('topic', { topic, entries: result.rows, currentPage: page + 1, totalCount: result.count });
                    }).catch(error => console.log(error));
            }).catch((error) => console.log(error));
    }
};

exports.addTopic = (req, res) => {

};

exports.updateTopic = (req, res) => {

};

exports.deleteTopic = (req, res) => {

};