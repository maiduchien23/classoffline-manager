"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class ExercisesSubmit extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            ExercisesSubmit.belongsTo(models.User, { foreignKey: "studentId" });
            ExercisesSubmit.belongsTo(models.Exercise, {
                foreignKey: "exerciseId",
            });
        }
    }
    ExercisesSubmit.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            studentId: DataTypes.INTEGER,
            content: DataTypes.TEXT,
            attachment: DataTypes.STRING(200),
            exerciseId: DataTypes.INTEGER,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "ExercisesSubmit",
            tableName: "exercisessubmits",
        }
    );
    return ExercisesSubmit;
};
