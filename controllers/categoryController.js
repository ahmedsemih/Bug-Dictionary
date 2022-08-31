const Category = require('../models/Category');
const Topic = require('../models/Topic');
const Entry = require('../models/Entry');

exports.getAllCategories = (req, res) => {

};

exports.getCategoryById = async (req, res) => {
    if (req.params.id !== 'favicon.ico') {
        const page = req.query.page - 1 || 0;
        const entryArray = [];
        const result= await Topic.findAndCountAll({offset: 10 * page, limit: 10, where: { CategoryId: req.params.id } });
        for(let i=0; i<result.rows.length;i++){
            const entries = await Entry.findAll({ limit:1, where: { TopicId: result.rows[i].dataValues.id }, include: Topic, order: [['like', 'DESC']] });
            entryArray.push(entries[0].dataValues);
        }
        return res.render('category', { topics:result.rows, entries:entryArray,currentPage: page + 1, totalCount: result.count,categoryId:req.params.id });
    };
}

exports.addCategory = (req, res) => {
    Category.create(req.body)
        .then(() => {

        }).catch(error => console.log(error));
};

exports.updateCategory = (req, res) => {
    Category.update(req.body, { where: { id: req.params.id } })
        .then(() => {

        }).catch(error => console.log(error));
};

exports.deleteCategory = (req, res) => {
    Category.destroy({ where: { id: req.params.id } })
        .then(() => {

        }).catch(error => console.log(error));
};