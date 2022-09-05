const sequelize=require('../utils/database');
const Category = require('../models/Category');
const Topic = require('../models/Topic');
const Entry = require('../models/Entry');

exports.getCategoryById = async (req, res) => {
    if (req.params.id !== 'favicon.ico') {
        const page = req.query.page - 1 || 0;
        const entryArray = [];
        const topicArray = [];
        const result= await Topic.findAndCountAll({offset: 10 * page, limit: 10, where: { CategoryId: req.params.id,status:true } });
        for(let i=0; i<result.rows.length;i++){
            const entries = await Entry.findAll({ limit:1, where: { TopicId: result.rows[i].dataValues.id }, include: Topic, order: [['like', 'DESC']] });
            entries.length > 0 && entryArray.push(entries[0].dataValues);
            entries.length > 0 && topicArray.push(result.rows[i]);
        }
        return res.render('category', { topics:topicArray, entries:entryArray,currentPage: page + 1, totalCount: result.count,categoryId:req.params.id });
    };
}

exports.addCategory = (req, res) => {
    Category.create({
        name:req.body.categoryName,
        status:req.body.status,
        createdAt:Date.now()
    }).then(() => {
        res.redirect('back');
    }).catch(error => console.log(error));
};

exports.updateCategory = (req, res) => {
    Category.update(req.body, { where: { id: req.params.id } })
        .then(() => {
            res.redirect('back');
        }).catch(error => console.log(error));
};