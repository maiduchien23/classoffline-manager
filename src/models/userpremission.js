// models/UserRole.js
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserPermission extends Model {
    static associate(models) {
      // No association needed for UserRole
    }
  }
  UserPermission.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: DataTypes.INTEGER,
      permissionId: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "UserPermission",
      tableName: "userpermissions",
    }
  );
  return UserPermission;
};
