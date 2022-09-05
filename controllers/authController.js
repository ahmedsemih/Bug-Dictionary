const bcrypt = require('bcryptjs');

const sequelize=require('../utils/database');
const User = require('../models/User');
const Topic = require('../models/Topic');
const Entry = require('../models/Entry');

exports.getHomePage = async (req, res) => {
    if (req.params.id !== 'favicon.ico') {
        const page = req.query.page - 1 || 0;
        const entryArray = [];
        const topicArray = [];
        const result = await Topic.findAndCountAll({ offset: 10 * page, limit: 10, where: { status: true } });
        for (let i = 0; i < result.rows.length; i++) {
            const entries = await Entry.findAll({ 
                limit: 1, 
                where: { TopicId: result.rows[i].dataValues.id }, 
                include: Topic, 
                order: [[sequelize.literal(`(SELECT COUNT("like") FROM "Entries" WHERE "TopicId"=${result.rows[i].dataValues.id})`), 'DESC']] });
            entries.length > 0 && entryArray.push(entries[0].dataValues);
            entries.length > 0 && topicArray.push(result.rows[i]);
        }
        return res.render('index', { topics: topicArray, entries: entryArray, currentPage: page + 1, totalCount: result.count, categoryId: req.params.id });
    };
};

exports.getLoginPage = (req, res) => {
    res.render('login', { msg: "" });
};

exports.getSignUpPage = (req, res) => {
    res.render('signup', { msg: "", usernameError: "", passwordError: "", emailError: "" });
};

exports.createAccount = (req, res) => {

    User.create({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    }).then(() => {
        return res.redirect('/login');
    }).catch((err) => {
        var usernameError = "";
        var passwordError = "";
        var emailError = "";
        var msg = "";

        err.errors.forEach((e) => {
            if (e.path === 'username') {
                e.validatorKey === 'not_unique' ? msg += ' This username already in use.' : usernameError = e.message;
            } else if (e.path === 'email') {
                e.validatorKey === 'not_unique' ? msg += ' This email already in use.' : emailError = e.message;
            } else {
                passwordError = e.message;
            }
        });
        return res.render('signup', { msg, usernameError, passwordError, emailError });
    });
};

exports.Login = (req, res) => {
    User.findOne({ where: { email: req.body.email } })
        .then((user) => {
            if (user) {
                bcrypt.compare(req.body.password, user.password)
                    .then((same) => {
                        if (same) {
                            if (user.role !== 'banned') {
                                req.session.currentUser = user;
                                var url = req.session.redirectTo || '/';
                                delete req.session.redirectTo;
                                return res.redirect(url);
                            } else {
                                return res.render('login', { msg: 'Your account has been banned.' });
                            }
                        } else {
                            return res.render('login', { msg: 'Wrong email or password.' });
                        }
                    }).catch(err => console.log(err));
            } else {
                return res.render('login', { msg: 'Wrong email or password.' });
            }
        }).catch(err => console.log(err));
};

exports.Logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
};