module.exports = (req, res, next) => {
    if (req.session.currentUser) {
        req.session.redirectTo=req.url;
        return res.redirect('/login');
    }
    next();
};