"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Role extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Role.belongsToMany(models.User, {
                through: "user_role",
                foreignKey: "roleId",
            });
            Role.belongsToMany(models.Permission, {
                through: "role_permission",
                foreignKey: "roleId",
            });
        }
    }
    Role.init(
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
            modelName: "Role",
            tableName: "roles",
        }
    );
    return Role;
};
