"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class LearningStatus extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            LearningStatus.hasOne(models.StudentsClass, {
                foreignKey: "statusId",
            });
            LearningStatus.hasMany(models.StudentsAttendance, {
                foreignKey: "statusId",
            });
        }
    }
    LearningStatus.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: DataTypes.STRING(100),
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "LearningStatus",
            tableName: "learningstatuses",
        }
    );
    return LearningStatus;
};
