const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

const sequelize = require('../utils/database');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
        primaryKey: true,
        validate: {
            len: {
                args: [5, 20],
                msg: "username must be min 5 - max 20 characters."
            }
        }
    },
    email: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false,
        validate: {
            isEmail: {
                args: true,
                msg: 'Email must be a valid email.'
            }
        }
    },
    password: {
        type: DataTypes.STRING(),
        allowNull: false,
        validate: {
            len: {
                args: [5, 20],
                msg: "password must be min 5 - max 20 characters."
            }
        }
    },
    role: {
        type: DataTypes.STRING(20),
        defaultValue: 'user'
    },
    point: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
},
    {
        updatedAt: false,
        hooks: {
            beforeCreate: async (user) => {
                if (user.password) {
                    user.password = await bcrypt.hash(user.password, 10);
                }
            }
        }
    });

module.exports = User;