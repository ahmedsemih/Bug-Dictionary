const { DataTypes } = require('sequelize');

const sequelize = require('../utils/database');
const Category = require('./Category');

const Topic = sequelize.define('Topic', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        autoIncrementIdentity: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    updatedAt: false,
});

Topic.belongsTo(Category, {
    foreignKey: {
        allowNull: false
    }
});

module.exports = Topic;