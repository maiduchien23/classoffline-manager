"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "Permissions",
            [
                {
                    values: "users.read",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    values: "users.permission",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    values: "roles.read",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    values: "roles.add",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    values: "roles.update",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Roles", null, {});
    },
};
