const { DataTypes } = require('sequelize');
const sequelize=require('../utils/database');
const Entry = require('./Entry');
const User = require('./User');

const Report = sequelize.define('Report',{
    id:{
        primaryKey:true,
        autoIncrement:true,
        autoIncrementIdentity:true,
        allowNull:false,
        type:DataTypes.INTEGER
    }
},{
    updatedAt:false,
});

Report.belongsTo(Entry,{
    foreignKey:{
        allowNull:false
    }
});

module.exports=Report;