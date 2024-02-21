"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Exercises", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            classId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Classes",
                    key: "id",
                },
            },
            title: {
                type: Sequelize.STRING(200),
            },
            content: {
                type: Sequelize.TEXT,
            },
            attachment: {
                type: Sequelize.STRING(200),
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
        await queryInterface.dropTable("Exercises");
    },
};
