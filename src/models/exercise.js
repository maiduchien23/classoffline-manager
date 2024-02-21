"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Exercise extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Exercise.belongsTo(models.Class, { foreignKey: "classId" });
            Exercise.hasMany(models.ExercisesSubmit, {
                foreignKey: "exerciseId",
            });
        }
    }
    Exercise.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            classId: DataTypes.INTEGER,
            title: DataTypes.STRING(200),
            content: DataTypes.TEXT,
            attachment: DataTypes.STRING(200),
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "Exercise",
            tableName: "exercises",
        }
    );
    return Exercise;
};
