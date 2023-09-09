// Importing required modules from Sequelize package
const { Model, DataTypes } = require("sequelize");

// Importing database connection from configuration
const sequelize = require("../config/config");
const bcrypt = require("bcrypt");
const { update } = require("./Comment");

// Importing bcrypt for password hashing
// Defining User model by extending the built-in Model class of Sequelize
class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        hooks: {
            async beforeCreate (newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            async beforeUpdate (updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            },
        },
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: "user",
    }
)

module.exports = User;