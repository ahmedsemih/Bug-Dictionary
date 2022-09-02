const User = require('../models/User');
const Entry = require('../models/Entry');
const Topic = require('../models/Topic');
const Report = require('../models/Report');

exports.getUserPage = (req, res) => {
    const username=req.params.username;
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
    const username=req.params.username;
    if (username !== 'favicon.ico') {
        Entry.findAll({ include: Topic, where: { UserUsername: username } })
            .then((entries) => {
                var liked = false;
                var disliked = false;
                entries.forEach((entry) => {
                    liked = entry.like.includes(res.locals.currentUser.username);
                    disliked = entry.dislike.includes(res.locals.currentUser.username);
                });
                return res.render('user-entries', { entries, username, liked, disliked });
            }).catch((error) => console.log(error));
    }
};

exports.getAdminPanel = (req,res)=>{
    if (req.params.username !== 'favicon.ico') {
        res.render('admin',{username:res.locals.currentUser.username});
    }
};

exports.getReportsPage = (req,res)=>{
    if (req.params.username !== 'favicon.ico' && req.query.page !== 'favicon.ico') {
        const page = req.query.page - 1 || 0;
        Report.findAndCountAll({offset: 10 * page, limit: 10,include:Entry,order:[['createdAt','DESC']]})
        .then((result)=>{
            res.render('reports',{username:res.locals.currentUser.username,report:result.rows,currentPage: page + 1, totalCount: result.count});
        }).catch((error)=>console.log(error));
    }
};

exports.updateUser = (req, res) => {

};

exports.deleteUser = (req, res) => {

};