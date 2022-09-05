const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const sequelize=require('../utils/database');
const Topic = require('../models/Topic');
const Category = require('../models/Category');
const User = require('../models/User');
const Entry = require('../models/Entry');

exports.getSearch = async (req, res) => {
    if (req.query.q !== 'favicon.ico') {
        const entryArray = [];
        const topicArray = [];

        const category=await Category.findOne({ where: { name: { [Op.iLike]: `%${req.query.q}%` } } });
        if(category){
            return res.redirect(`/categories/${category.id}`);
        }
        const user=await User.findOne({ where: { username: { [Op.iLike]: `%${req.query.q}%` } } });
        if(user){
            return res.redirect(`/users/${user.username}`);
        }

        const result = await Topic.findAndCountAll({ where: { name: { [Op.iLike]: `%${req.query.q}%` } } });
        if (result.count > 1) {
            for (let i = 0; i < result.rows.length; i++) {
                const entries = await Entry.findAll({ 
                    limit: 1,
                    where: { TopicId: result.rows[i].dataValues.id }, 
                    include: Topic, 
                    order: [[sequelize.literal(`(SELECT COUNT("like") FROM "Entries" WHERE "TopicId"=${result.rows[i].dataValues.id})`), 'DESC']] });
                entries.length > 0 && entryArray.push(entries[0].dataValues);
                entries.length > 0 && topicArray.push(result.rows[i]);
            }
            return res.render('search', { topics: topicArray, entries: entryArray });
        } else if (result.count == 1) {
            return res.redirect(`/topics/${result.rows[0].dataValues.id}`);
        } else {
            return res.render('search', { topics: [], entries: [] });
        }
    }
};