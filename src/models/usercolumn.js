"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class UserColumn extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            UserColumn.belongsTo(models.User, { foreignKey: "userId" });
        }
    }
    UserColumn.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            userId: DataTypes.INTEGER,
            featureName: DataTypes.STRING(100),
            status: DataTypes.TINYINT(1),
            position: DataTypes.INTEGER,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "UserColumn",
            tableName: "usercolumns",
        }
    );
    return UserColumn;
};
