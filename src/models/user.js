"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            User.belongsTo(models.Type, { foreignKey: "typeId" });
            User.hasOne(models.UserOtp, { foreignKey: "userId" });
            User.hasMany(models.UserColumn, { foreignKey: "userId" });
            User.hasOne(models.LoginToken, { foreignKey: "userId" });
            User.hasMany(models.UserSocial, { foreignKey: "userId" });
            User.belongsToMany(models.Role, {
                through: "user_role",
                foreignKey: "userId",
            });
            User.belongsToMany(models.Permission, {
                through: "user_permissions",
                foreignKey: "userId",
            });
            User.hasMany(models.Course, { foreignKey: "teacherId" });
            User.belongsToMany(models.Class, {
                through: "classes_teachers",
                foreignKey: "teacherId",
            });
            User.hasMany(models.TeacherCalendar);
            User.hasMany(models.StudentsClass, { foreignKey: "studentId" });
            User.hasOne(models.StudentsAttendance, { foreignKey: "studentId" });
            User.hasMany(models.ExercisesSubmit, { foreignKey: "studentId" });
            User.hasMany(models.Comment, { foreignKey: "studentId" });
        }
    }
    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: DataTypes.STRING(100),
            email: DataTypes.STRING(100),
            password: DataTypes.STRING(100),
            phone: DataTypes.STRING(15),
            address: DataTypes.STRING(200),
            typeId: DataTypes.INTEGER,
            firstLogin: {
                type: DataTypes.TINYINT(1),
                defaultValue: 0,
            },
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "User",
            tableName: "users",
        }
    );
    return User;
};
