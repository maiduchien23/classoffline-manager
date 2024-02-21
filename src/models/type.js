"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Type extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Type.hasMany(models.User, { foreignKey: "typeId" });
        }
    }
    Type.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: DataTypes.STRING(100),
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "Type",
            tableName: "types",
        }
    );
    return Type;
};
