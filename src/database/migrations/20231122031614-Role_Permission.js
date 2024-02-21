"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.createTable("Role_Permission", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            roleId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Roles",
                    key: "id",
                },
            },
            permissionId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Permissions",
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
        return queryInterface.dropTable("Role_Permission");
    },
};
