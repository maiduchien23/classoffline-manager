"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Class extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Class.belongsTo(models.Course, { foreignKey: "courseId" });
            Class.belongsToMany(models.User, {
                through: "classes_teachers",
                foreignKey: "classId",
            });
            Class.hasMany(models.TeacherCalendar);
            Class.hasMany(models.StudentsAttendance, { foreignKey: "classId" });
            Class.hasMany(models.Exercise, { foreignKey: "classId" });
            Class.hasMany(models.Comment, { foreignKey: "classId" });
            Class.hasMany(models.StudentsClass, { foreignKey: "classId" });
        }
    }
    Class.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING(200),
                unique: true,
            },
            quantity: DataTypes.INTEGER,
            startDate: DataTypes.DATE,
            endDate: DataTypes.DATE,
            courseId: DataTypes.INTEGER,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "Class",
            tableName: "classes",
        }
    );
    return Class;
};
