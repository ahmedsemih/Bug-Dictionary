const { DataTypes } = require('sequelize');

const sequelize = require('../utils/database');
const User = require('./User');
const Topic = require('./Topic');

const Entry = sequelize.define('Entry', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        autoIncrementIdentity: true,
        allowNull: false
    },
    text: {
        type: DataTypes.STRING(1000),
        allowNull: false
    },
    like: {
        type: DataTypes.ARRAY(DataTypes.STRING),
    },
    dislike: {
        type: DataTypes.ARRAY(DataTypes.STRING),
    }
},{
    updatedAt:false
});

Entry.belongsTo(User, {
    foreignKey: {
        allowNull: false
    }
});

Entry.belongsTo(Topic, {
    foreignKey: {
        allowNull: false
    }
});

module.exports = Entry;