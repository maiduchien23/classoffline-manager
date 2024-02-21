"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class LoginToken extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            LoginToken.belongsTo(models.User, { foreignKey: "userId" });
        }
    }
    LoginToken.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            token: DataTypes.STRING(100),
            userId: DataTypes.INTEGER,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "LoginToken",
            tableName: "logintokens",
        }
    );
    return LoginToken;
};
