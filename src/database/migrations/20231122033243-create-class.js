"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Classes", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                type: Sequelize.STRING(200),
                unique: true,
            },
            quantity: {
                type: Sequelize.INTEGER,
            },
            startDate: {
                type: Sequelize.DATE,
            },
            endDate: {
                type: Sequelize.DATE,
            },
            courseId: {
                type: Sequelize.INTEGER,
                onDelete: "CASCADE",
                references: {
                    model: "Courses",
                    key: "id",
                },
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
        await queryInterface.dropTable("Classes");
    },
};
