"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Courses", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                type: Sequelize.STRING(200),
            },
            price: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
            },
            teacherId: {
                type: Sequelize.INTEGER,
                onDelete: "CASCADE",
                references: {
                    model: "Users",
                    key: "id",
                },
            },
            tryLearn: {
                type: Sequelize.TINYINT(1),
                defaultValue: 0,
                allowNull: true,
            },
            quantity: {
                type: Sequelize.INTEGER,
            },
            duration: {
                type: Sequelize.INTEGER,
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
        await queryInterface.dropTable("Courses");
    },
};
