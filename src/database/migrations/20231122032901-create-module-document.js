"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("ModuleDocuments", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            content: {
                type: Sequelize.TEXT,
            },
            pathName: {
                type: Sequelize.STRING(200),
            },
            moduleId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "CourseModules",
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
        await queryInterface.dropTable("ModuleDocuments");
    },
};
