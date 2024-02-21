"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("ScheduleClasses", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            schedule: {
                type: Sequelize.TINYINT(1),
            },
            timeLearn: {
                type: Sequelize.STRING,
            },
            classId: {
                type: Sequelize.INTEGER,
                onDelete: "CASCADE",
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
        await queryInterface.dropTable("ScheduleClasses");
    },
};
