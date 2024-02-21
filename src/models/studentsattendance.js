"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class StudentsAttendance extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            StudentsAttendance.belongsTo(models.User, {
                foreignKey: "studentId",
            });
            StudentsAttendance.belongsTo(models.Class, {
                foreignKey: "classId",
            });
            StudentsAttendance.belongsTo(models.LearningStatus, {
                foreignKey: "statusId",
            });
        }
    }
    StudentsAttendance.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            dateLearn: DataTypes.DATE,
            studentId: DataTypes.INTEGER,
            statusId: DataTypes.INTEGER,
            classId: DataTypes.INTEGER,
            status: DataTypes.INTEGER(1),
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "StudentsAttendance",
            tableName: "studentsattendances",
        }
    );
    return StudentsAttendance;
};
