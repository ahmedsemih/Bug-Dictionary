const { DataTypes } = require('sequelize');

const sequelize = require('../utils/database');

const Category = sequelize.define('Category', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        autoIncrementIdentity: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(30),
        allowNull:false,
        unique: true,
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    updatedAt: false
});

module.exports = Category;