const bcrypt = require('bcryptjs');

const User = require('../models/User');

exports.getHomePage = (req, res) => {
    res.render('index');
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
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user) {
                bcrypt.compare(req.body.password, user.password)
                    .then((same) => {
                        if (same) {
                            req.session.currentUser = user;
                            var url=req.session.redirectTo || '/';
                            delete req.session.redirectTo;
                            return res.redirect(url);
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