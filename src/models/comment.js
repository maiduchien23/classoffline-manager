"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Comment.belongsTo(models.User, { foreignKey: "studentId" });
            Comment.belongsTo(models.Class, { foreignKey: "classId" });
        }
    }
    Comment.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            classId: DataTypes.INTEGER,
            title: DataTypes.STRING(200),
            content: DataTypes.TEXT,
            parentId: DataTypes.INTEGER,
            studentId: DataTypes.INTEGER,
            attachment: DataTypes.STRING(200),
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "Comment",
            tableName: "comments",
        }
    );
    return Comment;
};
