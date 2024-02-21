"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class UserSocial extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            UserSocial.belongsTo(models.User, { foreignKey: "userId" });
        }
    }
    UserSocial.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            userId: DataTypes.INTEGER,
            provider: DataTypes.STRING(100),
            providerId: DataTypes.STRING(100),
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "UserSocial",
            tableName: "usersocials",
        }
    );
    return UserSocial;
};
