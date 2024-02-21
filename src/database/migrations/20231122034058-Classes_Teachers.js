"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.createTable("Classes_Teachers", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            teacherId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Users",
                    key: "id",
                },
            },
            classId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Classes",
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
        return await queryInterface.dropTable("Classes_Teachers");
    },
};
