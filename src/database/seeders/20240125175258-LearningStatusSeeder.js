"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "LearningStatuses",
            [
                {
                    name: "Studying",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "Dropout",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "Reserve",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("LearningStatuses", null, {});
    },
};
