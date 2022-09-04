module.exports = (req, res, next) => {
    if (!req.session.currentUser) {
        req.session.redirectTo=req.headers.referer || req.headers.referrer;
        return res.redirect('/login');
    }
    next();
};