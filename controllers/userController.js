const User = require('../models/User');
const Entry = require('../models/Entry');

exports.getUserPage = (req, res) => {
    const username = req.params.username;
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
};

exports.getEntriesByUser = (req, res) => {

};

exports.updateUser = (req, res) => {

};

exports.deleteUser = (req, res) => {

};