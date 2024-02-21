"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Setting extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Setting.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            otpKey: DataTypes.STRING(200),
            otpValue: DataTypes.TEXT,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "Setting",
            tableName: "settings",
        }
    );
    return Setting;
};
