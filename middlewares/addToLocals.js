const moment = require('moment');
const Category = require('../models/Category');

module.exports = async (req, res, next) => {
    res.locals.moment = moment;
    res.locals.currentPath = await req.path;
    res.locals.currentUser = await req.session.currentUser || "";
    res.locals.categories = await Category.findAll({where:{status:true}});
    next();
};