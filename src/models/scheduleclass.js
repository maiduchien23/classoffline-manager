"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class ScheduleClass extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            ScheduleClass.belongsTo(models.Class);
        }
    }
    ScheduleClass.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            schedule: DataTypes.TINYINT(1),
            timeLearn: DataTypes.STRING(100),
            classId: DataTypes.INTEGER,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "ScheduleClass",
            tableName: "scheduleclasses",
        }
    );
    return ScheduleClass;
};
