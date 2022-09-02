const express = require('express');
const router = express.Router();

const { getAllCategories, getCategoryById, addCategory, updateCategory } = require('../controllers/categoryController');
const isAuthenticated=require('../middlewares/isAuthenticated');
const isAuthorized=require('../middlewares/isAuthorized');

router.route('/').get(getAllCategories);
router.route('/').post(isAuthenticated,isAuthorized,addCategory);

router.route('/:id').get(getCategoryById);
router.route('/:id').put(isAuthenticated,isAuthorized,updateCategory);

module.exports = router;