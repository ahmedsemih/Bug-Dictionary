const User = require('../models/User');
const Entry = require('../models/Entry');
const Topic = require('../models/Topic');

exports.getUserPage = (req, res) => {
    const username = req.params.username.trim();
    if (username !== 'favicon.ico') {
        Entry.findAll({ where: { UserUsername: username } })
            .then((entry) => {
                User.findByPk(username)
                    .then((user) => {
                        var rank = 'Trainee';
                        var point = user.dataValues.point;
                        if (point > 100 && point <= 500) {
                            rank = 'Junior';
                        } else if (point > 500) {
                            rank = 'Senior';
                        }
                        return res.render('profile', { username, user, point, rank, entryCount: entry.length });
                    }).catch((error) => console.log(error));
            }).catch((error) => console.log(error))
    }
};

exports.getEntriesByUser = (req, res) => {
    const username = req.params.username.trim();
    if (username !== 'favicon.ico') {
        Entry.findAll({ include: Topic, where: { UserUsername: username } })
            .then((entries) => {
                var liked = false;
                var disliked = false;
                entries.forEach((entry) => {
                    liked = entry.like.includes(username);
                    disliked = entry.dislike.includes(username);
                });
                return res.render('user-entries', { entries, username, liked, disliked });
            }).catch((error) => console.log(error));
    }
};

exports.updateUser = (req, res) => {

};

exports.deleteUser = (req, res) => {

};