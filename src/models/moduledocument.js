"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class ModuleDocument extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            ModuleDocument.belongsTo(models.CourseModule, {
                foreignKey: "moduleId",
            });
        }
    }
    ModuleDocument.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            content: DataTypes.TEXT,
            pathName: DataTypes.STRING(200),
            moduleId: DataTypes.INTEGER,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "ModuleDocument",
            tableName: "moduledocuments",
        }
    );
    return ModuleDocument;
};
