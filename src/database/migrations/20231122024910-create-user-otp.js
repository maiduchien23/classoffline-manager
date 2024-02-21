"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("UserOtps", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            otp: {
                type: Sequelize.STRING(10),
                unique: true,
            },
            userId: {
                type: Sequelize.INTEGER,
                onDelete: "cascade",
                references: {
                    model: "Users",
                    key: "id",
                },
            },
            expires: {
                type: Sequelize.DATE,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("UserOtps");
    },
};
