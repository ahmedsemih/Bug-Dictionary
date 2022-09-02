module.exports = (req, res, next) => {
    if (req.session.currentUser && req.session.currentUser.role !== 'admin') {
        return res.redirect('/');
    }
    next();
};