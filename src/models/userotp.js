"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class UserOtp extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            UserOtp.belongsTo(models.User, { foreignKey: "userId" });
        }
    }
    UserOtp.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            otp: {
                type: DataTypes.STRING(10),
                unique: true,
            },
            userId: DataTypes.INTEGER,
            expires: DataTypes.DATE,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "UserOtp",
            tableName: "userotps",
        }
    );
    return UserOtp;
};
