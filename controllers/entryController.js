const sequelize = require('../utils/database');
const Entry = require('../models/Entry');
const Topic = require('../models/Topic');
const User = require('../models/User');
const Report = require('../models/Report');

exports.getEntry = (req, res) => {
    if (req.params.id !== 'favicon.ico') {
        Entry.findByPk(req.params.id, { include: Topic })
            .then((entry) => {
                var liked = false;
                var disliked = false;
                liked = entry.like.includes(res.locals.currentUser.username);
                disliked = entry.dislike.includes(res.locals.currentUser.username);
                return res.render('entry', { entry, liked, disliked });
            }).catch((error) => console.log(error));
    }
};

exports.addEntry = (req, res) => {
    Entry.create({
        text: req.body.text,
        UserUsername: res.locals.currentUser.username,
        TopicId: req.body.topic,
        updatedAt: Date.now(),
        createdAt: Date.now(),
    })
        .then(() => {
            return res.redirect('back');
        }).catch((error) => console.log(error));
};

exports.updateEntry = (req, res) => {
    if (req.params.id !== 'favicon.ico') {
        Entry.update({ text: req.body.text }, { where: { id: req.params.id } })
            .then(() => {
                return res.redirect('back');
            }).catch((error) => console.log(error));
    }
};

exports.deleteEntry = (req, res) => {
    if (req.params.id !== 'favicon.ico') {
        Report.destroy({ where: { EntryId: req.params.id } })
            .then(() => {
                Entry.destroy({ where: { id: req.params.id } })
                    .then(() => {
                        res.redirect('back');
                    }).catch(error => console.log(error));
            }).catch((error) => console.log(error));
    }
};

exports.onClickLike = (req, res) => {
    if (req.params.id !== 'favicon.ico' && req.params.username !== 'favicon.ico') {
        Entry.findByPk(req.params.id)
            .then((entry) => {
                var liked = false;
                var disliked = false;
                entry.dislike !== null && entry.dislike.forEach((user) => {
                    if (user == req.params.username) {
                        disliked = true;
                    }
                });
                entry.like !== null && entry.like.forEach((user) => {
                    if (user == req.params.username) {
                        liked = true;
                    }
                });
                if (disliked) {
                    Entry.update({ 'dislike': sequelize.fn('array_remove', sequelize.col('dislike'), req.params.username) }, { where: { id: req.params.id } })
                        .then(() => {
                            User.increment({ point: 1 }, { where: { username: entry.UserUsername } })
                                .catch((error) => console.log(error));
                            Entry.update({ 'like': sequelize.fn('array_append', sequelize.col('like'), req.params.username) },
                                { where: { id: req.params.id } })
                                .then(() => {
                                    return res.redirect('back');
                                }).catch((error) => console.log(error));
                        }).catch((error) => console.log(error));
                } else if (liked) {
                    User.decrement({ point: 1 }, { where: { username: entry.UserUsername } })
                        .catch((error) => console.log(error));
                    Entry.update({ 'like': sequelize.fn('array_remove', sequelize.col('like'), req.params.username) }, { where: { id: req.params.id } })
                        .then(() => {
                            return res.redirect('back');
                        }).catch((error) => { console.log(error) });
                } else {
                    User.increment({ point: 1 }, { where: { username: entry.UserUsername } })
                        .catch((error) => console.log(error));
                    Entry.update({ 'like': sequelize.fn('array_append', sequelize.col('like'), req.params.username) }, { where: { id: req.params.id } })
                        .then(() => {
                            return res.redirect('back');
                        }).catch((error) => console.log(error));
                }
            }).catch((error) => console.log(error));
    }
};

exports.onClickDislike = (req, res) => {
    if (req.params.id !== 'favicon.ico' && req.params.username !== 'favicon.ico') {
        Entry.findByPk(req.params.id)
            .then((entry) => {
                var liked = false;
                var disliked = false;
                entry.like !== null && entry.like.forEach((user) => {
                    if (user == req.params.username) {
                        liked = true;
                    }
                });
                entry.dislike !== null && entry.dislike.forEach((user) => {
                    if (user == req.params.username) {
                        disliked = true;
                    }
                });

                if (liked) {
                    Entry.update({ 'like': sequelize.fn('array_remove', sequelize.col('like'), req.params.username) }, { where: { id: req.params.id } })
                        .then(() => {
                            User.decrement({ point: 1 }, { where: { username: entry.UserUsername } })
                                .catch((error) => console.log(error));
                            Entry.update({ 'dislike': sequelize.fn('array_append', sequelize.col('dislike'), req.params.username) }, { where: { id: req.params.id } })
                                .then(() => {
                                    return res.redirect('back');
                                }).catch(error => console.log(error));
                        }).catch(error => console.log(error));
                } else if (disliked) {
                    Entry.update({ 'dislike': sequelize.fn('array_remove', sequelize.col('dislike'), req.params.username) }, { where: { id: req.params.id } })
                        .then(() => {
                            return res.redirect('back');
                        }).catch(error => console.log(error));
                } else {
                    Entry.update({ 'dislike': sequelize.fn('array_append', sequelize.col('dislike'), req.params.username) }, { where: { id: req.params.id } })
                        .then(() => {
                            return res.redirect('back');
                        }).catch(error => console.log(error));
                }
            }).catch(error => console.log(error));
    }
};

exports.reportEntry = (req, res) => {
    if (req.params.id !== 'favicon.ico') {
        Report.findOne({ where: { EntryId: req.params.id } })
            .then((entry) => {
                if (!entry) {
                    Report.create({ EntryId: req.params.id, createdAt: Date.now() })
                        .then(() => {
                            return res.redirect('back');
                        }).catch((error) => console.log(error));
                }
                return res.redirect('back');
            }).catch((error) => { console.log(error) })
    }
};

exports.deleteReport = (req, res) => {
    if (req.params.id !== 'favicon.ico') {
        Report.destroy({ where: { EntryId: req.params.id } })
            .then(() => {
                res.redirect('back');
            }).catch((error) => console.log(error));
    }
};